$(document).ready(function () {

    var oMaterialList = new MaterialList();

});

class MaterialList extends Base {
    constructor() {
        super()
        var data = this.getData();
        $('#totalPage').text(Math.ceil(data.totalRow / 25));
        $('#totalRow').text(data.totalRow);
        this.loadData('#grdImport', 'ImportID', data.data);
        this.initEvent();
    }
    /**
     * Hàm khởi tạo sự kiện
     * */
    initEvent() {
        var me = this;
        me.EditMode = null;
        me.userAccess = JSON.parse(sessionStorage.getItem('accessUser'));

        $('.search').on('click', '#reload', me.reloadData.bind(this));

        //Lưu phiếu nhập mới
        $('#saveImport').on('click', me.saveImport.bind(this));
        $('#create-import').on('click', me.createImport.bind(this));
        $('#grdImport').on('click', '.ViewBtn', { jsObject: me }, me.viewImport);
        $('#grdImport').on('click', '.DeleteBtn', me.deleteImport);
        $('#grdImport').on('click', '.EditBtn', { jsObject: me }, me.editImport);

        $('.addRow').on('click', me.addRow);
        $('#grdImportDetail').on('click', '.deleteRow', { jsObject: me }, me.deleteRow);

        $('#grdImportDetail').on('blur','input[field=Amount]', me.caculateTotalMoney.bind(this));
        //Gán sự kiện phân trang khi nhập số trang và nhấn Enter
        $('#pageNumber').on('keyup', function (e) {
            if (e.keyCode == 13) {
                me.reloadData();
            }
        });

        $('input[field=EmployeeCode]').on('blur', me.getEmployeeName);

        $('.datepicker').datepicker({
            dateFormat: "dd/mm/yy",
        });
        $('.closeBtn').on('click', function () {
            jQuery.noConflict();
            $('#material-form').modal('hide');
            //$('#material-form').hide();
            //$('.modal-backdrop').hide();
        })

        $('#firstPage').on('click', this.getFirstPage.bind(this));
        $('#nextPage').on('click', this.getNextPage.bind(this));
        $('#prevPage').on('click', this.getPrevPage.bind(this));
        $('#lastPage').on('click', this.getLastPage.bind(this));

    }

    getData() {
        var pageNumber = $('#pageNumber').val();
        var fromDate = $('#fromDate').val();
        if (fromDate) {
            fromDate = fromDate.yyyymmdd();
        }
        var toDate = $('#toDate').val();
        if (toDate) {
            toDate = toDate.yyyymmdd();
        }
        var data;
        ajaxMethod.post('/importpaging/' + pageNumber, { fromDate: fromDate, toDate: toDate }, false, function (res) {
            data = res;
        })
        return data;
    }

    /**
     * Lấy id của bản ghi được chọn trong grid
     * @param {any} selector
     */
    getItemID(selector) {
        var id = selector.dataset['importid'];
        return id;
    }

    getEmployeeName() {
        var code = $(this).val();
        if (code && code.trim()) {
            code = code.toUpperCase();
            $(this).val(code);
            var employee = oUsers.filter(function (e) { return e.UserCode.toUpperCase() == code });
            if (employee.length > 0) {
                $('input[field=EmployeeName]').val(employee[0].FullName);
            }
        }
    }

    deleteImport() {
        var ok = confirm("Bạn có thực sự muốn xóa hóa đơn này không!");
        if (ok) {
            var id = $(this).closest('tr').data('recordID');
            ajaxMethod.delete('/import/' + id, {}, false, function (res) {

            })
        }
    }
    reloadData() {
        var me = this;
        var data = me.getData();
        var totalPage = Math.ceil(data.totalRow / 25);
        var pageNumber = $('#pageNumber').val();
        if (pageNumber > totalPage) {
            $('#pageNumber').val(totalPage);
        }
        $('#totalPage').text(totalPage);
        $('#totalRow').text(data.totalRow);
        data = me.getData();
        me.loadData('#grdImport', 'ImportID', data.data, oUsers);
    }

    /**
    * Hàm lấy dữ liệu trang đầu tiên;
    * CreatedBy: VTNGA (23/04/2020)
    * */
    getFirstPage() {
        $('#pageNumber').val(1);
        this.reloadData();
    }

    /**
    * Hàm lấy dữ liệu trang cuối cùng;
    * CreatedBy: VTNGA (23/04/2020)
    * */
    getLastPage() {
        var data = this.getData();
        var totalPage = Math.ceil(data.totalRow / 25);
        $('#pageNumber').val(totalPage);
        data = this.getData();
        this.loadData('#grdImport', 'ImportID', data.data, oUsers);
    }

    /**
    * Hàm lấy dữ liệu trang tiếp theo;
    * CreatedBy: VTNGA (23/04/2020)
    * */
    getNextPage() {
        var nextPage = parseInt($('#pageNumber').val()) + 1;
        var data = this.getData();
        var totalPage = Math.ceil(data.totalRow / 25);
        if (nextPage >= totalPage) {
            nextPage = totalPage;
        }
        $('#pageNumber').val(nextPage);
        this.loadData('#grdImport', 'ImportID', data.data, oUsers);
    }

    /**
    * Hàm lấy dữ liệu trang trước;
    * CreatedBy: VTNGA (23/04/2020)
    * */
    getPrevPage() {
        var prevPage = parseInt($('#pageNumber').val()) - 1;
        if (prevPage < 1) {
            prevPage = 1;
        }
        $('#pageNumber').val(prevPage);
        this.reloadData();
    }

    /**
     * Mở form thêm phiếu
     * */
    createImport() {
        var me = this;
        me.EditMode = 1;//Thêm mới
        $('#grdImportDetail tbody').empty();
        me.addRow();
        $('#saveImport').show();
        $('.addRow,.deleteRow').attr('disabled', false);
        $('#material-form input').attr('disabled', false);
        $('#material-form input[type=text]').val('');
        $('input[notempty],input[notEmpty]').css('border-color', '#C0C0C0');
    }

    viewImport(e) {
        var me = e.data['jsObject'];
        //Bind data
        var id = $(this).closest('tr').data('recordID');
        $('input[notempty],input[notEmpty]').css('border-color', '#C0C0C0');
        me.editItemID = id;
        ajaxMethod.get('/import/' + id, {}, false, function (res) {
            var items = $('#material-form').find('input[field]');
            $.each(items, function (index, item) {
                var fieldName = item.getAttribute('field');
                //if (fieldName == 'TotalAmount') {
                //    res[fieldName] = res[fieldName].formatMoney();
                //}
                if (fieldName == "ImportDate") {
                    res[fieldName] = new Date(res[fieldName]);
                    if (res[fieldName] != "Invalid Date") {
                        res[fieldName] = res[fieldName].ddmmyyyy();
                    } else {
                        res[fieldName] = "";
                    }
                }
                $(item).val(res[fieldName]);
            });

            var details = JSON.parse(res.ImportNote);
            me.loadDetailData('#grdImportDetail', '', details);
            $('#material-form input').attr('disabled', true);
            $('#saveImport').hide();
            $('.addRow,.deleteRow').attr('disabled',true);
        });
    }

    /**
     * Mở form sửa 
     * */
    editImport(e) {
        var me = e.data['jsObject'];
        me.EditMode = 2;//Sửa
        //Bind data
        var id = $(this).closest('tr').data('recordID');
        $('input[notempty],input[notEmpty]').css('border-color','#C0C0C0');
        me.editItemID = id;
        ajaxMethod.get('/import/' + id, {}, false, function (res) {
            var items = $('#material-form').find('input[field]');
            $.each(items, function (index, item) {
                var fieldName = item.getAttribute('field');
                //if (fieldName == 'TotalAmount') {
                //    res[fieldName] = res[fieldName].formatMoney();
                //}
                if (fieldName == "ImportDate") {
                    res[fieldName] = new Date(res[fieldName]);
                    if (res[fieldName] != "Invalid Date") {
                        res[fieldName] = res[fieldName].ddmmyyyy();
                    } else {
                        res[fieldName] = "";
                    }
                }
                $(item).val(res[fieldName]);
            });

            var details = JSON.parse(res.ImportNote);
            me.loadDetailData('#grdImportDetail', '', details);
        });
        $('#saveImport').show();
        $('.addRow,.deleteRow').attr('disabled', false);
        $('#material-form input').attr('disabled', false);
    }

    /**
     * Lưu phiếu nhập
     * */
    saveImport() {
        var me = this,
            newImport = {};
        var items = $('#material-form').find('input[field]');
        $.each(items, function (index, item) {
            var fieldName = item.getAttribute('field');
            var value;
            value = $(item).val();
            if (fieldName == "ImportDate" && value!="") {
                value = value.yyyymmdd();
            }
            if (fieldName == "TotalAmount") {
                value = value.replace(/\./g, '');
            }
            newImport[fieldName] = value;
        });
        if (me.EditMode == 2) {
            newImport.ImportID = me.editItemID;
        }
        var details = [], totalAmount = 0;
        var rowDetails = $('#materialDetail tbody tr');
        $.each(rowDetails, function (i, e) {
            var material = {};
            var inputs = $(e).find('input[field]');
            $.each(inputs, function (ind, el) {
                var fieldDetail = el.getAttribute('field');
                material[fieldDetail] = el.value;
                if (fieldDetail == 'Amount') {
                    totalAmount += parseFloat(el.value);
                }
            });
            details.push(material);
        });
        newImport.ImportNote = JSON.stringify(details);
        newImport.TotalAmount = totalAmount;
        if (!me.checkEmpty()) {
            ajaxMethod.post('/import/' + me.EditMode, newImport, false, function (res) {
                console.log(1);
            });

            window.location.href = '/Tables/MaterialList';
        }
    }

    caculateTotalMoney() {
        if (this.EditMode == 1 || this.EditMode == 2) {
            var totalAmount = 0;
            var rowDetails = $('#materialDetail tbody tr');
            if (rowDetails.length > 0) {
                $.each(rowDetails, function (i, e) {
                    var tdAmount = $(e).find('td')[3];
                    var value = 0, input = $(tdAmount).find('input');
                    if ($(input).val() != "") {
                        value = $(input).val();
                    }
                    totalAmount += parseFloat(value);
                });
                $('#material-form input[field=TotalAmount]').val(totalAmount);
            }
            else {
                $('#material-form input[field=TotalAmount]').val(0);
            }
        }
        
    }

    /**
     * Xóa phiếu nhập
     * */
    deleteImport(e) {
        var ok = confirm("Bạn có thực sự muốn xóa hóa đơn này không!");
        if (ok) {
            var id = $(this).closest('tr').data('recordID');
            ajaxMethod.delete('/import/' + id, {}, false, function (res) {

            });
            window.location.href = '/Tables/MaterialList';
        }
    }

    addRow() {
        var tr = '<tr>'
            + '<td> <input field="MaterialName" class="material-input" /></td>'
            + '<td><input field="Quantity" class="material-input" /></td>'
            + '<td><input field="UnitName" class="material-input" /></td>'
            + '<td><input field="Amount" class="material-input" /></td>'
            + '<td><input class="btn btn-sm btn-danger float-right m-t-n-xs ml-2 deleteRow" style="width: 40px;" value="Xóa" />'
            + ' </tr>'
        $('#grdImportDetail tbody').append(tr);
    }

    deleteRow(e) {
        var me = e.data['jsObject'];
        var tr = $(this).closest('tr');
        $(tr).remove();
        me.caculateTotalMoney();
    }

    /**
     * Load dữ liệu ra bảng
     * */
    loadData(table, recordName, dataValue) {

        var fields = $(table).find('thead th');
        var tbody = $(table).find('tbody');
        tbody.empty();
        $.each(dataValue, function (index, item) {
            if (recordName) {
                var rowHTML = $('<tr ></tr>').data('recordID', item[recordName]);
            }
            else {
                var rowHTML = $('<tr ></tr>');
            }
            $.each(fields, function (fieldIndex, fieldItem) {
                var fieldName = fieldItem.getAttribute('fieldName');
                var fieldValue;
                fieldValue = item[fieldName];
                var format = fieldItem.getAttribute('format');
                if (format) {
                    switch (format) {
                        case "Date":
                            fieldValue = new Date(fieldValue);
                            if (fieldValue != "Invalid Date") {
                                fieldValue = fieldValue.ddmmyyyy();
                            } else {
                                fieldValue = "";
                            }
                            var td = $('<td>' + fieldValue + '</td>');
                            break;
                        case "Money":
                            fieldValue = parseFloat(fieldValue);
                            //fieldValue = fieldValue.formatMoney();
                            var td = $('<td>' + fieldValue + '</td>');
                            break;
                        case "Boolean": //checkbox
                            if (fieldValue) {
                                var td = '<td><input type="checkbox" checked disabled/></td>';
                            }
                            else {
                                var td = '<td><input type="checkbox" disabled/></td>';
                            }
                            break;
                        case "Action":
                            var td = '<td><a href="#" class="btn btn-sm btn-danger float-right m-t-n-xs ml-2 DeleteBtn">Xóa</a><a data-toggle="modal" href="#material-form" class="btn btn-sm btn-primary float-right m-t-n-xs ml-2 EditBtn">Sửa</a><a data-toggle="modal" href="#material-form" class="btn btn-sm btn-primary float-right m-t-n-xs ml-2 ViewBtn">Xem</a></td>';
                            break;
                        case "ActionDetail":
                            var td = '<td><input class="btn btn-sm btn-danger float-right m-t-n-xs ml-2 deleteRow" style="width: 40px;" value="Xóa" />';
                            break;
                    }
                    rowHTML.append(td);
                } else {
                    fieldValue = fieldValue || "";

                    var td = $('<td>' + fieldValue + '</td>');
                    rowHTML.append(td);
                }
            })
            tbody.append(rowHTML);
        })
    }


    loadDetailData(table, recordName, dataValue) {

        var fields = $(table).find('thead th');
        var tbody = $(table).find('tbody');
        tbody.empty();
        $.each(dataValue, function (index, item) {
            if (recordName) {
                var rowHTML = $('<tr ></tr>').data('recordID', item[recordName]);
            }
            else {
                var rowHTML = $('<tr ></tr>');
            }
            $.each(fields, function (fieldIndex, fieldItem) {
                var fieldName = fieldItem.getAttribute('fieldName');
                var input = '<input field="' + fieldName + '" class="material-input"/>';
                var fieldValue;
                fieldValue = item[fieldName];
                var format = fieldItem.getAttribute('format');
                if (format) {
                    switch (format) {
                        case "Date":
                            fieldValue = new Date(fieldValue);
                            if (fieldValue != "Invalid Date") {
                                fieldValue = fieldValue.ddmmyyyy();
                            } else {
                                fieldValue = "";
                            }
                            var td = $('<td> <input field="' + fieldName + '" class="material-input" value="' + fieldValue+'"/></td>');
                            break;
                        case "Money":
                            fieldValue = parseFloat(fieldValue);
                            //fieldValue = fieldValue.formatMoney();
                            var td = $('<td> <input field="' + fieldName + '" class="material-input" value="' + fieldValue + '"/></td>');
                            break;
                        case "Boolean": //checkbox
                            if (fieldValue) {
                                var td = '<td><input type="checkbox" checked disabled/></td>';
                            }
                            else {
                                var td = '<td><input type="checkbox" disabled/></td>';
                            }
                            break;
                        //case "Action":
                        //    var td = '<td><a href="#" class="btn btn-sm btn-danger float-right m-t-n-xs ml-2 DeleteBtn">Xóa</a><a data-toggle="modal" href="#material-form" class="btn btn-sm btn-primary float-right m-t-n-xs ml-2 EditBtn">Sửa</a><a data-toggle="modal" href="#material-form" class="btn btn-sm btn-primary float-right m-t-n-xs ml-2 ViewBtn">Xem</a></td>';
                        //    break;
                        case "ActionDetail":
                            var td = '<td><input class="btn btn-sm btn-danger float-right m-t-n-xs ml-2 deleteRow" style="width: 40px;" value="Xóa" />';
                            break;
                    }
                    rowHTML.append(td);
                } else {
                    fieldValue = fieldValue || "";

                    var td = $('<td> <input field="' + fieldName + '" class="material-input" value="' + fieldValue + '" /></td >');
                    rowHTML.append(td);
                }
            })
            tbody.append(rowHTML);
        })
    }

    checkEmpty() {
        var requires = $('input[notempty], input[notEmpty]');
        var isEmpty = false;
        $.each(requires, function (i, e) {
            var value = $(e).val();
            if (value == '' || !value) {
                $(e).css('border-color', 'red');
                isEmpty = true;
            }
            else {
                $(e).css('border-color', '#C0C0C0');
            }
        })
        return isEmpty;
    }
}

$(document).ready(function () {

    var oEmployeeList = new EmployeeList();

});

class EmployeeList extends Base {
    constructor() {
        super()
        var data = this.getData();
        this.loadData('#grdEmployee', 'Id', data);
        this.initEvent();
    }
    
    initEvent() {
        var me = this;
        me.EditMode = null;
        me.userAccess = JSON.parse(sessionStorage.getItem('accessUser'));

        $('.search').on('click', '#reload', me.reloadData.bind(this));

        //Lưu phiếu nhập mới
        $('.saveEmployee').on('click', me.saveEmployee.bind(this));
        $('#create-employee').on('click', me.createEmployee.bind(this));
        $('#grdEmployee').on('click', '.ViewBtn', { jsObject: me }, me.viewEmployee);
        $('#grdEmployee').on('click', '.DeleteBtn', { jsObject: me }, me.deleteEmployee);
        $('#grdEmployee').on('click', '.EditBtn', { jsObject: me }, me.editEmployee);
        $('#changePass-form').on('click', '#saveChangePass', me.changePassword);
        //Gán sự kiện phân trang khi nhập số trang và nhấn Enter
        $('#pageNumber').on('keyup', function (e) {
            if (e.keyCode == 13) {
                me.reloadData();
            }
        });

        $('.datepicker').datepicker({
            dateFormat: "dd/mm/yy",
        });
        $('.closeBtn').on('click', function () {
            jQuery.noConflict();
            $('#employee-form').modal('hide');
        })

        $('#firstPage').on('click', this.getFirstPage.bind(this));
        $('#nextPage').on('click', this.getNextPage.bind(this));
        $('#prevPage').on('click', this.getPrevPage.bind(this));
        $('#lastPage').on('click', this.getLastPage.bind(this));

    }

    getData() {

        var name = $('#employeeNameSearch').val();
        var data;
        ajaxMethod.post('/users/search', name, false, function (res) {
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

    reloadData() {
        var me = this;
        var data = me.getData();
        me.loadData('#grdEmployee', 'Id', data);
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
        this.loadData('#grdInvoice', 'InvoiceID', data.data, oUsers);
    }

    /**
    * Hàm lấy dữ liệu trang tiếp theo;
    * */
    getNextPage() {
        var nextPage = parseInt($('#pageNumber').val()) + 1;
        var data = this.getData();
        var totalPage = Math.ceil(data.totalRow / 25);
        if (nextPage >= totalPage) {
            nextPage = totalPage;
        }
        $('#pageNumber').val(nextPage);
        this.loadData('#grdInvoice', 'InvoiceID', data.data, oUsers);
    }

    /**
    * Hàm lấy dữ liệu trang trước;
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
    createEmployee() {
        var me = this;
        me.EditMode = 1;//Thêm mới
        $('.saveEmployee').show();
        $('#employee-form input,#gender').attr('disabled', false);
        $('#employee-form input[type=text],#employee-form input[type=password]').val('');
        $('#employee-form #Password,#employee-form #RePassword').show();
        $('#employee-form #Password').addClass('d-flex');
        $('#employee-form #RePassword').addClass('d-flex');
        $('#employee-form input[fieldName=Password],#employee-form input[fieldName=RePassword]').attr('notEmpty','');
    }

    viewEmployee(e) {
        var me = e.data['jsObject'];
        //Bind data
        var id = $(this).closest('tr').data('recordID');

        me.editItemID = id;
        ajaxMethod.get('/users/' + id, {}, false, function (res) {
            var items = $('#employee-form').find('input[fieldName]');
            $.each(items, function (index, item) {
                var fieldName = item.getAttribute('fieldName');

                if (fieldName == "Birthday" || fieldName == "StartWorkDate") {
                    res[fieldName] = new Date(res[fieldName]);
                    if (res[fieldName] != "Invalid Date") {
                        res[fieldName] = res[fieldName].ddmmyyyy();
                    } else {
                        res[fieldName] = "";
                    }
                }
                else if (fieldName == 'Password' || fieldName == 'RePassword') {
                    res[fieldName] = "";
                }
                $(item).val(res[fieldName]);

            });
            $('#employee-form #gender').val(res['Gender']);
            $('#employee-form #Password,#employee-form #RePassword').hide();
            $('#employee-form input,#gender').attr('disabled', true);
            $('#saveEmployee').hide();

            $('#employee-form #Password').removeClass('d-flex');
            $('#employee-form #RePassword').removeClass('d-flex');
            $('#employee-form #Password,#employee-form #RePassword').hide();
            $('#employee-form input[fieldName=Password],#employee-form input[fieldName=RePassword]').removeAttr('notEmpty');
        });
    }

    /**
     * Mở form sửa 
     * */
    editEmployee(e) {
        var me = e.data['jsObject'];
        me.EditMode = 2;//Sửa
        //Bind data
        var id = $(this).closest('tr').data('recordID');

        me.editItemID = id;
        ajaxMethod.get('/users/' + id, {}, false, function (res) {
            var items = $('#employee-form').find('input[fieldName]');
            $.each(items, function (index, item) {
                var fieldName = item.getAttribute('fieldName');

                if (fieldName == "Birthday" || fieldName == "StartWorkDate") {
                    res[fieldName] = new Date(res[fieldName]);
                    if (res[fieldName] != "Invalid Date") {
                        res[fieldName] = res[fieldName].ddmmyyyy();
                    } else {
                        res[fieldName] = "";
                    }
                }
                else if (fieldName == 'Password' || fieldName == 'RePassword') {
                    res[fieldName] = "";
                }
                $(item).val(res[fieldName]);

            });
            $('#employee-form #gender').val(res['Gender']);
        });
        $('#saveEmployee').show();
        $('#employee-form #Password,#employee-form #RePassword').hide();
        $('#employee-form #Password').removeClass('d-flex');
        $('#employee-form #RePassword').removeClass('d-flex');
        $('#employee-form input,#gender').attr('disabled', false);
        $('#employee-form input[fieldName=Password],#employee-form input[fieldName=RePassword]').removeAttr('notEmpty');
    }

    /**
     * Lưu thông tin nhân viên
     * */
    saveEmployee() {
        var me = this,
            newUser = {},
            repassword;
        var items = $('#employee-form').find('input[fieldName]');
        var gender = $('#employee-form #gender').val();
        $.each(items, function (index, item) {
            var fieldName = item.getAttribute('fieldName');

            var value;
            value = $(item).val();
            if (fieldName == 'RePassword') {
                repassword = value;
            }
            else {
                if (fieldName == "StartWorkDate" || fieldName == 'Birthday') {
                    value = value.yyyymmdd();
                }
                else if (fieldName == "TotalAmount") {
                    value = value.replace(/\./g, '');
                }
                else if (fieldName == "UserCode") {
                    value = value.toUpperCase();
                }
                newUser[fieldName] = value;
            }
        });
        if (me.EditMode == 2) {
            newUser.Id = me.editItemID;
        }
        newUser.Gender = gender;
        if (!me.checkEmpty()) {
            if (newUser.Password == repassword) {
                ajaxMethod.post('/users/createuser/' + me.EditMode, newUser, false, function (res) {
                    switch (res) {
                        case 'PasswordNotEmpty':
                            alert('Mật khẩu không được bỏ trống!');
                            break;
                        case 'ExistUserName':
                            alert('Tên tài khoản đã tồn tại!');
                            break;
                        case 'Success':
                            $('#employee-form').hide();
                            $('.modal-backdrop').hide();
                            me.reloadData();
                            break;
                    }
                });
            }
            else {
                alert('Mật khẩu không trùng nhau, bạn hãy kiểm tra lại!');
            }
        }
    }


    /**
     * Xóa NV
     * */
    deleteEmployee(e) {
        var ok = confirm("Bạn có thực sự muốn xóa nhân viên này không!");
        if (ok) {
            var me = e.data['jsObject'];
            var id = $(this).closest('tr').data('recordID');
            ajaxMethod.delete('/users/' + id, {}, false, function (res) {
                jQuery.noConflict();
                $('#employee-form').modal('hide');
            });
            me.reloadData();
        }
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
                if (fieldName == 'Gender') {
                    if (fieldValue == '0') {
                        fieldValue = 'Nữ';
                    }
                    else {
                        fieldValue = 'Nam';
                    }
                }
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
                            var td = '<td><a href="#" class="btn btn-sm btn-danger float-right m-t-n-xs ml-2 DeleteBtn">Xóa</a><a data-toggle="modal" href="#employee-form" class="btn btn-sm btn-primary float-right m-t-n-xs ml-2 EditBtn">Sửa</a><a data-toggle="modal" href="#employee-form" class="btn btn-sm btn-primary float-right m-t-n-xs ml-2 ViewBtn">Xem</a></td>';
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

    /**
     *Đổi mật khẩu
     */
    changePassword() {
        var inputs = $('#changePass-form input[fieldName]');
        var changePass = {};
        $.each(inputs, function (index, fieldItem) {
            var fieldName = fieldItem.getAttribute('fieldName');
            var fieldValue;
            changePass[fieldName] = fieldItem.value;
        })

        ajaxMethod.post('/users/changepassword', changePass, false, function (res) {
            if (res == 'OldErr') {
                alert('Mật khẩu cũ không đúng, bạn vui lòng nhập lại!');
            }
            else if (res == 'NewDifferent') {
                alert('Mật khẩu mới không khớp nhau, bạn vui lòng nhập lại!');
            }
            else {
                alert('Đổi mật khẩu thành công');
                window.location.href = "/home/index";
            }
        })
    }
    
}

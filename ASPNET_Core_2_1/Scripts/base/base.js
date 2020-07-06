/* lớp chứa các hàm thực hiện các chức năng chung cho tất cả các trang */


var AllMode = {
    AddMode: 0,
    EditMode: 1,
    ViewMode: 2
};
var DialogMode = null;

var Key = {
    Q: 81,
    Insert: 45,
    Delete: 46,
    E: 69,
    S: 83,
    _1: 49,
    B: 66,
    D: 68,
    F1: 112
}
class Base {
    constructor() {

    }

    /**
     * Lấy dữ liệu 
     * CreatedBy: VTNGA (10/10/2019)
     * */
    getData(url, paymentID) {
        var token = JSON.parse(sessionStorage.getItem('accessUser')).Token;
        var headers = { 'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS' };
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }
        var data;
        var me = this;
        if (url === "/payments") {
            var filters = this.getFilters();
            //var totalRows = parseInt(this.getRowNumber(filters));
            var pageNumber = parseInt($('#pageNumber').val());
            var pageSize = parseInt($('#pageSize').text());
            if (!paymentID) {
                paymentID = '1';
            }
            url = url + '/' + pageNumber + '/' + pageSize + '/' + paymentID;
            ajaxMethod.getMasterData(url, filters, false, function (res) {

                var totalRows = res.totalRows;
                var totalPage = res.totalPage;
                data = res.listData;

                if (pageNumber <= 1) {
                    $('#pageNumber').val('1');
                    pageNumber = 1;
                    $('#firstPage,#prevPage').attr('disabled', true);
                    $('#nextPage,#lastPage').attr('disabled', false);
                }
                else if (pageNumber >= totalPage) {
                    $('#pageNumber').val(totalPage);
                    pageNumber = totalPage;
                    $('#firstPage,#prevPage').attr('disabled', false);
                    $('#nextPage,#lastPage').attr('disabled', true);
                }
                else {
                    $('#firstPage,#prevPage,#nextPage,#lastPage').attr('disabled', false);
                }
                $('#totalPage').text(totalPage);

                var end = pageNumber * pageSize;
                if (end > totalRows) {
                    end = totalRows;
                }
                if (totalRows <= 0) {
                    $('#start').text(0);
                }
                else {
                    $('#start').text((pageNumber - 1) * pageSize + 1);
                }
                $('#end').text(end);
                $('#totalRows').text(totalRows);
            });
        }
        else {
            ajaxMethod.get(url, {}, false, function (res) {
                data = res;
            });
        }

        return data;
    }

    /**
     * Hàm chọn nhiều row trong bảng table
     * Người tạo: VTNGA
     * Ngày tạo: 18/10/2019
     * */
    ctrlClickRow(event) {
        if (event.ctrlKey) {
            $(this).toggleClass('row-selected');
        } else {
            $('.row-selected').removeClass('row-selected');
            this.classList.add('row-selected');
        }
        var rowSelected = $('.row-selected');
        if (rowSelected.length === 1) {
            $('#btnEdit,.menu-context .btnEdit').removeAttr('disabled');
            $('#btnDelete, .menu-context .btnDelete').removeAttr('disabled');
            $('.btnView').removeAttr('disabled');
            $('.btnDuplicate').removeAttr('disabled');
        }
        else {
            $('.btnEdit').attr('disabled', true);
            $('.btnView').attr('disabled', true);
            $('.btnDuplicate').attr('disabled', true);
        }
    }

    /**
     * Ham su dung phim tat de dong dialog
     * Người tạo: VTNGA
     * Ngày tạo: 28/10/2019
     * */

    DialogShortCut(event) {
        var me = this;
        if (event.ctrlKey && (!event.shiftKey)) {
            if (event.keyCode === Key.Q) {//ctrl+Q Đóng dialog phiếu chi
                event.preventDefault();
                if ($('.dlg-payment-detail').is(':visible')) {
                    me.closeDialog();
                }
            }
            else if (event.keyCode === Key.S) {//ctr+S cất dữ liệu
                event.preventDefault();
                if ($('.dlg-payment-detail').is(':visible')) {
                    me.save();
                }
            }
            else if (event.keyCode === Key.B) {//ctr+B mở dialog xem
                event.preventDefault();
                var rowSelected = $('.row-selected');
                if (rowSelected.length === 1) {
                    var rowID = rowSelected.data('recordID');
                    if (rowID) {
                        me.openViewDialog(rowID);
                    }
                }
            }
            else if (event.keyCode === Key.Insert) {//Ctrl+Insert thêm dòng chi tiết
                event.preventDefault();
                me.addDetailRow();
            }
            else if (event.keyCode === Key.Delete) {//Ctrl+Delete xóa dòng chi tiết
                event.preventDefault();
                me.deleteDetailRow();
            }
            else if (event.keyCode === Key.D) {//ctrl+D xóa phiếu chi
                event.preventDefault();
                var rowID = me.getRowID();
                if (rowID) {
                    me.openDeleteDialog();
                }
            }
            else if (event.keyCode === Key._1) {//ctrl+1 Mở dialog thêm mới phiếu chi
                event.preventDefault();
                me.openAddDialog();
            }
            else if (event.keyCode === Key.E) {//ctrl+E Mở dialog sửa phiếu chi
                event.preventDefault();
                var rowSelected = $('.row-selected');
                if (rowSelected.length === 1) {
                    var rowID = rowSelected.data('recordID');
                    if (rowID) {
                        me.openEditDialog(rowID);
                    }
                }
            }

        }
        else if (event.shiftKey && event.ctrlKey && (event.keyCode === Key.S)) {//ctr+shift+S Cất dữ liệu và mở dialog thêm mới
            event.preventDefault();
            if ($('.dlg-payment-detail').is(':visible')) {
                me.save();
            }
            me.openAddDialog();
        }
        else if (!event.ctrlKey && event.keyCode === Key.F1) {//F1
            event.preventDefault();
            window.open("https://help.cukcuk.vn/vi/1040000_thu_tien_mat.htm", '_blank');
        }
        else if (event.keyCode === 27) { //ESC đóng dialog
            if ($('.dlg-payment-detail').is(':visible')) {
                $('.dlg-payment-detail').dialog('close');
            }

        }
    }

    /**
    * Lấy recordID cuả từng dòng dữ liệu trên bảng dữ liệu.
    * CreatedBy: VTNGA (18/10/2019)
    * */
    getRowID() {
        var rowID = $('.row-selected').data('recordID');
        return rowID;
    }

    /**
    * Lấy recordID cuả nhiều dòng dữ liệu trên bảng dữ liệu.
    * CreatedBy: VTNGA (18/10/2019)
    * */
    getMultiRowID() {
        var rowID = $('.row-selected');
        var ids = [];
        $.each(rowID, function (index, item) {
            var id = $(item).data('recordID');
            ids.push(id);
        });
        return ids;
    }

    /**
     * Load dữ liệu ra bảng
     * CreatedBy: VTNGA (10/10/2019)
     * */
    loadData(table, recordName, dataValue) {

        var fields = $(table).find('thead th');
        var tbody = $(table).find('tbody');
        tbody.empty();
        $.each(dataValue, function (index, item) {
            var rowHTML = $('<tr class="grid-row"></tr>').data('recordID', item[recordName]);
            $.each(fields, function (fieldIndex, fieldItem) {
                var fieldName = fieldItem.getAttribute('fieldName');
                var fieldValue = item[fieldName];
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
                            var td = $('<td class="grid-cell-inner text-align-center" title="' + fieldValue + '">' + fieldValue + '</td>');
                            break;
                        case "Money":
                            fieldValue = fieldValue.formatMoney();
                            var td = $('<td class="grid-cell-inner text-align-right" title="' + fieldValue + '">' + fieldValue + '</td>');
                            break;
                        case "Boolean": //checkbox
                            if (fieldValue) {
                                var td = '<td class="grid-cell-inner text-align-center"><input type="checkbox" checked disabled/></td>';
                            }
                            else {
                                var td = '<td class="grid-cell-inner text-align-center"><input type="checkbox" disabled/></td>';
                            }
                            break;
                    }
                    rowHTML.append(td);
                } else {
                    fieldValue = fieldValue || "";

                    var td = $('<td class="grid-cell-inner" title="' + fieldValue + '">' + fieldValue + '</td>');
                    rowHTML.append(td);
                }
            })
            tbody.append(rowHTML);
        })
        $('#loading').fadeOut(300);
    }

    /* *
    * hàm sau khi load lại trang
    * CreatedBy: VTNGA(04/01/2020)
    * */
    afterLoadData() {
        var tbody = $("#tbPaymentList").find('tbody');
        tbody.find('tr:first-child').addClass('row-selected');
        var firstRowID = tbody.find('tr:first-child').data('recordID');
        var data = this.getData("/paymentdetails/" + firstRowID);
        this.loadData("#tbDetailPaymentList", "PaymentDetailID", data);
        $('#btnEdit,.menu-context .btnEdit, #btnDelete, .menu-context .btnDelete,.btnView,.btnDuplicate').attr('disabled', false);
        this.totalDetail('.totalDetail', data);
    }

    /**
     * Load lại dữ liệu ra bảng
     * CreatedBy: VTNGA (03/11/2019)
     * */
    reloadData(paymentID) {
        var masterData = this.getData("/payments", paymentID);
        this.loadData("#tbPaymentList", "PaymentID", masterData);
        if ($('.dlg-payment-detail').is(':visible')) {
            $('.dlg-payment-detail').dialog('close');
        }
        $('#tbDetailPaymentList tbody').empty();
        $('.totalDetail').text("0");
        $('#btnEdit,.menu-context .btnEdit, #btnDelete, .menu-context .btnDelete,.btnView,.btnDuplicate').attr('disabled', false);
        this.afterLoadData();
    }

    /**
     * Hàm thực hiện mở dialog thêm/sửa phiếu chi
     * CreatedBy: VTNGA (15/10/2019)
     * */
    openDialog(title) {

        $('.dlg-payment-detail').dialog({
            title: title,
            modal: true,
            open: function () {
                var button = $('<button class="btn-icon-zoom"></button>');
                $('.btn-icon-zoom').remove();
                $('.ui-dialog-titlebar').append(button);
                if ($('.dlg-payment-detail').hasClass('w-100')) {
                    button.addClass('btn-icon-minimize');
                }
            },

        });
        $('.ui-dialog-titlebar-close').attr('disabled', true);
        //Load dữ liệu ra bảng khách hàng và nhân viên trong dialog phiếu chi.
        var customerData = this.getData("/customers");
        this.loadData('#dlgCustomerTable', 'CustomerID', customerData);
        $('#dlgCustomerTable').find('tr').first().addClass('ct-hover-primary');
        var employeeData = this.getData("/employees");
        this.loadData('#dlgEmployeeTable', 'EmployeeID', employeeData);
        $('#dlgEmployeeTable').find('tr').first().addClass('ct-hover-primary');
        var fields = $('.dlg-content input[fieldName]');

        $.each(fields, function (fieldIndex, fieldItem) {
            $(fieldItem).val("");
        });
        $('#dlgDetailTable tbody').empty();

        $('.totalDetail').text("0");
        $('input[notEmpty]').parent().removeClass('alarm');
        $('.dlg-payment-detail .alarm-icon').hide();
        $('#btnAddDetail').attr('disabled', false);
        $('#btnDeleteDetail').attr('disabled', false);
        $('.dlg-payment-detail input').removeAttr('disabled');
        $(".sub-dlg-toolbar").hide();
        var rowID = this.getRowID();
        $('.dlg-payment-detail').data('PaymentID', rowID);
        $('.dlg-content input[firstInput]').focus();
        $('.object-table').hide();
    }
    /**
    * Hàm thực hiện mở dialog thêm phiếu chi
    * CreatedBy: VTNGA (28/10/2019)
    * */
    openAddDialog() {
        this.DialogMode = AllMode.AddMode;
        this.openDialog(Resource.DialogTitle.AddDialog);
        var rowDetail = $('<tr class="grid-row" detail>' +
            '<td class="grid-cell-inner"> <input class="detail-input" fieldName="Description"/></td >' +
            '<td class="grid-cell-inner"><input class="detail-input text-align-right amount-input" value="0" fieldName="Amount"/></td>' +
            '<td class="grid-cell-inner"><input class="detail-input" fieldName="PaymentItem"/></td>' +
            '</tr>');

        $('#dlgDetailTable tbody').append(rowDetail);
        var newCode = this.autoCreateCode();
        $('.dlg-payment-detail #autoCreateCode').val(newCode);
        var date = new Date().ddmmyyyy();
        $('.dlg-payment-detail .datepicker').val(date);
        $('.dlg-toolbar button').attr('disabled', true);
        $('.dlg-toolbar .btnSave,.dlg-toolbar .btnClose').removeAttr('disabled');
        var fields = $('.dlg-content input[fieldName]');
        $.each(fields, function (index, item) {
            var value = item.value;
            $(item).data('oldValue', value);
        });
    }
    /**
     * Hàm thực hiện mở dialog nhân bản phiếu chi
     * CreatedBy: VTNGA (28/10/2019)
     * */
    openDuplicateDialog(rowID) {
        this.DialogMode = AllMode.AddMode;
        this.openDialog(Resource.DialogTitle.AddDialog);
        var data = this.getData('/payments/' + rowID);
        this.bindingData(data);
        var dataDetail = this.getData("/paymentdetails/" + rowID);
        this.bindingDetailtDialog(dataDetail, '#dlgDetailTable');
        this.totalDetail('.totalDetail', dataDetail);
        var fields = $('.dlg-content input[fieldName]');
        var newCode = this.autoCreateCode();
        $('.dlg-payment-detail #autoCreateCode').val(newCode);
        var date = new Date().ddmmyyyy();
        $('.dlg-payment-detail .datepicker').val(date);
        $.each(fields, function (index, item) {
            var value = item.value;
            $(item).data('oldValue', value);
        });

        $('.dlg-toolbar button').attr('disabled', true);
        $('.dlg-toolbar .btnSave,.dlg-toolbar .btnClose').removeAttr('disabled');
    }
    /**
     * Hàm thực hiện mở dialog sửa phiếu chi
     * CreatedBy: VTNGA (28/10/2019)
     * */
    openEditDialog(rowID) {
        this.DialogMode = AllMode.EditMode;
        this.openDialog(Resource.DialogTitle.EditDialog);
        var data = this.getData('/payments/' + rowID);
        this.bindingData(data);
        var dataDetail = this.getData("/paymentdetails/" + rowID);
        this.bindingDetailtDialog(dataDetail, '#dlgDetailTable');
        this.totalDetail('.totalDetail', dataDetail);
        $('.dlg-payment-detail').data('PaymentID', rowID);
        $('.dlg-toolbar button').attr('disabled', true);
        $('.dlg-toolbar .btnSave,.dlg-toolbar .btnCancel,.dlg-toolbar .btnClose').removeAttr('disabled');
        var fields = $('.dlg-content input[fieldName]');
        $.each(fields, function (index, item) {
            var value = item.value;
            $(item).data('oldValue', value);
        });
    }
    /**
* Hàm thực hiện mở dialog xem phiếu chi
* CreatedBy: VTNGA (30/10/2019)
* */
    openViewDialog(rowID) {
        this.DialogMode = AllMode.ViewMode;
        this.openDialog(Resource.DialogTitle.ViewDialog);
        var data = this.getData('/payments/' + rowID);
        this.bindingData(data);
        var dataDetail = this.getData("/paymentdetails/" + rowID);
        this.bindingDetailtDialog(dataDetail, '#dlgDetailTable');
        this.totalDetail('.totalDetail', dataDetail);
        $('.dlg-payment-detail').data('PaymentID', rowID);
        $('.dlg-toolbar button').attr('disabled', true);
        $('.dlg-toolbar .btnSave,.dlg-toolbar .btnCancel,.dlg-toolbar .btnClose').removeAttr('disabled');
        $('.dlg-payment-detail input,button.arrow-dlg').attr('disabled', true);
        $('.dlg-toolbar button').attr('disabled', false);
        $('.dlg-toolbar .btnSave,.dlg-toolbar .btnCancel').attr('disabled', true);

        $('#btnAddDetail').attr('disabled', true);
        $('#btnDeleteDetail').attr('disabled', true);
    }


    /**
     * Hàm thực hiện mở dialog cảnh báo số tiền phải lớn hơn 0;
     * CreatedBy: VTNGA (23/10/2019)
     * */
    openAmountDialog() {
        $('#alarmAmountDialog').dialog({
            modal: true,
            resizable: false,
            title: Resource.DialogTitle.DialogTitle,
            dialogClass: "alarmDlg",
            open: function () {
                $(".alarmDlg .ui-dialog-titlebar-close").hide();
                $(".alarmDlg .btn-icon-zoom").hide();
            }
        });
    }

    /**
     * Hàm thực hiện mở dialog xóa phiếu chi
     * CreatedBy: VTNGA (23/10/2019)
     * */
    openDeleteDialog() {
        $('#deleteDialog').dialog({
            modal: true,
            resizable: false,
            title: Resource.DialogTitle.DialogTitle,
            dialogClass: "alarmDlg",
            open: function () {
                $(".alarmDlg .ui-dialog-titlebar-close").hide();
                $(".alarmDlg .btn-icon-zoom").hide();

            }
        });
        var license = this.getLicenseNumber('/payments');
        $('.dlgLicenseNumber').text(license);
    }
    /**
     * Hàm thực hiện mở dialog thông báo dữ liệu đã thay đổi
     * CreatedBy: VTNGA (03/11/2019)
     * */
    openChangeDialog() {
        $('#alarmChangeDialog').dialog({
            modal: true,
            resizable: false,
            title: Resource.DialogTitle.DialogTitle,
            dialogClass: "alarmDlg",
            open: function () {
                $(".alarmDlg .ui-dialog-titlebar-close").hide();
                $(".alarmDlg .btn-icon-zoom").hide();
            }
        });
    }
    /**
     * Hàm đóng dialog
     * CreatedBy: VTNGA (23/10/2019)
     * */
    closeDialog() {
        var isChange = false;
        var fields = $('.dlg-content input[fieldName]');
        $.each(fields, function (index, item) {
            var oldValue = $(item).data('oldValue');
            var newValue = item.value;
            if (oldValue !== newValue) {
                isChange = true;
            }
        });
        if (isChange) {
            this.openChangeDialog();
        }
        else {

            $('.dlg-payment-detail').dialog('close');
            $('.toolbar .toolbar-item .sub-toolbar').hide();
        }
    }
    /**
     * Hàm lấy số chứng từ của hàng được chọn
     * CreatedBy: VTNGA (23/10/2019)
     * */
    getLicenseNumber(url) {

        var ID = $('.row-selected');
        var rowID = this.getRowID();
        url = url + '/' + rowID;
        var data;
        if (ID.length === 1) {
            var masterData = this.getData(url);
            data = masterData["LicenseNumber"];
        }
        else {
            data = "đã chọn";
        }
        return data;
    }
    /**
     * Hàm validate dữ liệu khi chọn nút cất
     * CreatedBy: VTNGA (24/10/2019)
     * */
    isEmptyInput(e) {
        var isEmpty = false;
        var fields = $('.dlg-payment-detail input[notEmpty]');
        $.each(fields, function (index, item) {
            var value = $(this).val().trim();
            var format = item.getAttribute('format');
            if (value === "") {
                $(this).parent().addClass('alarm');
                $(this).siblings('.notEmpty').show();
                isEmpty = true;
            }
        });
        return isEmpty;
    }


    /**
    * Tính tổng giá trị bảng chi tiết thu/chi
    * CreatedBy: VTNGA (18/10/2019)
    * */
    totalDetail(totalID, dataValue) {
        var total = 0;
        $.each(dataValue, function (index, item) {
            total += item['Amount'];
        })
        total = total.formatMoney();
        $(totalID).text(total);
        return total;
    }

    /**
    * Hàm binding dữ liệu ra dialog khi người dùng sửa thông tin 1 hàng.
    * CreatedBy: VTNGA (21/10/2019)
    * */
    bindingData(data) {
        var fields = $('.dlg-content input[fieldName]');
        var customerID = data['CustomerID'] || "";
        var employeeID = data['EmployeeID'] || "";
        var div = document.createElement('div');
        if (customerID && customerID !== "00000000-0000-0000-0000-000000000000") {
            var customer = this.getData('/customers/' + customerID);
            data['CustomerCode'] = customer['CustomerCode'];
        }
        else {
            data['CustomerCode'] = "";
        }
        if (employeeID && employeeID !== "00000000-0000-0000-0000-000000000000") {
            var employee = this.getData('/employees/' + employeeID);
            data['EmployeePosition'] = employee['EmployeePosition'];
            data['EmployeeName'] = employee['EmployeeName'];
        }
        else {
            data['EmployeePosition'] = "";
            data['EmployeeName'] = "";
        }

        $.each(fields, function (fieldIndex, fieldItem) {
            var fieldName = fieldItem.getAttribute('fieldName');
            var format = fieldItem.getAttribute('format');
            var fieldValue = data[fieldName];
            if (fieldName === "CustomerCode") {
                $('input[fieldName="CustomerCode"]').data('CustomerID', data['CustomerID']);
                $('input[fieldName="CustomerCode"]').data('CustomerCode', data['CustomerCode']);
            }
            if (fieldName === "EmployeePosition") {
                $('input[fieldName="EmployeePosition"]').data('EmployeeID', data['EmployeeID']);
                $('input[fieldName="EmployeePosition"]').data('EmployeePosition', data['EmployeePosition']);
            }
            if (fieldValue) {
                switch (format) {
                    case "date":
                        fieldValue = new Date(fieldValue);
                        if (fieldValue != "Invalid Date") {
                            fieldValue = fieldValue.ddmmyyyy();
                        } else {
                            fieldValue = "";
                        }
                        break;
                }

                div.innerHTML = fieldValue;
                fieldValue = div.textContent;
                $(fieldItem).val(fieldValue);
                $(fieldItem).data('oldValue', fieldValue);
            }

        })

    }

    /**
    * Hàm thực hiện binding dữ liệu detail ra dialog khi người dùng sửa thông tin 1 hàng.
    * CreatedBy: VTNGA (22/10/2019)
    * */
    bindingDetailtDialog(detailData, table) {
        var fields = $(table).find('thead th');
        var div = document.createElement('div');
        $.each(detailData, function (index, item) {
            var rowHTML = $('<tr class="grid-row" detail></tr>').data('recordID', item['PaymentDetailID']);
            $.each(fields, function (fieldIndex, fieldItem) {
                var fieldName = fieldItem.getAttribute('fieldName');
                var fieldValue = item[fieldName];
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
                            var td = $('<td class="grid-cell-inner"><input class=" text-align-center detail-input" value="' + fieldValue + '" fieldName="' + fieldName + '"/></td>');
                            $(td).find('input[fieldName]').data('oldValue', fieldValue);
                            break;
                        case "Money":
                            fieldValue = fieldValue.formatMoney();
                            var td = $('<td class="grid-cell-inner "><input class="text-align-right detail-input amount-input" value="' + fieldValue + '" fieldName="' + fieldName + '"/></td>');
                            $(td).find('input[fieldName]').data('oldValue', fieldValue);
                            break;
                        case "Boolean": //checkbox
                            if (fieldValue) {
                                var td = '<td class="grid-cell-inner "><input class="text-align-center detail-input" type="checkbox" checked disabled fieldName="' + fieldName + '"/></td>';
                                $(td).find('input[fieldName]').data('oldValue', fieldValue);
                            }
                            else {
                                var td = '<td class="grid-cell-inner"><input class=" text-align-center detail-input" type="checkbox" disabled fieldName="' + fieldName + '"/></td>';
                                $(td).find('input[fieldName]').data('oldValue', fieldValue);
                            }
                            break;
                    }
                    rowHTML.append(td);
                } else {
                    fieldValue = fieldValue || "";
                    div.innerHTML = fieldValue;
                    fieldValue = div.textContent;
                    var td = $('<td class="grid-cell-inner"><input class="detail-input" value="' + fieldValue + '" fieldName="' + fieldName + '"/></td>');
                    $(td).find('input[fieldName]').data('oldValue', fieldValue);
                    rowHTML.append(td);
                }
            })
            $(table).find('tbody').append(rowHTML);
        })
    }
    /**
    * Thêm hàng nhập trong bảng chi tiết của dialog chi tiết phiếu thu/chi
    * CreatedBy: VTNGA (22/10/2019)
    * */
    addDetailRow() {
        var tbody = $('#dlgDetailTable').find('tbody');
        var rowDetail = $('<tr class="grid-row" detail>' +
            '<td class="grid-cell-inner"> <input class="detail-input" fieldName="Description"/></td >' +
            '<td class="grid-cell-inner"><input class="detail-input text-align-right amount-input" value="0" fieldName="Amount"/></td>' +
            '<td class="grid-cell-inner"><input class="detail-input" fieldName="PaymentItem"/></td>' +
            '</tr>');
        tbody.append(rowDetail);
    }
    /**
    * Xóa hàng nhập chi tiết mô tả của dialog chi tiết phiếu thu/chi
    * CreatedBy: VTNGA (22/10/2019)
    * */
    deleteDetailRow() {
        $('#dlgDetailTable .row-selected').remove();
    }

    /**
     * Hàm sinh mã tự động
     * CreatedBy: VTNGA (23/10/2019)
     * */
    autoCreateCode() {
        //var length = data.length + 1;
        var maxCode = this.getMaxPaymentCode();
        var newCode = "0000000000" + maxCode;
        newCode = "PC" + newCode.slice(-6);
        return newCode;
    }
    /**
     * Hàm validate khi nhập số.
     * CreatedBy: VTNGA (23/10/2019)
     * */
    validateMoney() {
        var value = $(this).val();

        while (value.charAt(0) === '0') {   //Xóa bỏ số 0 đầu tiên của chuỗi.
            value = value.substr(1);
        }

        value = value.replace(/[^0-9]/g, '');//Xóa bỏ các ký tự đặc biệt khác các ký tự từ 0-9
        var arr = [];
        var i = value.length;
        var sliceElement;
        var sliceElement;
        while (i > 0) {
            sliceElement = value.slice(-3)
            arr.unshift(sliceElement);
            i -= 3;
            value = value.slice(0, i);
        }

        value = arr.join(",");
        $(this).val(value);

    }

    /**
     * Hàm validate khi nhập email.
     * CreatedBy: VTNGA (24/10/2019)
     * */
    validEmail(value) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (mailformat.test(value)) {
            //alert("You have entered an valid email address!")
            return true;
        }
        //alert("You have entered an invalid email address!")
        return false;
    }

    /**
     * Hàm validate khi nhập ngày/tháng/năm.
     * CreatedBy: VTNGA (24/10/2019)
     * */
    validateDate(value) {

        var isExistDate = true;
        if (!value || value.length != 10) {
            isExistDate = false;
        }
        else {
            var arr = value.split('/');
            if (arr.length != 3) {
                isExistDate = false;
            }
            else {
                var date = arr[2] + '/' + arr[1] + '/' + arr[0];
                date = new Date(date);
            }
            if (date.toString() !== 'Invalid Date') {
                date.setFullYear(arr[2], arr[1] - 1, arr[0]);
                if ((date.getFullYear() == arr[2]) && (date.getMonth() + 1 == arr[1]) && (date.getDate() == arr[0])) {
                }
                else {
                    isExistDate = false;
                }
            }
        }
        return isExistDate;
    }
    /**
     * Hàm validate khi nhập ngày/tháng/năm.
     * CreatedBy: VTNGA (24/10/2019)
     * */
    validDate(value) {
        var regex = /^\d\d\/\d\d\/\d\d\d\d$/;
        if (value.match(regex)) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * Hàm validate chỉ cho nhập số không cho nhập chữ và các kí tự đặc biệt
     * CreatedBy: VTNGA (25/10/2019)
     * */
    validateInputNumber(e) {
        var typeInput = e.data['jsObject'];
        var value = $(this).val();
        //Xóa bỏ số 0 đầu tiên của chuỗi.
        if (typeInput) {
            while (value.charAt(0) === '0') {
                value = value.substr(1);
            }
        }
        //Xóa bỏ các ký tự đặc biệt khác các ký tự từ 0-9
        value = value.replace(/[^0-9]/g, '');
        $(this).val(value);
    }

    /**
     * Hàm validate kiểm tra số điện thoại hợp lệ.
     * CreatedBy: VTNGA (25/10/2019)
     * */
    validPhoneNumber(value) {
        var regex = /^\d{10}$/;
        if (value.match(regex)) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * Hàm validate kiểm tra số tiền các mục chi tiết có lớn hơn 0?
     * CreatedBy: VTNGA (25/10/2019)
     * */
    checkDetailAmount() {
        var detailItems = $('#dlgDetailTable tbody tr');
        var x = true;
        if (detailItems.length != 0) {
            $.each(detailItems, function (index, item) {
                var amountItem = $(item).find('input.amount-input').val();
                if (amountItem <= 0) {
                    x = false;
                }
            });
        }
        else {
            x = false;
        }
        return x;
    }

    /**
     * Hàm xóa phiếu chi có id tương ứng.
     * CreatedBy: VTNGA (30/10/2019)
     * */
    deletePayment(url) {
        var x = 0;
        ajaxMethod.delete(url, {}, false, function (res) {
            x = 1;
        });
        return x;
    }

    /**
    * Hàm lấy value các input trong phiếu chi;
    * CreatedBy: VTNGA (31/10/2019)
    * */
    getInputDetailDialog() {
        var details = [];
        var rows = $('#dlgDetailTable tbody tr[detail]');
        $.each(rows, function (index, item) {
            var detail = {};
            var paymentDetailID = $(item).data('recordID');
            detail['PaymentDetailID'] = paymentDetailID;
            var fields = $(this).find('input[fieldName]');
            $.each(fields, function (fieldIndex, fieldItem) {
                var fieldName = fieldItem.getAttribute('fieldName');
                var fieldValue = fieldItem.value;
                detail[fieldName] = fieldValue;
            });
            details.push(detail);
        });
        return details;
    }

    /**
    * Hàm lấy value các input chi tiết trong phiếu chi;
    * CreatedBy: VTNGA (31/10/2019)
    * */
    getInputDialog() {
        var me = this;
        var payment = {};
        var fieldsPayment = $('.dlg-payment-detail input[payment]');
        $.each(fieldsPayment, function (index, item) {

            var fieldName = item.getAttribute('fieldName');
            var fieldValue = item.value;
            switch (fieldName) {
                case "Amount": fieldValue = new Number(fieldValue);
                    break;
                case "CustomerCode":
                    fieldName = "CustomerID";
                    if (fieldValue !== "") {
                        fieldValue = $(item).data('CustomerID');
                        if (!fieldValue) {
                            fieldValue = "";
                        }
                    }
                    break;
                case "EmployeePosition":
                    fieldName = "EmployeeID";
                    if (fieldValue !== "") {
                        fieldValue = $(item).data('EmployeeID');
                        if (!fieldValue) {
                            fieldValue = "";
                        }
                    }
                    break;
                case "LicenseDate":
                    var arr = fieldValue.split('/');
                    fieldValue = arr[2] + '-' + arr[1] + '-' + arr[0];
                    break;
            }

            payment[fieldName] = fieldValue;
        });
        var rowID = $('.dlg-payment-detail').data('PaymentID');
        if (rowID !== null) {
            payment['PaymentID'] = rowID;
        }
        return payment;
    }

    /**
    * Hàm thêm phiếu chi;
    * CreatedBy: VTNGA (31/10/2019)
    * */
    add(url, data) {
        var licenseNumber;
        ajaxMethod.post(url, data, false, function (res) {
            licenseNumber = res;
            debugger
        });
        return licenseNumber;
    }

    /**
    * Hàm sửa phiếu chi;
    * CreatedBy: VTNGA (02/11/2019)
    * */
    edit(url, data) {
        var licenseNumber;
        ajaxMethod.put(url, data, false, function (res) {
            licenseNumber = res;
        });
        return licenseNumber;
    }
    /**
    * Hàm xóa các mục chi tiết của phiếu chi;
    * CreatedBy: VTNGA (03/11/2019)
    * */
    delete(url) {
        ajaxMethod.delete(url, {}, false, function (res) {
        });
    }
    /**
    * Hàm lấy giá trị số chứng từ lớn nhất + 1;
    * CreatedBy: VTNGA (04/11/2019)
    * */
    getMaxPaymentCode() {
        var newcode;
        ajaxMethod.get('/payments/maxcode', {}, false, function (res) {
            newcode = res;
        });
        return newcode;
    }
    /**
* Hàm kiểm tra mã chứng từ đã tồn tại chưa;
* CreatedBy: VTNGA (04/11/2019)
* */
    checkExistPaymentCode(newCode) {
        var isExist = false;

        ajaxMethod.get('/existcode/' + newCode, {}, false, function (res) {
            isExist = res;
        });
        return isExist;
    }
    /**
    * Hàm cất dữ liệu khi thêm hoặc sửa;
    * CreatedBy: VTNGA (04/11/2019)
    * */
    save() {
        var me = this;
        var isEmpty = me.isEmptyInput();
        
        var date = $('#licenseDate').val();
        var isValidDate = me.validateDate(date);
        var oldPaymentCode = $('.dlg-payment-detail input[fieldName="LicenseNumber"]').data('oldValue');
        if (!isEmpty) {
            var payment = me.getInputDialog();
            var details = me.getInputDetailDialog();
            var isExist = me.checkExistPaymentCode(payment.LicenseNumber);
            debugger
            if (!isExist && me.DialogMode === AllMode.AddMode) {
                $('.dlg-payment-detail input[fieldName="LicenseNumber"]').parent().removeClass('alarm');
                $('.dlg-payment-detail .existed').hide();
                var checkAmount = me.checkDetailAmount();
                if (!isValidDate) {
                    $('#invalidDate').show();
                    $('#licenseDate').parent().addClass('alarm');
                }
                else if (!checkAmount) {
                    me.openAmountDialog();
                }
                else {
                    $.each(details, function (index, item) {
                        item['Amount'] = item['Amount'].replace(/[^0-9]/g, '');
                        item['Amount'] = parseInt(item['Amount']);
                    })
                    var totalAmount = me.totalDetail('.totalDetail', details);
                    payment['Amount'] = totalAmount;
                    var data = { Payment: payment, PaymentDetails: details }
                    var paymentID = me.add('/payments', data);
                    me.reloadData(paymentID);
                }
            }

            else if ((!isExist || oldPaymentCode === payment.LicenseNumber) && me.DialogMode === AllMode.EditMode) {
                $('.dlg-payment-detail input[fieldName="LicenseNumber"]').parent().removeClass('alarm');
                $('.dlg-payment-detail .existed').hide();
                var checkAmount = me.checkDetailAmount();
                if (!isValidDate) {
                    $('#invalidDate').show();
                    $('#licenseDate').parent().addClass('alarm');
                }
                else if (!checkAmount) {
                    me.openAmountDialog();
                }
                else {
                    $.each(details, function (index, item) {
                        item['Amount'] = item['Amount'].replace(/[^0-9]/g, '');
                        item['Amount'] = parseInt(item['Amount']);
                    })
                    var totalAmount = me.totalDetail('.totalDetail', details);
                    payment['Amount'] = totalAmount;
                    var data = { Payment: payment, PaymentDetails: details }
                    var paymentID = me.edit('/payments', data);
                    me.reloadData(paymentID);
                }
            }

            else {
                $('.dlg-payment-detail input[fieldName="LicenseNumber"]').parent().addClass('alarm');
                $('.dlg-payment-detail .existed').show();
            }

        }

    }

    /**
    * Hàm trả về tổng số bản ghi trong bảng Payment;
    * CreatedBy: VTNGA (23/11/2019)
    * */
    getRowNumber(filters) {
        var totalRow;
        ajaxMethod.post('/paymentrows', filters, false, function (res) {
            totalRow = res;
        });
        return totalRow;
    }
    /**
    * Hàm trả về chuỗi điều kiện filter dữ liệu;
    * CreatedBy: VTNGA (25/11/2019)
    * */
    getFilters() {
        var fields = $('th[fieldName]');
        var filters = [];
        var me = this;
        $.each(fields, function (index, field) {
            var filterItem = {};
            var fieldName = field.getAttribute('fieldName');
            var condition = $(field).find('.filter-condition').text();
            var filterInput = $(field).find('.filter-value').val();
            if (filterInput) {
                filterInput = filterInput.trim();
                switch (fieldName) {
                    case 'LicenseDate':
                        var validDate = me.validateDate(filterInput);
                        if (!validDate) {
                            var today = new Date();
                            filterInput = today.ddmmyyyy();
                            $(field).find('.filter-value').val(filterInput);
                        }
                        var arr = filterInput.split('/');
                        filterInput = arr[2] + '-' + arr[1] + '-' + arr[0];
                        break;
                    case 'LicenseType':
                        condition = '=';
                        break;
                }

                filterItem.FieldName = fieldName;
                filterItem.Condition = condition;
                filterItem.Value = filterInput;

                filters.push(filterItem);
            }
        });
        return filters;
    }

    /**
    * Hàm lấy dữ liệu trang đầu tiên;
    * CreatedBy: VTNGA (23/11/2019)
    * */
    getFirstPage() {
        $('#pageNumber').val(1);
        this.reloadData();
    }

    /**
    * Hàm lấy dữ liệu trang cuối cùng;
    * CreatedBy: VTNGA (23/11/2019)
    * */
    getLastPage() {
        var filters = this.getFilters();
        var totalRows = parseInt(this.getRowNumber(filters));
        var pageSize = parseInt($('#pageSize').text());
        var totalPage = Math.ceil(totalRows / pageSize);
        $('#pageNumber').val(totalPage);
        this.reloadData();
    }

    /**
    * Hàm lấy dữ liệu trang tiếp theo;
    * CreatedBy: VTNGA (23/11/2019)
    * */
    getNextPage() {
        var nextPage = parseInt($('#pageNumber').val()) + 1;
        $('#pageNumber').val(nextPage);
        this.reloadData();
    }

    /**
    * Hàm lấy dữ liệu trang trước;
    * CreatedBy: VTNGA (23/11/2019)
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
    * Hàm giải mã các ký tự đặc biệt trong html
    * CreatedBy: VTNGA (26/12/2019)
    * */
    decodeEntities(encodedString) {
        var div = document.createElement('div');
        div.innerHTML = encodedString;
        return div.textContent;
    }
}


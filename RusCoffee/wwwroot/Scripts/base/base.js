//import { isEmpty } from "../../lib/codemirror/src/util/misc";

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
            ajaxMethod.get(url, { mas }, false, function (res) {
                data = res;
            });
        }

        return data;
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
    loadData(table, recordName, dataValue, userList) {
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
                if (userList) {
                    
                    var user = userList.filter(function (e) { return e.Id == item.EmployeeID })[0];
                    if (fieldName == "FullName" || fieldName == "UserCode") {
                        fieldValue = user[fieldName];
                    }
                    else {
                        fieldValue = item[fieldName];
                    }
                }
                else {
                    fieldValue = item[fieldName];
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
                            fieldValue = fieldValue.formatMoney();
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
                            var td = '<td><a href="#" class="btn btn-sm btn-danger float-right m-t-n-xs ml-2 DeleteBtn">Xóa</a><a data-toggle="modal" href="#invoice-form" class="btn btn-sm btn-primary float-right m-t-n-xs ml-2 ViewBtn">Xem</a></td>';
                            break;
                        case "ActionDetail":
                            var td = '<td><a href="#" class="btn btn-sm btn-danger float-right m-t-n-xs ml-2 deleteRow">Xóa</a>';
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

    /* *
    * hàm sau khi load lại trang
    * CreatedBy: VTNGA(04/01/2020)
    * */
    afterLoadData() {

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
                            fieldValue = parseFloat(fieldValue);
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

    checkEmpty() {
        var requires = $('input[notEmpty],input[notempty]');
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


/* Thực hiện khởi tạo đối tượng js của trang payment.html */
$(document).ready(function () {
    var token = JSON.parse(sessionStorage.getItem('accessUser'));
    if (!token) {
        window.open("index.html", "_self");
    }
    paymentJS = new PaymentJS();
});

/**
 * Class quản lý js của trang payment.html
 * CreatedBy: VTNGA (08/10/2019)
 * */
class PaymentJS extends Base {
    constructor() {
        super();
        var masterData = this.getData("/payments");
        this.loadData("#tbPaymentList", "PaymentID", masterData);
        this.afterLoadData();
        this.setAccountName();
        this.initEvent();
    }
    /**
     * Hàm khởi tạo sự kiện
     * CreatedBy: VTNGA (15/10/2019)
     * */
    initEvent() {

        var me = this;
        var currentRow;
        //mở dialog thêm
        $(document).on('click', '#btnAdd .payment-item,.menu-context .btnAddPayment,.dlg-payment-detail .btnAdd', this.openAddDialog.bind(this));
        $('#alarmAmountDialog').on('click', '.btn-yes', function () {
            $('#alarmAmountDialog').dialog('close');
        });
        //Mở dialog sửa
        $('.content-grid .toolbar .btnEdit,.menu-context .btnEdit').on('click', function () {
            var rowID = me.getRowID();
            currentRow = rowID;
            me.openEditDialog(currentRow);
        });
        //Mở dialog nhân bản
        $('.content-grid .toolbar .btnDuplicate,.menu-context .btnDuplicate').on('click', function () {
            var rowID = me.getRowID();
            currentRow = rowID;
            me.openDuplicateDialog(currentRow);
        });
        $('.dlg-payment-detail').on('click', '.btnCancel', function () {
            me.openViewDialog(currentRow);
        });
        //Mở dialog xóa
        $(document).on('click', '.btnDelete', me.openDeleteDialog.bind(this));
        //Mở dialog xem
        $('.content-grid .toolbar .btnView,.menu-context .btnView').on('click', function () {
            var rowID = me.getRowID();
            currentRow = rowID;
            me.openViewDialog(currentRow);
        });
        $('.dlg-payment-detail').on('click', '.btnEdit', function () {
            me.openEditDialog(currentRow);
        });

        //Xóa phiếu chi
        $(document).on('click', '#deleteDialog .btn-yes', function () {
            var rowIDs = me.getMultiRowID();
            $.each(rowIDs, function (index, item) {
                me.deletePayment('/payments/' + item);
            });

            $('#deleteDialog').dialog('close');
            me.reloadData();
        });

        //Đóng dialog cảnh báo xóa phiếu chi
        $('#deleteDialog').on('click', '.btn-no', function () {
            $('#deleteDialog').dialog('close');
        });

        //Hàm thực hiện cất dữ liệu
        $(document).on('click', '.dlg-payment-detail #dlgBtnSave, .alarm-change-dialog .btn-yes', this.save.bind(this));

        $(document).on('keyup', '.amount-input', this.validateMoney);
        $(document).on('keyup', '.page-input', { 'jsObject': true }, this.validateInputNumber);
        //kiểm tra ô input không được để trống
        $('.dlg-payment-detail input[notEmpty]').focus(function () {
            $(this).parent().removeClass('alarm');
            $(this).siblings('.notEmpty').hide();
        });

        //Đóng dialog phiếu chi
        $(document).on('click', '.ui-widget-header .ui-icon-closethick,.dlg-payment-detail .btnClose', this.closeDialog.bind(this));

        $('.alarm-change-dialog').on('click', '.btn-no', function () {
            $('.alarm-change-dialog').dialog('close');
            $('.dlg-payment-detail').dialog('close');
            $('.toolbar .sub-toolbar').hide();
        });
        $('.alarm-change-dialog').on('click', '.dlg-btn', function () {
            $('.alarm-change-dialog').dialog('close')
        });
        //Gán phím tắt cho các chức năng thao tác với dialog
        $(document).on('keydown', this.DialogShortCut.bind(this));
        //
        $('.objectTable').on('focusin', function () {
            if (me.DialogMode === AllMode.ViewMode) {
                $(this).find('.object-table').hide();
            }
            else {
                $(this).find('.object-table').show();
                $('.object-table tr.rowSelected').removeClass('rowSelected');
                $('.object-table tr.ct-hover-primary').removeClass('ct-hover-primary');
            }
        });
        $('.objectTable').on('focusout', function () {
            $(this).find('.object-table').hide();
        });
        //gán dữ liệu khi click vào hàng trong bảng Employee, Customer trong dialog phiếu tchi.
        $('#dlgEmployeeTable').on('click', 'tbody tr', function () {
            var rowId = $(this).data('recordID');
            var data = me.getData('/employees/' + rowId);
            me.bindEmployee(data, rowId);
        });
        $('#dlgCustomerTable').on('click', 'tbody tr', function () {
            var rowId = $(this).data('recordID');
            var data = me.getData('/customers/' + rowId);
            me.bindCustomer(data, rowId);
        });

        //phím tắt xử lý điều hướng lên xuống trong bảng dữ liệu
        $(document).on('keydown', '.objectTable', function () {
            var keyCode = event.keyCode;
            if (keyCode === 38 || keyCode === 40 || keyCode === 13) {
                me.showObjectTable(keyCode, event.target);
            }

        }.bind(this));
        //gán sự kiện cho nút phóng to, thu nhỏ dialog
        $(document).on('click', '.btn-icon-zoom', function () {
            $(this).toggleClass('btn-icon-minimize');
            $('.ui-dialog').toggleClass('large-screen');
            $('.dlg-payment-detail').toggleClass('w-100');
        });
        //gán sự kiện khi click vào 1 hàng trong các bảng
        $("#tbPaymentList").on('click', 'tbody tr', this.ctrlClickRow);
        $("#dlgDetailTable").on('click', 'tbody tr', this.ctrlClickRow);
        $('#tbPaymentList').on('click', 'tbody tr', function () {
            $('.menu-context').hide();
            currentRow = $(this).data('recordID');
            var data = me.getData("/paymentdetails/" + currentRow);
            me.loadData("#tbDetailPaymentList", "PaymentDetailID", data);
            me.totalDetail('.totalDetail', data);
        });
        //gán sự kiện khi nhấn nút thêm, xóa dòng chi tiết
        $('.dlg-toolbar-bottom').on('click', '#btnAddDetail', this.addDetailRow);
        $('.dlg-toolbar-bottom').on('click', '#btnDeleteDetail', this.deleteDetailRow);
        $('.dlg-payment-detail').on('click', '#saveArrow', function () {
            $('.sub-dlg-toolbar').toggle();
        });

        $('.dlg-input[fieldName="CustomerCode"]').on('focusout', function () {
            var oldCode = $(this).data('CustomerCode');
            var newCode = $(this).val();
            if (oldCode !== newCode && newCode !== "") {
                $(this).val(oldCode);
            }
        });
        $('.dlg-input[fieldName="EmployeePosition"]').on('focusout', function () {
            var oldCode = $(this).data('EmployeePosition');
            var newCode = $(this).val();
            if (oldCode !== newCode && newCode !== "") {
                $(this).val(oldCode);
            }
        });

        //Gán sự kiện phân trang khi nhập số trang và nhấn Enter
        $('#pageNumber').on('keyup', function (e) {
            if (e.keyCode == 13) {
                me.reloadData();
            }
        });
        $('.filter-btn,.btn-triggerWrap,.license-filter-btn').on('click', '.trigger-bountlist-item', function () {
                me.reloadData();
        })

    //hàm thực hiện phân trang khi click vào các button chuyển trang (trang trước, trang sau, trang đầu tiên, trang cuối cùng).atedBy: VTNGA(23/11/2019)
        $('#firstPage').on('click', this.getFirstPage.bind(this));
        $('#nextPage').on('click', this.getNextPage.bind(this));
        $('#prevPage').on('click', this.getPrevPage.bind(this));
        $('#lastPage').on('click', this.getLastPage.bind(this));

        //Gán sự kiện phân trang
        $('#tbPaymentList .filter-value').on('keyup', function (e) {
            if (e.keyCode === 13) {
                if ($(".datepicker").datepicker("widget").is(":visible")) {
                    $(".datepicker").datepicker("hide")
                }
                me.reloadData();
            }
        });
        //Sự kiện phím tắt điều hướng tại các combobox filter
        $('.triggerWrap').on('keydown', function () {
            var keyCode = event.keyCode;
            if (keyCode === 38 || keyCode === 40 || keyCode === 13) {
                me.showComboboxBoundList(keyCode, event.target);
            }
        }.bind(this));


    //hàm thực hiện mở datapicker và phân trang khi click vào datepicker chọn ngày.
        $('.datepicker').datepicker({
            onSelect: function () {
                if ($('.dlg-payment-detail').is(':visible')) {
                    $(this).parent().removeClass('border-input-warning,alarm');
                    $(this).parent().removeClass('alarm');
                    $(this).siblings('.notEmpty').hide();
                }
                else {
                    me.reloadData();
                }
            },
            showOn: 'both',
            buttonImage: '/Contents/images/form/date-trigger.png',
            dateFormat: "dd/mm/yy",
            buttonImageOnly: true,
        });
    }

    /*
     * Gán lại tên người dùng khi user đăng nhập vào tài khoản
    * CreatedBy: VTNGA(29/11/2019)
    * */
    setAccountName() {
        var result = JSON.parse(sessionStorage.getItem('accessUser'));
        if (result.Token) {
            var accountName = result["FirstName"] + " " + result["LastName"];
            $('.account-name span').text(accountName);
        }

    }

    /*
    * Gán dữ liệu cho đối tượng nhận khi chọn một hàng trong bảng khách hàng
    * CreatedBy: VTNGA(29/11/2019)
    * */
    bindCustomer(data, rowId) {

        var fields = $('#dlgCustomerTable th[fieldName]');
        $.each(fields, function (index, item) {
            var fieldName = item.getAttribute('fieldName');
            var fieldValue = data[fieldName];
            if (fieldName === 'CustomerCode') {
                $('.dlg-payment-detail input[fieldName="' + fieldName + '"]').data('CustomerID', rowId);
                $('.dlg-payment-detail input[fieldName="' + fieldName + '"]').data('CustomerCode', fieldValue);
            }
            else if (fieldName === "CustomerName") {
                $('.dlg-payment-detail input[fieldName="CustomerName"],.dlg-payment-detail input[fieldName="AssignTo"]').val(fieldValue);
            }
            var input = $('.dlg-payment-detail input[fieldName="' + fieldName + '"]');
            input.val(fieldValue);
            input.parent().removeClass('alarm');
            input.siblings('.notEmpty').hide();
        });
        $('#address').focus();
        $('.object-table').hide();

    }

/* *
* Gán dữ liệu cho đối tượng nhận khi chọn một hàng trong bảng nhân viên
* CreatedBy: VTNGA(29/11/2019)
* */
    bindEmployee(data, rowId) {
        var fields = $('#dlgEmployeeTable th[fieldName]');

        $.each(fields, function (index, item) {
            var fieldName = item.getAttribute('fieldName');
            var fieldValue = data[fieldName];
            if (fieldName === 'EmployeePosition') {
                $('.dlg-payment-detail input[fieldName="' + fieldName + '"]').data('EmployeeID', rowId);
                $('.dlg-payment-detail input[fieldName="' + fieldName + '"]').data('EmployeePosition', fieldValue);
            }
            var input = $('.dlg-payment-detail input[fieldName="' + fieldName + '"]');
            input.val(fieldValue);
            input.parent().removeClass('alarm');
            input.siblings('.notEmpty').hide();
        });
        $('#autoCreateCode').focus();
        $('.object-table').hide();
    }

    /**
* Điều hướng lên xuống cho bảng
* CreatedBy: VTNGA(03/12/2019)
*/
    showObjectTable(keyCode, target) {
        var bountlistEl = $(target).siblings('.object-table');
        var bountlistItemEls = bountlistEl.find('tbody');
        var elChildHover = bountlistItemEls.find('tr.ct-hover-primary');
        switch (keyCode) {
            case 40:
                event.preventDefault();
                bountlistEl.show();
                bountlistItemEls.find('tr').removeClass('ct-hover-primary');
                if (elChildHover.html() && elChildHover.next().html()) {
                    elChildHover.next().addClass('ct-hover-primary');
                } else {
                    bountlistItemEls.children().first().addClass('ct-hover-primary');
                }
                bountlistEl.scrollTop(0);//set to top
                bountlistEl.scrollTop(($('.ct-hover-primary').offset().top - bountlistEl.offset().top) - bountlistEl.height() + 32);

                break;
            case 38:
                event.preventDefault();
                bountlistEl.show();
                bountlistItemEls.find('tr').removeClass('ct-hover-primary');
                if (elChildHover.html() && elChildHover.prev().html()) {
                    elChildHover.prev().addClass('ct-hover-primary');
                } else {
                    bountlistItemEls.children().last().addClass('ct-hover-primary');
                }
                bountlistEl.scrollTop(0);//set to top
                bountlistEl.scrollTop(($('.ct-hover-primary').offset().top - bountlistEl.offset().top) - bountlistEl.height() + 32);
                break;
            case 13:
                bountlistEl.hide();
                var itemSelected = bountlistItemEls.find('.ct-hover-primary').first();
                bountlistItemEls.find('tr.rowSelected').removeClass('rowSelected');
                itemSelected.find('.ct-hover-primary').removeClass('ct-hover-primary');
                itemSelected.addClass('rowSelected');

                if (bountlistEl.attr('id') === 'dlgEmployeeTable') {
                    var rowId = bountlistItemEls.find('tr.rowSelected').data('recordID');
                    var data = this.getData('/employees/' + rowId);
                    this.bindEmployee(data, rowId);
                }
                else {
                    var rowId = bountlistItemEls.find('tr.rowSelected').data('recordID');
                    var data = this.getData('/customers/' + rowId);
                    this.bindCustomer(data, rowId);
                }

                break;
            default:
                break;
        }
    }

/**
* Điều hướng lên xuống cho combobox filter
* CreatedBy: VTNGA(03/12/2019)
*/
    showComboboxBoundList(keyCode, target) {
        var bountlistEl = $(target).children('.trigger-bountlist-box').first();
        var bountlistItemEls = bountlistEl.children();
        var elChildHover = bountlistEl.find('.ct-hover-primary').first();
        switch (keyCode) {
            case 40:
                event.preventDefault();
                bountlistEl.show();
                bountlistItemEls.removeClass('ct-hover-primary');
                if (elChildHover.html() && elChildHover.next().html()) {
                    elChildHover.next().addClass('ct-hover-primary');
                } else {
                    bountlistEl.children().first().addClass('ct-hover-primary');
                }
                break;
            case 38:
                event.preventDefault();
                bountlistEl.show();
                bountlistItemEls.removeClass('ct-hover-primary');
                if (elChildHover.html() && elChildHover.prev().html()) {
                    elChildHover.prev().addClass('ct-hover-primary');
                } else {
                    bountlistEl.children().last().addClass('ct-hover-primary');
                }
                break;
            case 13:
                debugger
                bountlistEl.hide();
                var itemSelected = bountlistEl.find('.ct-hover-primary').first();
                bountlistEl.find('.bountlist-selected').removeClass('bountlist-selected');
                itemSelected.find('.ct-hover-primary').removeClass('ct-hover-primary');
                itemSelected.addClass('bountlist-selected');
                if (itemSelected.hasClass('license-type')) {
                    var text = itemSelected.text();
                    var filterBtn = itemSelected.parents('.license-filter-btn');
                    filterBtn.siblings('.filter-value').val(text);
                    filterBtn.blur();
                }
                else {
                    var text = itemSelected.text().slice(0, 1);
                    var filterBtn = itemSelected.parents('.filter-btn');
                    filterBtn.find('.btn-value').text(text);
                    filterBtn.blur();
                }
                this.reloadData();
                break;
            default:
                break;
        }
    }
}

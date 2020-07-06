$(document).ready(function () {

    var oInvoiceList = new InvoiceList();
    var data = oInvoiceList.getData();
    $('#totalPage').text(Math.ceil(data.totalRow / 25));
    $('#totalRow').text(data.totalRow);
    debugger
    oInvoiceList.loadData('#grdInvoice', 'InvoiceID', data.data, oUsers);
    oInvoiceList.initEvent();
});


class InvoiceList extends Base {
    initEvent() {
        var me = this;
        me.userAccess = JSON.parse(sessionStorage.getItem('accessUser'));
        $('#grdInvoice').on('click', '.ViewBtn', me.bindingData);
        $('#grdInvoice').on('click', '.DeleteBtn', me.deleteInvoice);
        $('.search').on('click', '#reload', me.reloadData.bind(this));
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
            $('#invoice-form').modal('hide');
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
        ajaxMethod.post('/invoicepaging/' + pageNumber, { fromDate: fromDate, toDate: toDate }, false, function (res) {
            data = res;
        })
        return data;
    }

    /**
     * Lấy id của bản ghi được chọn trong grid
     * @param {any} selector
     */
    getItemID(selector) {
        var id = selector.dataset['itemid'];
        return id;
    }

    /**
     * Mở form xem chi tiết hóa đơn
     **/
    bindingData() {
        var items = $('#invoice-form').find('input[fieldName]');
        var id = $(this).closest('tr').data('recordID');
        ajaxMethod.get('/invoiceitem/' + id, {}, false, function (res) {
            //Điền chi tiết hóa đơn
            if (res) {
                $.each(JSON.parse(res.DetailItem), function (i, e) {
                    var detailItem = '<div class="form-group d-flex"><label style="width:150px"></label> <div class="d-flex justify-content-between w-100 px-2" style="border:none;border-bottom:1px dotted #c0c0c0;"><span>' + e.ItemName + '</span><span> SL: ' + e.Quantity + '</span><span>Tổng: ' + e.Amount + ' VND</span></div></div>';
                    $('#invoiceDetail').append(detailItem);
                });
            }
        })
        ajaxMethod.get('/invoice/' + id, {}, false, function (res) {
            //Điền chi tiết hóa đơn
            if (res) {
                $.each(items, function (index, item) {
                    var fieldName = item.getAttribute('fieldName');
                    var value;
                    switch (fieldName) {
                        case 'InvoiceDate':
                            value = new Date(res.InvoiceDate);
                            if (value != "Invalid Date") {
                                value = value.ddmmyyyy();
                            } else {
                                value = "";
                            }
                            break;
                        case 'TotalAmount':
                            value = res.TotalAmount + ' VND';
                            break;
                        default:
                            value = "default";
                    }
                    $(item).val(value);
                    $(item).attr('disabled', true);
                });
            }

        });


    }

    deleteInvoice() {
        var ok = confirm("Bạn có thực sự muốn xóa hóa đơn này không!");
        if (ok) {
            var id = $(this).closest('tr').data('recordID');
            ajaxMethod.delete('/invoice/' + id, {}, false, function (res) {

            })
            window.location.href = '/Tables/InvoiceList';
        }
    }
    reloadData() {
        var me = this;
        var data = me.getData();
        var totalPage = Math.ceil(data.totalRow / 25);
        var pageNumber = $('#pageNumber').val();
        if (pageNumber > totalPage) {
            $('#pageNumber').val(totalPage)
        }
        $('#totalPage').text(totalPage);
        $('#totalRow').text(data.totalRow);
        data = me.getData();
        me.loadData('#grdInvoice', 'InvoiceID', data.data, oUsers);
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
        data = this.getData();
        this.loadData('#grdInvoice', 'InvoiceID', data.data, oUsers);
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
}

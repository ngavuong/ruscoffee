$(document).ready(function () {

    var oOrder = new Order();
    oOrder.initEvent();
});

class ItemList extends Base {

    initEvent() {
        var me = this;
        me.listItem = [];
        me.selectList = [];
        me.listItemDetail = [];
        me.userAccess = JSON.parse(sessionStorage.getItem('accessUser'));
        //Order thêm món
        $('#orderPage #grdMenu').on('click', '.btn-add-order', function () {
            me.addItemToGrid(this);
        });

        //Xóa chọn món
        $('#grdOrderSelect').on('click', '.delete-item-btn', { jsObject: me }, me.deleteOrder);
        //Mở form lập hóa đơn
        $('#create-invoice').on('click', me.createInvoice.bind(this));
        //Lưu hóa đơn
        $('#saveInvoice').on('click', me.saveInvoice.bind(this));
        $('#grdOrderSelect').on('blur', 'input.quantity', { jsObject: me }, me.caculateTotalAmount);
        $('#invoice-form').on('click', '.closeBtn', function () {
            jQuery.noConflict();
            $('#invoice-form').modal('hide');
        })
    }

    /**
     * Order thêm món mới
    **/
    addItemToGrid(selector) {
        var me = this,
            id,
            itemDetail = {},
            currentItem;
        id = selector.dataset['itemid'];
        var existItem = me.selectList.filter(function (e) { return e.ItemID == id });
        if (existItem.length > 0) {
            var existTr = $($('#grdOrderSelect tbody tr[itemid="' + id + '"]'));
            var quatityInput = existTr.find('input.quantity');
            var currentOrder = parseInt(quatityInput.val());
            quatityInput.val(++currentOrder);
            var amountInput = existTr.find('td.amount');
            amountInput.text(parseFloat((existItem[0].UnitPrice) * currentOrder).formatMoney());
            me.listItemDetail[id].Quantity = currentOrder;
            me.listItemDetail[id].Amount = parseFloat(existItem[0].UnitPrice) * currentOrder;
        }
        else {
            currentItem = listItem.filter(function (e) { return e.ItemID == id })[0];
            var tr = '<tr itemid="' + currentItem.ItemID + '">'
                + '<td>' + currentItem.ItemName + '</td>'
                + '<td> <input class="quantity" type="number" style="border:none;width:40px;padding:3px" value="1" /></td>'
                + '<td class="amount">' + currentItem.UnitPrice.formatMoney() + '</td>'
                + '<td>'
                + '<button class="btn btn-sm btn-danger float-right m-t-n-xs delete-item-btn"><strong>Xóa</strong></button>'
                + '</td>'
                + '</tr>';
            $('#grdOrderSelect tbody').append(tr);
            me.selectList.push(currentItem);
            itemDetail.ItemID = id;
            itemDetail.ItemName = currentItem.ItemName;
            itemDetail.Quantity = 1;
            itemDetail.Amount = currentItem.UnitPrice;
            me.listItemDetail[id] = itemDetail;
        }
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
     * Bỏ chọn món
     * @param {any} e
     */
    deleteOrder(e) {
        var me = e.data['jsObject'];
        var tr = $(this).parents('tr');
        tr.remove();
        var id = tr.attr('itemid');
        me.selectList = me.selectList.filter(function (e) { return e.ItemID != id });
        //xóa item khỏi mảng chi tiết hóa đơn
        delete me.listItemDetail[id];
    }

    /**
     * Mở form lập hóa đơn
     * */
    createInvoice() {
        var me = this;
        var tr = $('#grdOrderSelect tbody tr'),
            totalAmount = 0;

        var items = $('#invoice-form').find('input[fieldName]');

        //Điền chi tiết hóa đơn
        for (const [key, e] of Object.entries(me.listItemDetail)) {
            var detailItem = '<div class="form-group d-flex"><label style="width:150px"></label> <div class="d-flex justify-content-between w-100 px-2" style="border:none;border-bottom:1px dotted #c0c0c0;"><span>' + e.ItemName + '</span><span> SL: ' + e.Quantity + '</span><span>Tổng: ' + e.Amount + ' VND</span></div></div>';
            $('#invoiceDetail').append(detailItem);
            totalAmount += parseFloat(e.Amount);
        }

        $.each(items, function (index, item) {
            var fieldName = item.getAttribute('fieldName');
            var value;
            switch (fieldName) {
                case 'EmployeeName':
                    value = me.userAccess.FullName;
                    break;
                case 'EmployeeCode':
                    value = me.userAccess.UserCode;
                    break;
                case 'InvoiceDate':
                    value = new Date().ddmmyyyy();
                    break;
                case 'TotalAmount':
                    value = totalAmount + ' VND';
                    break;
                default:
                    value = "default";
            }
            $(item).val(value);
        });

    }

    /**
     * Lưu hóa đơn
     * */
    saveInvoice() {
        var me = this,
            totalAmount = 0,
            master = {},
            details = [];
        for (const [key, e] of Object.entries(me.listItemDetail)) {
            totalAmount += parseFloat(e.Amount);
            var detail = {};
            detail.ItemName = e.ItemName;
            detail.ItemID = e.ItemID;
            detail.Quantity = e.Quantity;
            detail.Amount = e.Amount;
            details.push(detail);
        }
        var detailItem = JSON.stringify(details);
        master.InvoiceDate = new Date();
        master.EmployeeID = me.userAccess.Id;
        master.TotalAmount = totalAmount;
        master.TableNumber = parseInt($('#orderPage #tableNumber').val());

        ajaxMethod.post('/invoice/saveinvoice', { Master: master, DetailItem: detailItem }, false, function (res) {
            console.log(1);
        });
        window.location.href = '/AppViews/OrderMenu';
    }

    caculateTotalAmount(e) {
        var me = e.data['jsObject'];
        var existTr = $(this).parents('tr');
        var quatity = $(this).val();
        if (quatity <= 0) {
            quatity = 1;
            $(this).val(1);
        }
        var id = existTr.attr('itemid');
        var existItem = me.selectList.filter(function (e) { return e.ItemID == id });
        if (existItem.length > 0) {
            quatity = parseInt(quatity);
            var amountInput = existTr.find('td.amount');
            amountInput.text(((existItem[0].UnitPrice) * quatity).formatMoney());
            me.listItemDetail[id].Quantity = quatity;
            me.listItemDetail[id].Amount = parseFloat(existItem[0].UnitPrice) * quatity;
        }
    }
}

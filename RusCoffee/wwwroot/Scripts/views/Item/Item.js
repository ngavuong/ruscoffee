$(document).ready(function () {
    var oItem = new Item();
});

class Item {
    constructor() {
        this.loadData();
        this.initEvent();
    }
    
    initEvent() {
        var me = this;
        me.EditMode;
        me.editItemID;
        me.userAccess = JSON.parse(sessionStorage.getItem('accessUser'));
        $('.search').on('click', '#reload', me.loadData.bind(this));
        //Lưu món mới
        $('#saveItem').on('click', me.saveItem.bind(this));
        $('#create-item').on('click', me.createItem.bind(this));
        //Sửa thông tin món 
        $('#orderPage #grdMenu').on('click', '.edit-item-btn', { jsObject: me }, me.editItem);
        $('#orderPage #grdMenu').on('click', '.delete-item-btn', { jsObject: me }, me.deleteItem);
        $('#item-form').on('click', '.closeBtn', function () {
            jQuery.noConflict();
            $('#item-form').modal('hide');
        })
    }

    /**
     * Mở form lập hóa đơn
     * */
    createItem() {
        var me = this;
        me.EditMode = 1;//Thêm mới
    }

    /**
     * Mở form lập hóa đơn
     * */
    editItem(e) {
        var me = e.data['jsObject'];
        me.EditMode = 2;//Sửa
        //Bind data
        var id = this.dataset['itemid'];
        me.editItemID = id;
        ajaxMethod.get('/item/' + id, {}, false, function (res) {
            var items = $('#item-form').find('input[fieldName]');
            $.each(items, function (index, item) {
                var fieldName = item.getAttribute('fieldName');
                $(item).val(res[fieldName]);
            });
        });
    }

    /**
     * Lưu hóa đơn
     * */
    saveItem() {
        var me = this,
            newItem = {};
        var items = $('#item-form').find('input[fieldName]');
        var formData = new FormData();
        $.each(items, function (index, item) {
            var fieldName = item.getAttribute('fieldName');
            var value;
            if (fieldName == 'File') {

                var file = item.files[0];
                
                formData.append("File", file);
                //value = formData;
            }
            else {
                formData.append(fieldName, $(item).val());
                //value = $(item).val();
            }
            //newItem[fieldName] = value;
        });

        if (me.EditMode == 2) {
            formData.append("ItemID", me.editItemID);
        }
        if (!me.checkEmpty()) {
            if (formData.get("File") == "undefined" || formData.get("File") == null) {
                alert("Bạn chưa chọn ảnh cho món!");
            }
            else {
                $.ajax({
                    url: '/item/' + me.EditMode,
                    method: 'POST',
                    enctype: 'multipart/form-data',
                    async: false,
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (response) {
                    },
                    error: function (e) {
                        console.log(e);
                    }
                })
                newItem.ItemID = "";
                me.loadData();
                $('#item-form').hide();
                $('.modal-backdrop').hide();
            }
        }
    }

    /**
     * Xóa món
     * */
    deleteItem(e) {
        var me = e.data['jsObject'];
        var id = this.dataset['itemid'];
        var ok = confirm("Bạn có thực sự muốn xóa món không!");
        if (ok) {
            ajaxMethod.delete('/item/' + id, {}, false, function (res) {

            });
            me.loadData();
            $('#item-form').hide();
            $('.modal-backdrop').hide();
        }
        //window.location.href = '/AppViews/OrderMenu';
    }

    loadData() {
        var data = [];
        var name = $('#itemSearch').val();
        ajaxMethod.post('/itemname', name, false, function (res) {
            data = res;
        });
        $('#grdItem').empty();
        $.each(data, function (i, e) {
            var item = '<div class="col-lg-4" data-refID="abc">'
                + '<div class="contact-box">'
                + '<div class="row">'
                + ' <div class="col-12">'
                + ' <div class="text-center">'
                + ' <img alt="image" class="m-t-xs img-fluid" src="/upload/' + e.ImagePath + '"/>'
                + '</div>'
                + ' </div>'
                + '<div class="col-12 center w-100">'
                + '<h5><b>' + e.ItemName + '</b></h5>'
                + '<h5>' + e.UnitPrice + '</h5>'
                + ' <button class="btn btn-sm btn-danger float-right m-t-n-xs ml-2 delete-item-btn" data-itemID="' + e.ItemID + '"><strong>Xóa</strong></button>'
                + '<a data-toggle="modal" class="btn btn-sm float-right m-t-n-xs btn btn-success ml-2 edit-item-btn" href="#item-form" data-itemID="' + e.ItemID + '">Sửa</a>'
                //+ '<button class="btn btn-sm btn-primary float-right m-t-n-xs ml-2 btn-add-order" data-itemID="' + e.ItemID + '"> <strong>Chọn</strong></button >'
                + '</div >'
                + '</div >'
                + '</div >'
                + '</div >';
            $('#grdItem').append(item);
        });
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

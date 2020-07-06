$(document).ready(function () {
    mainJs = new Main();
});

class Main {
    constructor() {
        this.initEvent();
    }
    initEvent() {
        $('.header-account-box').click(this.showAccountActionMenu);
        $('button.filter-btn').click(this.activeButtonFilterSelected);
        $('button.filter-btn').blur(this.deactiveButtonFilterSelected);
        $(document).click(function () {
            $('.hide-outside-click').hide();
        });
        $('.main-table').on('contextmenu', 'tbody tr', this.openMenuContext);
        $('.menu-context').on('click', '.sub-context-item', this.closeMenuContext);
        
        $('.toolbar button.btnAdd').on('click', this.showSubToobar);
    }
    activeButtonFilterSelected() {
        $('button.filter-btn').removeClass('filter-btn-active');
        this.classList.add('filter-btn-active');
    }
    deactiveButtonFilterSelected() {
        this.classList.remove('filter-btn-active');
    }
    /**
     * Hiển thị menu của tài khoản người dùng khi nhấn vào thông tin người dùng
     * Author: NVMANH (21/08/2019)
     * */
    showAccountActionMenu() {
        $(this).find('.account-action-box').show();
        event.stopPropagation();
    }

    /**
     * Hiển thị menu-context khi người dùng nhấp chuột phải vào từng hàng trong bảng dữ liệu chính.
     * CreatedBy: VTNGA (12/10/2019)
    **/
    openMenuContext(event) {
        event.preventDefault();
        $('.menu-context').hide();

        $(this).siblings('.row-selected').removeClass('row-selected');
        this.classList.add('row-selected');
        $(this).siblings('.rowSelected').removeClass('rowSelected');
        this.classList.add('rowSelected'); 

        var rowSelected = $('.row-selected');
        if (rowSelected.length == 1) {
            $('.btnEdit').removeAttr('disabled')
            $('.btnDelete').removeAttr('disabled')
            $('.btnView').removeAttr('disabled')
            $('.btnDuplicate').removeAttr('disabled')
        }
        else {
            $('.btnEdit').attr('disabled', true);
            $('.btnView').attr('disabled', true);
            $('.btnDuplicate').attr('disabled', true);
        }
        var positionX = event.pageX;
        var positionY = event.pageY;
        $('.menu-context').css({ 'left': positionX + 'px', 'top': positionY + 'px' });
        $('.menu-context').show();

    }

    /**
     * Đóng menu-context.
     * CreatedBy: VTNGA (12/10/2019)
    **/
    closeMenuContext() {
        $('.menu-context').hide();
        //this.openDialog();
    }
    /**
     * Hiện mục lựa chọn thêm mới phiếu chi hoặc phiếu thu
     * CreatedBy: VTNGA (05/11/2019)
    **/
    showSubToobar() {
        $('.toolbar .toolbar-item .sub-toolbar').show();
    }
}
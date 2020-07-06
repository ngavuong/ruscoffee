$(document).ready(function () {
    combobox = new Combobox();
})
class Combobox {
    constructor() {
        this.initControl();
        this.initEvent();
    }
    initControl() {


    }
    initEvent() {
        $('.combobox').on('focusin', 'input, button', function () {
            var element = $(this);
            element.parent().addClass('ct-border-focus-primary');
        })
        $('.combobox').on('focusout', 'input,button', function () {
            var element = $(this);
            element.parent().removeClass('ct-border-focus-primary');
        })
       
        // hàm thực hiện click vào button trên tiêu đề của bảng
        $('.combobox').on('click', 'button', function () {
            event.preventDefault();
            var element = $(this);
            element.children('.trigger-bountlist-box').addClass('show');
            //event.stopPropagation();
        })

        // hàm thực hiện click chọn từng hàng trong menu button

        $('.btn-triggerWrap').on('click', '.trigger-bountlist-item', function () {
            var text = this.innerText;
            $('#pageSize').text(text);
            $('.trigger-bountlist-item').removeClass('bountlist-selected');
            $(this).addClass('bountlist-selected');
            $(this).parents('.btn-triggerWrap').blur();
        })


        //hàm thực hiện phân trang khi click vào nút chọn filter (filter-btn).
        $('.filter-btn').on('click', '.trigger-bountlist-item', function () {
            var text = this.innerText.slice(0, 1);
            $(this).parents('.filter-btn').find('.btn-value').text(text);
            var btn = $(this).parents('.filter-btn');
            btn.blur();
        });
        //hàm thực hiện phân trang khi click vào nút chọn filter (filter-btn).
        $('.license-filter-btn').on('click', '.trigger-bountlist-item', function () {
            var text = this.innerText;
            if (text === "Hiển thị tất cả") {
                text = '';
            }
            $(this).parents('.license-filter-btn').siblings('.filter-input').val(text);
            var btn = $(this).parents('.license-filter-btn');
            btn.blur();
        });
    }

}

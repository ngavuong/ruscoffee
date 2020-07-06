/* Thực hiện khởi tạo đối tượng js của trang Navigation.html */
$(document).ready(function () {
    var navigation = new Navigation();
});

class Navigation {
    constructor() {
        //this.setAccount();
        this.initEvent();
    }
    initEvent() {
        //$('.logOutBtn').on('click', this.logOut);
    }
    //Set tên tài khoản người dùng
    setAccount() {
        var result = JSON.parse(sessionStorage.getItem('accessUser'));
        if (result.Token) {
            $('#fullName').text(result.FullName);
        }
    }

    /**
* Hàm thực hiện khi nhấn đăng xuất
* CreatedBy: VTNGA (27/11/2019)
* */
    logOut() {
        ajaxMethod.get('/home/logout', {}, false, function (res) {
        });
        window.location.href = "/pages/login";
        //sessionStorage.removeItem('accessUser');
    }
}
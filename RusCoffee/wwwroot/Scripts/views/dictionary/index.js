/* Thực hiện khởi tạo đối tượng js của trang Index.html */
$(document).ready(function () {
    var index = new Index();
});

var token;

/**
 * Class quản lý js của trang index.html
 * CreatedBy: VTNGA (08/10/2019)
 * */
class Index{
    constructor() {
        this.initEvent();
    }
    /**
     * Hàm khởi tạo sự kiện cho đối tượng Index
     * CreatedBy: VTNGA (27/11/2019)
     * */
    initEvent() {
        $('#loginBtn').on('click', this.login.bind(this));
    }
/**
 * Hàm thực hiện đăng nhập
 * CreatedBy: VTNGA (27/11/2019)
 * */
    login() {
        var data;
        var user = {};
        var isEmpty = this.isEmpty();
        if (isEmpty === false) {
            var username = $('#username').val();
            var password = $('#password').val();
            user['username'] = username;
            user['password'] = password;
            $.ajax({
                url: '/users/authenticate',
                method: 'POST',
                async: false,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify(user)
            });
            //    success: function (result) {
            //        data = result;
            //        token = data.Token;
            //        if (token) {
            //            sessionStorage.removeItem('accessUser');
            //            sessionStorage.setItem('accessUser', JSON.stringify(result));
            //            window.location.href = "/home/index";
            //        }
            //    },
            //    error: function (error) {
            //        window.location.href = "/pages/login";
            //        if (error.status === 400) {
            //            $('#username').val('');
            //            $('#password').val('');
            //        }
            //        else {
            //            window.location.href = "/pages/login";
            //        }

            //    }
            //});
        }
    }
/**
* Hàm thực hiện khi nhấn đăng xuất
* CreatedBy: VTNGA (27/11/2019)
* */
    //logout() {
    //    sessionStorage.removeItem('accessUser');
    //    window.open("index.html", "_self");
    //}

    /**
* Hàm thực hiện kiểm tra người dùng đã nhập đủ username và password chưa
* CreatedBy: VTNGA (27/11/2019)
* */
    isEmpty() {
        var isEmpty = false;
        var user = {};
        var username = $('#username').val();
        var password = $('#password').val();
        user['username'] = username;
        user['password'] = password;
        if (!username) {
            $('#cphMain_LoginUser_UserNameRequired').show();
            isEmpty = true;
        }
        else {
            $('#cphMain_LoginUser_UserNameRequired').hide();
        }
        if (!password) {
            $('#cphMain_LoginUser_PasswordRequired').show();
            isEmpty = true;
        }
        else {
            $('#cphMain_LoginUser_PasswordRequired').hide();
        }
        return isEmpty;
    }
}

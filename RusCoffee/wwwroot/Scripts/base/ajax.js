var ajaxMethod = {
    get: function (uri, param, async, callback) {
        //var token = JSON.parse(sessionStorage.getItem('accessUser')).Token;
        //var headers = { 'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS' };
        //if (token) {
        //    headers.Authorization = 'Bearer ' + token;
        //}
        $.ajax({
            method: 'GET',
            url: uri,
            dataType: 'json',
            //headers: headers,
            async: async === undefined ? false : async,
            data: param,
            success: function (response) {
                callback(response);
            },
            error: function (result) {
            }
        })
            .catch(function (ex) {
                console.log(ex);
            });;
    },
    post: function (uri, param, async, callback) {
        //var token = JSON.parse(sessionStorage.getItem('accessUser')).Token;
        //var headers = { 'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS' };
        //if (token) {
        //    headers.Authorization = 'Bearer ' + token;
        //}
        $.ajax({
            url: uri,
            method: 'POST',
            //headers: headers,
            async: async === undefined ? false : async,
            data: JSON.stringify(param),
            contentType: "application/json;charset=utf-8",
          
            success: function (response) {
                callback(response);
            },
            error: function (e) {
                console.log(e);
                debugger
            }
        })
            .catch(function (ex) {
                console.log(ex);
            });
    },
    getMasterData: function (uri, param, async, callback) {
        //var token = JSON.parse(sessionStorage.getItem('accessUser')).Token;
        //var headers = { 'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS' };
        //if (token) {
        //    headers.Authorization = 'Bearer ' + token;
        //}
        $.ajax({
            url: uri,
            method: 'POST',
            //headers: headers,
            data: JSON.stringify(param),
            async: async === undefined ? false : async,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (response) {
                callback(response);
            },
            error: function () {

            }
        })
            .catch(function (ex) {
                console.log(ex);
            });
    },
    put: function (uri, param, async, callback) {
        //var token = json.parse(sessionstorage.getitem('accessuser')).token;
        //var headers = { 'x-requested-with': 'xmlhttprequest', 'access-control-allow-methods': 'get,put,post,delete,patch,options' };
        //if (token) {
        //    headers.authorization = 'bearer ' + token;
        //}
        $.ajax({
            url: uri,
            method: 'PUT',
            //headers: headers,
            data: JSON.stringify(param),
            contentType: "application/json;charset=utf-8",
            async: async === undefined ? false : async,
            success: function (response) {
                callback(response);
            },
            error: function () {

            }
        })
            .catch(function (ex) {
                console.log(ex);
            });
    },
    delete: function (uri, param, async, callback) {
        //var token = JSON.parse(sessionStorage.getItem('accessUser')).Token;
        //var headers = { 'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS' };
        //if (token) {
        //    headers.Authorization = 'Bearer ' + token;
        //}
        $.ajax({
            url: uri,
            method: 'DELETE',
            //headers: headers,
            data: JSON.stringify(param),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            async: async === undefined ? false : async,
            success: function (response) {
                callback(response);
            },
            error: function () {
            }
        })
            .catch(function (ex) {
                console.log(ex);
            });
    },

};
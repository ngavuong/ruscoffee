$(document).ready(function () {

    //$(".line").peity("line", {
    //    fill: '#1ab394',
    //    stroke: '#169c81',
    //})

    //$(".bar").peity("bar", {
    //    fill: ["#1ab394", "#d7d7d7"]
    //})

    //$(".bar_dashboard").peity("bar", {
    //    fill: ["#1ab394", "#d7d7d7"],
    //    width: 100
    //})

});


/* Thực hiện khởi tạo đối tượng js của trang payment.html */
$(document).ready(function () {

    var oDashboard = new Dashboard();
});

/**
 * Class quản lý js của trang payment.html
 * CreatedBy: VTNGA (08/10/2019)
 * */
class Dashboard {
    constructor() {
        this.initEvent();
        this.setStatistical();
        this.loadToday();
    }
    /**
     * Hàm khởi tạo sự kiện
     * CreatedBy: VTNGA (15/10/2019)
     * */
    initEvent() {
        var me = this;
        me.EditMode = null;
        me.chart = null;
        me.userAccess = JSON.parse(sessionStorage.getItem('accessUser'));

        //hàm thực hiện phân trang khi click vào các button chuyển trang (trang trước, trang sau, trang đầu tiên, trang cuối cùng).atedBy: VTNGA(23/11/2019)
        //$('#firstPage').on('click', this.getFirstPage.bind(this));
        $('.statistical').on('change', '.statistical-type', me.setStatistical.bind(this));
        $('.statistical').on('change', '.statistical-value', me.loadDashboard.bind(this));

    }

    loadDashboard() {
        var me = this;
        var type = $('.statistical-type').val();
        //thống kê theo tháng
        if (type == 0) {
            me.loadByMonth();
        }
        else {
            //getdata(year)
            me.loadByYear();
        }

    }

    //Thống kê theo tháng
    loadByMonth() {
        var month = 1;
        var columnArr = ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"];
        month = $('.statistical-value').val();
        //Lấy danh sách hóa đơn của tháng được chọn
        var invoiceArr = [0, 0, 0, 0];
        ajaxMethod.get('/invoicestatistical/0/' + month, {}, false, function (res) {
            $.each(res, function (index, item) {
                var date = (new Date(item.InvoiceDate)).getDate();
                if (date <= 7) {
                    invoiceArr[0] += parseFloat(item.TotalAmount) //tuần 1
                }
                else if (date >= 8 && date <= 15) {
                    invoiceArr[1] += parseFloat(item.TotalAmount) // tuần 2
                }
                else if (date >= 16 && date <= 22) {
                    invoiceArr[2] += parseFloat(item.TotalAmount)
                }
                else {
                    invoiceArr[3] += parseFloat(item.TotalAmount)
                }
            });
        });

        //Lấy danh sách phiếu nhập hàng của năm hiện tại
        var importArr = [0, 0, 0, 0];
        ajaxMethod.get('/importstatistical/0/' + month, {}, false, function (res) {
            $.each(res, function (i, e) {
                var date = (new Date(e.ImportDate)).getDate();
                if (date <= 7) {
                    importArr[0] += parseFloat(e.TotalAmount) //tuần 1
                }
                else if (date >= 8 && date <= 15) {
                    importArr[1] += parseFloat(e.TotalAmount) // tuần 2
                }
                else if (date >= 16 && date <= 22) {
                    importArr[2] += parseFloat(e.TotalAmount)
                }
                else {
                    importArr[3] += parseFloat(e.TotalAmount)
                }
            });
        });
        var invoiceTotal = 0, importTotal = 0;
        invoiceTotal = invoiceArr[0] + invoiceArr[1] + invoiceArr[2] + invoiceArr[3];
        importTotal = importArr[0] + importArr[1] + importArr[2] + importArr[3];
        var interest = invoiceTotal - importTotal;
        $('#interest').text(interest.formatMoney());
        this.drawChart(columnArr, invoiceArr, importArr);
    }

    //Thống kê theo năm
    loadByYear() {
        var date = new Date();
        var year = date.getFullYear();
        var columnArr = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];
        //Lấy danh sách hóa đơn của năm hiện tại
        var invoiceArr = [], invoiceTotal = 0;
        ajaxMethod.get('/invoicestatistical/1/' + year, {}, false, function (res) {
            for (var i = 0; i < 12; i++) {
                var totalAmount = 0;
                $.each(res, function (index, item) {
                    var month = (new Date(item.InvoiceDate)).getMonth(); //0=Tháng1, 1=Tháng2,...
                    if (month == i) {
                        totalAmount += parseFloat(item.TotalAmount);
                    }
                });
                invoiceTotal += totalAmount;
                invoiceArr.push(totalAmount);
            }
        });

        //Lấy danh sách phiếu nhập hàng của năm hiện tại
        var importArr = [], importTotal = 0;
        ajaxMethod.get('/importstatistical/1/' + year, {}, false, function (res) {
            for (var j = 0; j < 12; j++) {
                var totalAmount2 = 0;
                $.each(res, function (i, e) {
                    var month = (new Date(e.ImportDate)).getMonth(); //0=Tháng1, 1=Tháng2,...
                    if (month == j) {
                        totalAmount2 += parseFloat(e.TotalAmount);
                    }
                });
                importTotal += totalAmount2;
                importArr.push(totalAmount2);
            }
        });

        var interest = invoiceTotal - importTotal;
        $('#interest').text(interest.formatMoney());
        this.drawChart(columnArr, invoiceArr, importArr);
    }


    //vẽ biểu đồ thống kê
    drawChart(columnArr, invoiceArr, importArr) {
        //$("canvas#lineChart").remove();
        //$("div.chartreport").append('<canvas id="lineChart" height="70"></canvas>');
        var lineData = {
            labels: columnArr,
            datasets: [
                {
                    label: "Tiền bán hàng",
                    backgroundColor: "rgba(26,179,148,0.5)",
                    borderColor: "rgba(26,179,148,0.7)",
                    pointBackgroundColor: "rgba(26,179,148,1)",
                    pointBorderColor: "#fff",
                    data: invoiceArr
                },
                {
                    label: "Tiền nhập hàng",
                    backgroundColor: "rgba(220,220,220,0.5)",
                    borderColor: "rgba(220,220,220,1)",
                    pointBackgroundColor: "rgba(220,220,220,1)",
                    pointBorderColor: "#fff",
                    data: importArr
                }
            ]
        };

        var lineOptions = {
            responsive: true
        };

        var ctx = document.getElementById("lineChart").getContext("2d");
        if (this.chart) {
            //this.chart.data = lineData;
            //this.chart.update();
            this.chart.destroy();
            this.chart = new Chart(ctx, { type: 'line', data: lineData, options: lineOptions });
        }
        else {
            this.chart = new Chart(ctx, { type: 'line', data: lineData, options: lineOptions });
        }
    }

    //Set ngày để thống kê
    setStatistical() {
        var statisType = $('.statistical-type').val();
        if (statisType == 0) {
            $('.statistical-value').show();
            var date = new Date();
            var month = date.getMonth() + 1;
            $('.statistical-value').val(month);
            this.loadByMonth();
        }
        else {
            $('.statistical-value').hide();
            this.loadByYear();
        }
    }

    loadToday() {
        var date = new Date();
        var today = date.getFullYear() + '-' + (date.getMonth() +1) + '-' + date.getDate();
        var invoiceTotal = 0, importTotal = 0;
        ajaxMethod.get('/invoicetoday/' + today, {}, false, function (res) {
            $.each(res, function (i, e) {
                invoiceTotal += parseFloat(e.TotalAmount);
            });
            $('#invoice-today').text(invoiceTotal.formatMoney());
        })
        ajaxMethod.get('/importtoday/' + today, {}, false, function (res) {
            $.each(res, function (index, item) {
                importTotal += parseFloat(item.TotalAmount);
            });
            $('#import-today').text(importTotal.formatMoney());
        })
        $('#interest-today').text((invoiceTotal - importTotal).formatMoney());
    }
}

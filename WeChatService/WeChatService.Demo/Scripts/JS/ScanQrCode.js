﻿var ScanQrCode = {
    viewModel: {
        Result: ko.observable(),
    }
};
ScanQrCode.viewModel.Scan = function() {
    var model = {
        url: location.href,
        jsApiList: 'scanQRCode'
    };
    $.get('/api/HeaderSetting/', function (base64) {
        $.ajax({
            type: "get",
            url: "http://WeChatService.mangoeasy.com/api/JsApiConfig/",
            data: model,
            beforeSend: function (xhr) { //beforeSend定义全局变量
                xhr.setRequestHeader("Authorization", base64); //Authorization 需要授权,即身体验证
            },
            success: function (xmlDoc, textStatus, xhr) {
                if (xhr.status == 200) {
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: xhr.responseJSON.AppId, // 必填，公众号的唯一标识
                        timestamp: xhr.responseJSON.Timestamp, // 必填，生成签名的时间戳
                        nonceStr: xhr.responseJSON.NonceStr, // 必填，生成签名的随机串
                        signature: xhr.responseJSON.Signature,// 必填，签名，见附录1
                        jsApiList: xhr.responseJSON.JsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                    wx.ready(function () {
                        wx.scanQRCode({
                            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                            success: function (res) {
                                alert(res.resultStr);
                            }
                        });
                    });

                }
            }
        });
    });
};
$(function () {
    ko.applyBindings(ScanQrCode);
    
});
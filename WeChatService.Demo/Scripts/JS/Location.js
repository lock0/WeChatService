﻿var Location = {
    viewModel: {
        Result: ko.observable(),
        PageReady: ko.observable(false)
    }
};
Location.viewModel.Action = function () {
    wx.getLocation({
        type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
            //var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            //var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            //var speed = res.speed; // 速度，以米/每秒计
            //var accuracy = res.accuracy; // 位置精度
            wx.openLocation(
                res
                //{
                //latitude: res.latitude, // 纬度，浮点数，范围为90 ~ -90
                //longitude: res.longitude, // 经度，浮点数，范围为180 ~ -180。
                //name: 'Location', // 位置名
                //address: '', // 地址详情说明
                //scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
                //infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
                //}
            );
        }
    });
};
$(function () {
    ko.applyBindings(Location);
    var model = {
        url: location.href,
        jsApiList: 'getLocation,openLocation,onMenuShareTimeline,onMenuShareAppMessage,onMenuShareQQ,onMenuShareWeibo,onMenuShareQZone'
    };
    $.get('/api/Initialize', function (result) {
        ko.mapping.fromJS(result, {}, Location.viewModel.PageReady);
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
                            wx.onMenuShareTimeline({
                                title: '微信获取地理位置-Mangoeasy', // 分享标题
                                link: 'http://wechatservice.demo.mangoeasy.com/demo/Location', // 分享链接
                                imgUrl: 'http://wechatservice.demo.mangoeasy.com//Content/Images/logoSZ.png', // 分享图标
                                success: function () {

                                },
                                cancel: function () {
                                    // 用户取消分享后执行的回调函数
                                }
                            });
                            wx.onMenuShareAppMessage({
                                title: '微信获取地理位置-Mangoeasy', // 分享标题
                                desc: '请关注 Mangoeasy 获取更多资讯', // 分享描述
                                link: 'http://wechatservice.demo.mangoeasy.com/demo/Location', // 分享链接
                                imgUrl: 'http://wechatservice.demo.mangoeasy.com//Content/Images/logoSZ.png', // 分享图标
                                type: 'link', // 分享类型,music、video或link，不填默认为link
                                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                                success: function () {
                                    // 用户确认分享后执行的回调函数
                                },
                                cancel: function () {
                                    // 用户取消分享后执行的回调函数
                                }
                            });
                            wx.onMenuShareQQ({
                                title: '微信获取地理位置-Mangoeasy', // 分享标题
                                desc: '请关注 Mangoeasy 获取更多资讯', // 分享描述
                                link: 'http://wechatservice.demo.mangoeasy.com/demo/Location', // 分享链接
                                imgUrl: 'http://wechatservice.demo.mangoeasy.com//Content/Images/logoSZ.png', // 分享图标
                                success: function () {
                                    // 用户确认分享后执行的回调函数
                                },
                                cancel: function () {
                                    // 用户取消分享后执行的回调函数
                                }
                            });
                            wx.onMenuShareWeibo({
                                title: '微信获取地理位置-Mangoeasy', // 分享标题
                                desc: '请关注 Mangoeasy 获取更多资讯', // 分享描述
                                link: 'http://wechatservice.demo.mangoeasy.com/demo/Location', // 分享链接
                                imgUrl: 'http://wechatservice.demo.mangoeasy.com//Content/Images/logoSZ.png', // 分享图标
                                success: function () {
                                    // 用户确认分享后执行的回调函数
                                },
                                cancel: function () {
                                    // 用户取消分享后执行的回调函数
                                }
                            });
                            wx.onMenuShareQZone({
                                title: '微信获取地理位置-Mangoeasy', // 分享标题
                                desc: '请关注 Mangoeasy 获取更多资讯', // 分享描述
                                link: 'http://wechatservice.demo.mangoeasy.com/demo/Location', // 分享链接
                                imgUrl: 'http://wechatservice.demo.mangoeasy.com//Content/Images/logoSZ.png', // 分享图标
                                success: function () {
                                    // 用户确认分享后执行的回调函数
                                },
                                cancel: function () {
                                    // 用户取消分享后执行的回调函数
                                }
                            });
                        });

                    }
                }
            });
        });
    });

});
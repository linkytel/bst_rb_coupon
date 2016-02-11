window.couopnGet = new CouponGet();

function CouponGet() {
    this.phoneInput = $("#txtPhone");
    this.smsInput = $("#txtSms");
    this.phoneButton = $("#getphone");
    this.phoneSpan = $("#phoneSpan");
    this.smsSpan = $("#getkey");
    this.submitButton = $("#getverity");
    this.reInputButton = $("#reInput");
    this.phoneFrame = $("#redbagphone");
    this.smsFrame = $("#redbagkey");
};

/**
 * 页面初始化
 */
CouponGet.prototype.init = function () {
    this.phoneButton.attr("disabled", "disabled");
    this.submitButton.attr("disabled", "disabled");

    //表单验证-手机号码 & 短信
    this.phoneInput.bind("input", this.phoneVerity);
    this.smsInput.bind("input", this.smsVerify);

    //返回修改手机号码
    this.reInputButton.click(function () {
        couopnGet.smsFrame.hide();
        couopnGet.phoneFrame.show();
    });

    //文本框通用事件
    $(".bestpay-input").bind("focus", commonFunc.showInputClear)
        .bind("input", commonFunc.showInputClear)
        .bind("blur", function () {
            setTimeout(function () {
                commonFunc.hideInputClear();
            }, 2)
        });
    $("#clearInput").bind("click", commonFunc.clearEvent);
}

/*
 * 手机号码表单验证
 *
 */
CouponGet.prototype.phoneVerity = function () {
    var phoneNum = couopnGet.phoneInput.val();
    if (phoneNum.length == 11 && REGEX.mobilePhone.test(phoneNum)) {
        couopnGet.phoneButton.removeAttr("disabled");
        couopnGet.phoneButton.click(function () {
            couopnGet.phoneSpan.html(phoneNum);
            couopnGet.phoneFrame.hide();
            couopnGet.smsFrame.show();

            //remark: 此处不能用ajax直接请求短信接口，而应该调用红包平台，让红包平台发送
            couopnGet.sendSms();
        });
    } else {
        couopnGet.phoneButton.attr("disabled", "disabled");
    }
}

/*
 * 短信验证码表单验证
 *
 */
CouponGet.prototype.smsVerify = function () {
    var val = $("#txtSms").val();
    if (val.length >= 6) {
        couopnGet.submitButton.removeAttr("disabled");
        couopnGet.submitButton.click(function () {

        });
    } else {
        couopnGet.submitButton.attr("disabled", "disabled");
    }
}


/**
 *  发送短信验证码
 */
CouponGet.prototype.sendSms = function () {
    Util.CountDown.stop();
    Util.CountDown.start(59, 1, function (y, mo, d, h, mi, s) {
        couopnGet.smsSpan.unbind().html(s + "s");
    }, function () {
        couopnGet.smsSpan.click(couopnGet.sendSms).html("重新发送");
    })
}

/**
 * 公共方法
 */
var commonFunc = {
    showInputClear: function () { //文本框获取焦点&包含字符时显示清除按钮
        var _input = $(this);
        if ($.trim(_input.val()) == "") {
            commonFunc.hideInputClear();
        } else {
            var clearInput = $("#clearInput");
            _input.after(clearInput);
            setTimeout(function () {
                clearInput.show();
            }, 1);
        }
        return true;
    },
    clearEvent: function () { //判断文本框clear事件
        console.log("clearEvent");
        var _input = $(this).prev(".bestpay-input");
        _input.val("").focus();//回弹键盘
    },
    hideInputClear: function () {    //清除按钮事件，清空文本框内容
        setTimeout(function () {
            $("#clearInput").hide();
        }, 1);
        return true;
    }
}

var REGEX = {
    mobilePhone: /^1\d{10}$/
}
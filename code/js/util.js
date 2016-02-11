var Util = {
    /************************************************************************************
     * Dialog：对话框相关方法封装
     * <br>
     * <br>4、显示H5对话框：showHDialog
     * <br>5、设置H5对话框TOP值：setDialogHeight
     * <br>6、显示H5对话框背景遮罩：showDialogBg
     * <br>7、关闭H5对话框（需要自己实现）：closeHDialog
     * <br>8、刷新背景遮罩（防止键盘弹出时出现空白）：refreshBg
     * <br>9、显示H5 confirm：showConfirm
     ***********************************************************************************/
    Dialog: {
        hDialogId: "",          // HTML5对话框Id
        hDialogBgId: "best_h_dialog_bg",     //H5对话框背景遮罩ID
        tempDialogTimeoutId: null,

        /**
         * 显示HTML5对话框
         * @param {} divId        对话框ID
         */
        showHDialog: function (divId) {
            Util.Dialog.hDialogId = divId;
            var dHeigth = $("#" + divId).innerHeight();
            Util.Dialog.setDialogHeight(divId, dHeigth);
            Util.Dialog.showDialogBg();
            $_id(divId).style.display = "block";
            $("body").addClass("over-hide");
            Util.Dialog.refreshBg();
            return;
        },

        /**
         * 设置HTML5对话框距离顶部的高度
         * @param {} dialogId    HTML5对话框的id
         * @param {} dHeigth    HTML5对话框自身的高度
         */
        setDialogHeight: function (dialogId, dHeigth) {
            $("#" + dialogId).css({
                "top": "45%",
                "marginTop": -(dHeigth / 2) + "px"
            });
        },

        /**
         * 显示HTML5对话框背景遮罩
         */
        showDialogBg: function () {
            if ($("#" + Util.Dialog.hDialogBgId).length == 0) {
                $('<div id="' + Util.Dialog.hDialogBgId + '" class="detail-bottom-bg" ontouchmove="Util.Events.stopDefault(event))"></div>').appendTo("body");
            }
            var bgHeight = (Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight)) + 'px';
            $_id(Util.Dialog.hDialogBgId).style.height = bgHeight;
            if ($_id(Util.Dialog.hDialogBgId).style.display != "block") {
                $_id(Util.Dialog.hDialogBgId).style.display = "block";
            }
        },

        /**
         * 关闭HTML5对话框
         */
        closeHDialog: function () {
            if (Util.Dialog.hDialogId != "") {
                $_id(Util.Dialog.hDialogId).style.display = "none";
            }
            $_id(Util.Dialog.hDialogBgId).style.display = "none";
            Util.Dialog.hDialogId = "";
            $("body").removeClass("over-hide");
            return;
        },

        /**
         * 防止键盘显示时弹出背景出现空白
         */
        refreshBg: function () {
            if (Util.Dialog.tempDialogTimeoutId == null) {
                Util.Dialog.tempDialogTimeoutId = setTimeout(function () {
                    clearTimeout(Util.Dialog.tempDialogTimeoutId);
                    Util.Dialog.tempDialogTimeoutId = null;
                    if (Util.Dialog.hDialogId != "") {
                        Util.Dialog.showDialogBg();
                    }
                }, 600);
            }
        },
        /************************************************************************************
         * Events：通用事件方法封装
         * <br>
         * <br>1、停止事件冒泡：stopDefault
         * <br>2、重新绑定元素事件：reBindEvent
         * <br>3、重新绑定元素click事件：reBindClick
         ***********************************************************************************/
        Events: {
            /**
             * 停止事件冒泡
             */
            stopDefault: function (event) {
                event.preventDefault();
                event.stopPropagation();
            },
            /**
             * 重新绑定元素事件
             */
            reBindEvent: function (_selector, _func, _event) {
                $(_selector).unbind(_event).bind(_event, _func);
            },
            /**
             * 重新绑定元素click事件
             */
            reBindClick: function (_selector, _func) {
                Util.Events.reBindEvent(_selector, _func, "click");
            }
        }
    },
    Http:{
        sendPostRequestSSL: function (reqMap) {
            var name = "ran" + Math.floor(Math.random() * 100 + 1);
            var value = Date.parse(new Date());
            reqMap.url = reqMap.url + "?" + name + "=" + value;

            var err_cbk = reqMap.error_callback || function (XMLHttpRequest, textStatus, errorThrown) {
                    console.error("接口调用失败:" + JSON.stringify(XMLHttpRequest));
                    return;
                }

            var succ_cbk = function(result){
                console.log('get [' + reqMap.url + '] result:' + JSON.stringify(result));
                reqMap.success_callback(result);
            }
            try {
                var ajaxObj = $.ajax({
                    url: reqMap.url,
                    data: JSON.stringify(reqMap.params),
                    contentType: "application/json",
                    type: "POST",
                    timeout: 60000,
                    dataType: "json",
                    async: true,
                    success: succ_cbk,
                    error: err_cbk
                });
            } catch (e) {
                console.error("接口调用异常:" + e.message);
            }
        }
    },
    CountDown: {
        countdownId: null,
        minuteSeconds: 60,
        hourSeconds: 60 * 60,
        daySeconds: 60 * 60 * 24,
        /**
         * 倒计时函数
         * @param {} totalSeconds    总秒数
         * @param {} timespan    倒计时step，一般传1
         * @param {} callback    倒计时秒数更新时的回调函数
         * @param {} endcallback    倒计时结束时的回调函数
         * @returns {}
         */
        start: function (totalSeconds, timespan, callback, endcallback) {
            if (totalSeconds < 0)
                totalSeconds = 0;
            //年月暂时不处理
            var years = 0;
            var months = 0;

            var days = parseInt(totalSeconds / Util.CountDown.daySeconds);
            var lastSecond = totalSeconds % Util.CountDown.daySeconds;
            var hours = parseInt(lastSecond / Util.CountDown.hourSeconds);
            lastSecond %= Util.CountDown.hourSeconds;
            var minutes = parseInt(lastSecond / Util.CountDown.minuteSeconds);
            lastSecond %= Util.CountDown.minuteSeconds;
            var seconds = lastSecond;
            if (callback) {
                callback(years, months, days, hours, minutes, seconds);
            }
            if (!years && !months && !days && !months && !hours && !minutes && !seconds) {
                if (endcallback) {
                    endcallback();
                }
            }
            else {
                Util.CountDown.countdownId = setTimeout(function () {
                    Util.CountDown.start(totalSeconds - timespan, timespan, callback, endcallback);
                }, timespan * 1000);
            }
        },

        /**
         * 停止倒计时
         */
        stop: function () {
            if (Util.CountDown.countdownId != null) {
                clearTimeout(Util.CountDown.countdownId);
                Util.CountDown.countdownId = null;
            }
        }
    }
}

var HTMLTemplate = {
    ConfirmDialog: '<div id="confirm_dialog" class="comb-dialog hide">' +
    '<div class="bsb_cnt">' +
        //'<header>提示</header>'+
    '<div class="text">您确认要重新生成吗？</div>' +
    '<footer class="ub">' +
    '<div class="ub-f1 cancel bright">取消</div>' +
    '<div class="ub-f1 confirm colorful">确定</div>' +
    '</footer>' +
    '</div>' +
    '</div>'
}
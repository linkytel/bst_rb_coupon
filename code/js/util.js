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
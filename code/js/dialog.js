var nDialogId = 0;          // 原生对话框Id
var hDialogId = 0;       // HTML5对话框Id

/**
 * 关闭HTML5对话框
 */
function closeHDialog() {
	// TODO
	hDialogId = 0;
	return;
}

/**
 * 显示原生对话框
 */
function showNDialog(msg) {
    if (nDialogId == 0) {
        dismissNDialog();
        if (msg == null || msg == "") {
            msg = "正在提交订单,请稍候...";
        }
        nDialogId = Dialog.showProgressDialog("", msg);
	}
}

/**
 * 关闭原生对话框
 */
function dismissNDialog() {
	if (nDialogId != 0) {
		Dialog.dismissDialog(nDialogId);
		nDialogId = 0;
	}
}

/**
 * 设置HTML5对话框距离顶部的高度
 * @param {} dialogId	HTML5对话框的id
 * @param {} dHeigth	HTML5对话框自身的高度
 */
function setDialogHeight(dialogId, dHeigth) {
	var hTemp = rate * device_height / 2 - dHeigth;
	if (hTemp <= 0) {
		hTemp = 10;
	}
	var mt = (window.pageYOffset + hTemp) + "px";
	console.log("dialog height is : " + mt);
	document.getElementById(dialogId).style.top = mt;
}

/**
 * 显示HTML5对话框背景遮罩
 */
function showDialogBg() {
	var bgHeight = (Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight)) + 'px';
	document.getElementById("order_detail_bg").style.height = bgHeight;
	document.getElementById("order_detail_bg").style.display = "block";
}

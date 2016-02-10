$(function() {
	// body...
	maininit();

})

/**
 * 页面初始化
 *
 */
function maininit(){
	
	$("#getphone").attr("disabled","disabled");
	$("#getverity").attr("disabled","disabled");

	$("#txtPhone").bind("input", phoneverity);//表单验证

	$(".bestpay-input").bind("focus", showInputClear)
        .bind("input", showInputClear)
        .bind("blur", function(){ setTimeout(function(){hideInputClear();},20)});

    $("#clearInput").bind("click", clearEvent);

    
}

/**
 *  判断文本框clear事件
 *
 */
function showInputClear() {
    var _input = $(this);
    if ($.trim(_input.val()) == "") {
        hideInputClear();
    } else {
        var clearInput = $("#clearInput");
        _input.after(clearInput);
        setTimeout(function () {
            clearInput.show();
        }, 1);
    }
    return true;
}

/**
 *  清除按钮事件，清空文本框内容
 *
 */
function clearEvent() {
    console.log("clearEvent");
    alert("触发clear");
    var _input = $(this).prev(".bestpay-input");
    //hideInputWarn(_input.attr("id"));
    _input.val("").focus();//回弹键盘
}

function hideInputClear() {
    setTimeout(function () {
        $("#clearInput").hide();
    }, 1);

    return true;
}

/*
 * 手机号码表单验证
 *
 */
function phoneverity(){
	var val = $("#txtPhone").val();
	var isverity = false;

	if( val.length == 11){
		isverity = true;
	}
	if (isverity == true) {
        $("#getphone").removeAttr("disabled");
        //alert("test");
        $("#getphone").click(function(){
			//alert("hehe");
			$("#redbagphone").hide();
			$("#redbagkey").show();
		});
    } else {
        $("#getphone").attr("disabled", "disabled");
    }
}
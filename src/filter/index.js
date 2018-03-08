/**
 * 数字脱敏
 * @param val 数值
 * @param start 开始
 * @param end 结束
 */
export function desensitization(val, start = 0, end = 0) {
	return val && val.substr(start, end || undefined)
}

export function tofixed(val) {
	return val && val.toFixed(0);
}
export function tofixed2(val) {
	return val && val.toFixed(2);
}
export function formatNum(value) {
	var str;
	if(value == null || value == undefined || value == "") {
		str = "0";
	} else {
		str = value.toString();
	}

	var newStr = "";
	var count = 0;

	if(str.indexOf(".") == -1) {
		for(var i = str.length - 1; i >= 0; i--) {
			if(count % 3 == 0 && count != 0) {
				newStr = str.charAt(i) + "," + newStr;
			} else {
				newStr = str.charAt(i) + newStr;
			}
			count++;
		}
		str = newStr + ".00"; //自动补小数点后两位
		return str;
	} else {
		for(var i = str.indexOf(".") - 1; i >= 0; i--) {
			if(count % 3 == 0 && count != 0) {
				newStr = str.charAt(i) + "," + newStr;
			} else {
				newStr = str.charAt(i) + newStr; //逐个字符相接起来
			}
			count++;
		}
		str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
		return str;
	}

}
export function Totime(val) {

	switch(val) {
		case 1:
			return "天";
			break;
		case 2:
			return "周";
			break;
		case 3:
			return "月";
			break;
		default:
			return "年";
			break;
	}

}
export function profitPlan(val) {

	switch(val) {
		case 1:
			return "等额本息";
			break;
		case 2:
			return "等额本金";
			break;
		case 3:
			return "按期付息，到期还本";
			break;
		case 4:
			return "一次性还款 ";
			break;
		default:
			return "其他";
			break;
	}

}
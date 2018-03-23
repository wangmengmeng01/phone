/**
 * 数字脱敏
 * @param val 数值
 * @param start 开始
 * @param end 结束
 */
export function desensitization(val) {
  let str = String(val);
  let ruten = str.substring(3, 8);
  return str.replace(ruten, '*****');
}

/**
 * 银行卡号
 * @param val 数值
 * @param start 开始
 * @param end 结束
 */
export function hideBankNum(val) {
  let str = String(val);
  let ruten = str.substring(3, 12);
  return str.replace(ruten, '*****');
}

/**
 * 名字脱敏
 * @param val
 */
export function nameDesensitization(str) {
  str = String(str);
  let ruten = str.substring(1);
  return str.replace(ruten, '**');
}


/**
 * 转为万元，小于万元直接显示
 * @param val 数值
 */
export function thousand(val) {
  if (val > 10000) {
    return val / 10000 + '万'
  }
  return val
}

/**
 * 性别
 * @param val 数值
 */
export function sex(num) {
  return ['男', '女', '未知'][parseInt(num) - 1];
}

export function tofixed(val) {
  return val && val.toFixed(0);
}

export function numfixed(val) {
  if (val > 10000) {
    return (val / 10000).toFixed(0);
  } else {
    return (val / 10000).toFixed(1);
  }

}


export function tofixed2(val) {
  return val && val.toFixed(2);
}
export function formatNum(value) {
  var str;
  if (value == null || value == undefined || value == "") {
    str = "0";
  } else {
    str = value.toString();
  }

  var newStr = "";
  var count = 0;

  if (str.indexOf(".") == -1) {
    for (var i = str.length - 1; i >= 0; i--) {
      if (count % 3 == 0 && count != 0) {
        newStr = str.charAt(i) + "," + newStr;
      } else {
        newStr = str.charAt(i) + newStr;
      }
      count++;
    }
    str = newStr + ".00"; //自动补小数点后两位
    return str;
  } else {
    for (var i = str.indexOf(".") - 1; i >= 0; i--) {
      if (count % 3 == 0 && count != 0) {
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
	val=parseInt(val);
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
	val=parseInt(val);
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
export function optype(val) {

  switch (val) {
    case 1:
      return "+";
      break;
    case 2:
      return "-";
      break;
    default:
      return "";
      break;
  }

}

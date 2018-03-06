/**
 * 数字脱敏
 * @param val 数值
 * @param start 开始
 * @param end 结束
 */
export function desensitization (val, start=0, end=0) {
  return val && val.substr(start, end || undefined)
}

export function tofixed (val) {
  return val && val.toFixed(0);
}
export function tofixed2 (val) {
  return val && val.toFixed(2);
}
export function Totime (val) {
	
	switch(val){
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



/**
 * 数字脱敏
 * @param val 数值
 * @param start 开始
 * @param end 结束
 */
export function desensitization (val, start=0, end=0) {
  return val && val.substr(start, end || undefined)
}


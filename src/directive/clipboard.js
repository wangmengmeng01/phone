/**
 * Created by gxx on 2017/11/6.
 */
import Vue from 'vue'

/**
 * 复制功能
 * @param text  要复制的文本
 * @returns {boolean} 是否复制成功
 */
const copy = (text) => {
  let textArea = document.createElement("textarea") // 创建文本框
  let succ = false // 预设失败
  textArea.value = text // 文本框赋值
  textArea.style.cssText = 'position:fixed;pointer-events:none;z-main:-9999;opacity:0;' // 文本框隐藏
  document.body.appendChild(textArea) // 添加文本框到dom树上
  textArea.select() // 全选文本框里面的文本

  try {
    succ = document.execCommand('copy') // 复制文本
  } catch (err) {
    // succ = false
  }

  document.body.removeChild(textArea) // 移除dom
  return succ
}


Vue.directive('clipboard', {
  bind(el, binding, vnode) {
    el.addEventListener('click', (event) => {
      if (binding.hasOwnProperty('value')) {
        let {
          value
        } = binding
        alert(copy(value) ? '复制成功' : '复制失败')
      }
    })
  }
});


export default function () {
  Vue.prototype.$clipboard = copy
}

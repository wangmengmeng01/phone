/**
 * Created by gxx on 2017/11/6.
 */
import Vue from 'vue'
import { isWeiXin } from '../until';

/**
 * 下载地址
 * @param text  要下载的地址
 * @returns {boolean} 是否下载成功
 */
const download = (url) => {

  if(isWeiXin()){ // 如果是微信提示从浏览器打开
    alert('请从浏览器中打开');
    return
  }

  let oPop = window.open(url,"","width=1, height=1, top=5000, left=5000");
  for(; oPop.document.readyState != "complete"; )
  {
    if (oPop.document.readyState == "complete")break;
  }
  let succ = oPop.document.execCommand("SaveAs");

  oPop.close();

  if(!succ){ //上面的方式不行的话用下面的方式
    let a = document.createElement('a'); // 先创建一个a链接

    a.style.cssText = 'position:fixed;pointer-events:none;z-main:-9999;opacity:0;'; // 隐藏它

    a.setAttribute('download',''); // 复制download属性，

    a.setAttribute('href', url); // 链接加上url，让其下载这个地址

    document.body.appendChild(a); // 添加dom至body

    a.click(); // 自动点击

    document.body.removeChild(a)
  }
  return succ
}


Vue.directive('clipboard', {
  bind (el, binding, vnode) {
  }
});

export default function(){
  Vue.prototype.$download = download;
}


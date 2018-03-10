/**
 * 获取url参数
 * @param  {string} key 获取的key
 * @return {string}      返回的值
 */
export const getParameter = (key) => {
  let _location = '';
     _location =  decodeURIComponent(decodeURIComponent(location.href));
     _location = _location.replace(/\?/g, '&');
  let reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
    let r = _location.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};


/**
 * 判断是不是微信
 * @return {[type]} [description]
 */
export const isWeiXin = ()=> {
  let ua = window.navigator.userAgent.toLowerCase();
  return ua.match(/MicroMessenger/i) == 'micromessenger';
};

/**
 * 判断是不是ios
 */
export const isIos = ()=>{
  return!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
}

/**
 * 判断是不是android
 */
export const isAndroid = ()=>{
  return navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1; //android终端
}

/**
 * 拖动
 * @param obj
 * @returns {{}}
 */
export const startDrag = (dom) => {
  dom.onmousedown = function(ev){
    ev.stopPropagation();
    var oevent = ev || event;

    var distanceX = oevent.clientX - dom.offsetLeft;
    var distanceY = oevent.clientY - dom.offsetTop;

    document.onmousemove = function(ev){
      var oevent = ev || event;
      dom.style.left = oevent.clientX - distanceX + 'px';
      dom.style.top = oevent.clientY - distanceY + 'px';
    };
    document.onmouseup = function(){
      document.onmousemove = null;
      document.onmouseup = null;
    };
  }
}



/**
 * 重置按钮参数需要初始值，所以开始的时候复制下参数保证是初始值
 * @param  {[type]} 搜索条件参数对象
 * @return {[type]} 复制之后的对象
 */
export const middleClone = (obj) => {
  if (typeof (obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]") {
    return JSON.parse(JSON.stringify(obj))
  } else {
    return {}
  }
}


/**
 * 参数序列化
 * @param obj
 * @returns {string}
 */
export const transformRequest = (obj) => {
  let str = [];
  for (let p in obj) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
  }
  return str.join("&");
}



export const compress_img = (imgData, resolve) => {
    if (!imgData) return;

    let canvas = document.createElement('canvas');

    let img = new Image();

    img.onload = function () {

      img.width = img.width / 5;

      img.height = img.height / 5;

      let ctx = canvas.getContext("2d");
      // canvas清屏
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = img.width;
      canvas.height = img.height;

      //重置canvans宽高 canvas.width = img.width; canvas.height = img.height;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      // upload(null,img)
      // canvas.toDataURL("image/jpeg")
      resolve(canvas.toDataURL("image/jpeg"));
    };

    // 记住必须先绑定事件，才能设置src属性，否则img没内容可以画到canvas
    img.src = imgData;
}




export const upload = (e) => {
  let file = e.target.files[0];
  let size = file.size/1024;
  // 文件大小,单位为M
  return new Promise((resolve)=>{
      let FR = new FileReader();
        FR.onload = function() {
          if(size > 1024) {
//          compress_img(this.result, resolve);
          }else{
            resolve(this.result)
          }
        };
      //先注册onload，再读取文件内容，否则读取内容是空的
      FR.readAsDataURL(file);
  })
}

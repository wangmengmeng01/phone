/**
 * Created by gxx on 2017/11/6.
 */
import Vue from 'vue'
import touch from 'touchjs'

Vue.directive('swipe', {
  bind (el, binding, vnode) {
    const up = binding.modifiers.up;
    const down = binding.modifiers.down;
    const left = binding.modifiers.left;
    const right = binding.modifiers.right;
    const value = binding.value;
    let keys = Object.keys(value);
    touch.on( el, 'swipeend', (e)=>{
      if(e.direction==="up" && up){
        complyFn('up')
      }
      if(e.direction==="down" && down){
        complyFn('down')
      }
      if(e.direction==="left" && left){
        complyFn('left')
      }
      if(e.direction==="right" && right){
        complyFn('right')
      }
    });
    // 回调函数
    function complyFn(type) {
      let key = keys.find(t=>t.includes(type)); // key
      let param = key.split(type)[1];  // 参数
      value[key](param) // 执行函数
    }
  }
});

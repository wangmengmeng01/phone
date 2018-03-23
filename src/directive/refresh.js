/**
 * Created by gxx on 2017/11/6.
 */
import Vue from 'vue'

Vue.directive('refresh', {
  bind(el, binding, vnode) {
    let Profile = Vue.extend(require('@/components/refresh').default);
    new Profile().$mount(el);
    log(el, binding, vnode)
  }
});

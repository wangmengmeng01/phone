import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import store from './store/'
import * as filters from './filter'
import './router/guard'
import './style/common.sass'
import './components/toask'
import './components/alert'
let config = require('./config.json');
Vue.use(VueRouter);

if(process.env.NODE_ENV !== 'production'){
  window.log = console.log;
  if(config.vconsole){
    let VConsole = require('vconsole');
    let vConsole = new VConsole();
  }
}

// 注册过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

Vue.config.productionTip = false;

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
});

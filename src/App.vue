<template>
  <div id="app">
    <transition :name=" isAppear ? 'fade' : 'router-slid'" mode="out-in">
      <router-view ></router-view>
    </transition>
  </div>
</template>

<script>
  import { transformRequest } from '@/until'
  import { mapGetters } from 'vuex'
  import {dev,test,_default} from '@/config'
  import Vue from 'vue'
  export default {
    name: 'app',
    data(){
      return{
        isAppear: true
      }
    },
    computed: {
      ...mapGetters([
        'header',
        'user',
        'cache'
      ])
    },
    created(){
      /**
       * 路由封装函数
       * @param url 地址
       * @param params 参数
       */
      Vue.prototype.$go = (url, params, replace=false) => {
        // 如果是活动页跳转活动页
        if(url.includes('fxd-wxact')){
          url = url.split('/webapp/')[0];
          // 拼接头信息和手机号
          url = `${url}${url.includes('?')?'&':'?'}${transformRequest(this.header)}&mobile_phone_=${this.user.mobile_phone_}`;
          if(params){
          // 拼接参数
            url = `${url}&${transformRequest(params)}`;
          }
          location.href = url;
          return
        }
        // 如果是外链直接跳转
        if(url.includes('http')||url.includes('https')){
          location.href = url;
          return
        }
        if(replace){
          this.$router.replace(`${url}${params?'?'+transformRequest(params):''}`);
          return
        }
        // 如果是跳登录则使用replace阻止返回
        this.$router[url.includes('login') ? 'replace' : 'push'](`${url}${params?'?'+transformRequest(params):''}`)
      };
    },
    watch:{
        $route(to,from){
          this.isAppear = !from.matched.length; //from.matched路由记录为空这表示首次加载，首次加载是用淡入淡出即可
        }
    }
  }
</script>

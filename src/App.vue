<template>
  <div id="app">
    <transition :name=" isAppear ? 'fade' : 'router-slid'" mode="out-in">
      <router-view ></router-view>
    </transition>
  </div>
</template>

<script>
  import { transformRequest } from '@/until'
  import Vue from 'vue'
  export default {
    name: 'app',
    data(){
      return{
        isAppear: true
      }
    },
    created(){
      /**
       * 路由封装函数
       * @param url 地址
       * @param params 参数
       */
      Vue.prototype.$go = (url, params, replace=false) => {
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

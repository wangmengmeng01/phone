<template>
  <div id="app" :style="{paddingTop:$route.meta.back ? '.88rem' : ''}">
    <back/>
    <transition :name=" isAppear ? 'fade' : 'router-slid'" mode="out-in">
      <router-view ></router-view>
    </transition>
    <footTip/>
  </div>
</template>

<script>
  import back from '@/components/back/back'
  import footTip from '@/components/foot-tip/foot-tip'
  import { transformRequest } from '@/until'
  import Vue from 'vue'
  export default {
    name: 'app',
    data(){
      return{
        isAppear: true
      }
    },
    components: {
      back,
      footTip
    },
    created(){
      /**
       * 路由封装函数
       * @param url 地址
       * @param params 参数
       */
      Vue.prototype.$go = (url, params, replace=false) => {
          console.log('跳转的页面是:'+url);
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
<style lang="sass" scoped>
</style>

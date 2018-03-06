<template>
  <div id="app" :style="{paddingTop:$route.meta.back?'.88rem':''}">
    <div class="back f36 flex p4" v-if="$route.meta.back !== false" :class="[$route.meta.back && $route.meta.back.background === 'main'?'main':'']">
    <div v-if="$route.meta.back && $route.meta.back.icon !== false" class="flex" @click="back">
      <img class="back-icon" v-if="$route.path.includes('login')" :src="require(`@/assets/common/close.png`)" alt="">
      <img class="back-icon" v-else :src="require(`@/assets/common/arrow-left.png`)" alt="">
      <span v-if="$route.meta.back.showtip" class="tip">返回</span>
    </div>
    <span v-if="$route.meta.back && $route.meta.back.title !== false">{{$route.meta.title}}</span>
  </div>
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
    methods: {
      back(){
        if(this.$route.path.includes('login')){
          this.$go('/')
          return
        }
        this.$router.go(-1)
      }
    },
    watch:{
      $route(to,from){
        this.isAppear = !from.matched.length; //from.matched路由记录为空这表示首次加载，首次加载是用淡入淡出即可
      }
    }
  }
</script>
<style lang="sass" scoped>
  .back
    z-index: 100
    height: .88rem
    line-height: .88rem
    position: fixed
    top: 0
    left: 0
    right: 0
    background: #fff
    color: #181818
    .tip
      padding-left: .1rem
    &-icon
      height: .36rem
    span
      text-align: center
      flex: 1
    &.main
      color: #fff
      background: rgb(50,153,209)
</style>

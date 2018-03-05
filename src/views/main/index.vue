<template>
 <div class="main">
   <div class="tab">
      <ul>
        <li :key="index" v-for="(i,index) in list" :class="[act===index?'act':'']" @click="link(i,index)">
          <img :src="require(`@/assets/main/index/${i.url}${act===index?'-act':''}.png`)" alt="">
          <span>{{i.title}}</span>
        </li>
      </ul>
   </div>
     <keep-alive>
        <router-view v-if="!click_same_menu" :menu="same_menu"></router-view>
     </keep-alive>
    <router-view v-if="click_same_menu" :menu="same_menu"></router-view>
    <!--<router-view :menu="same_menu"></router-view>-->
 </div>
</template>

<script>
import { countStationLetterMsg } from '@/service'
import { mapActions, mapGetters } from 'vuex'
export default {

  name: 'fmain',

  data () {
    return {
      name: '',
      same_menu: false,
      click_same_menu: false,
      circle: false,
      act: 0,
      list:[{
        url: 'home',
        title: '首页',
        name: 'main-home'
      },{
        url: 'product',
        title: '产品',
        name: 'main-product'
      },{
        url: 'wealth',
        title: '财富',
        name: 'main-wealth'
      },{
        url: 'found',
        title: '发现',
        name: 'main-found'
      },{
        url: 'mine',
        title: '我的',
        name: 'main-mine'
      }]
    }
  },
  computed: {
    ...mapGetters([
      'header',
    ])
  },
  created(){
    // 菜单高亮
    this.act = this.list.findIndex(t=>this.$route.path.includes(t.url));
  },
  methods: {
    link(i,index){
      this.same_menu = this.act === index;
      if(this.act === index) return;
      this.click_same_menu = this.act === index; // 点击相同的菜单才会刷新，否则是缓存
      this.$go(i.url);
      this.act = index;
    }
  },
  watch:{
    $route(val){
      for(let i=0,len=this.list.length;i<len;i++){
          let t = this.list[i];
        if(val.path.includes(t.url)){
          this.click_same_menu = this.act = i;
          break
        }
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  .main
    background: #f1f1f9
    min-height: 100vh
    height: 100%
    .tab
      box-shadow: -3px -2px 15px 0px #dbdcdc
      background: #fff
      position: fixed
      bottom: 0
      left: 0
      right: 0
      z-index: 100
      margin: auto
      ul
        text-align: center
        height: .98rem
        display: flex
        li
          transition: all .3s
          &:active
            transform: scale(.8)
            background: transparent
          color: #9fa0a0
          flex: 1
          display: flex
          flex-direction: column
          align-items: center
          justify-content: center
          img
            width: .52rem
          span
            margin-top: .07rem
            font-size: .2rem
          &.act
            color: #00a8ef
</style>

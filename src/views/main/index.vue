<template>
  <div class="main">
    <router-view></router-view>
    <div class="tab">
      <ul>
        <li :key="index" v-for="(i,index) in list" :class="[act===index?'act':'']" @click="link(i,index)">
          <img :src="require(`@/assets/main/index/${i.url}${act===index?'-act':''}.png`)" alt="">
          <span>{{i.title}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
//import {
//  countStationLetterMsg
//} from '@/service'
  import {
    mapActions,
    mapGetters
  } from 'vuex'
  export default {
  
    name: 'fmain',
  
    data() {
      return {
        name: '',
        circle: false,
        act: 0,
        list: [{
          url: 'home',
          title: '首页',
          name: 'main-home'
        }, {
          url: 'product',
          title: '投资',
          name: 'main-product'
        }, {
          url: 'mine',
          title: '人脉',
          name: 'main-mine'
        }, {
          url: 'wealth',
          title: '我的',
          name: 'main-wealth'
        }
//      {
//        url: 'found',
//        title: '发现',
//        name: 'main-found'
//      }, {
//        url: 'mine',
//        title: '我的',
//        name: 'main-mine'
//      }
        
        ]
      }
    },
    computed: {
      ...mapGetters([
        'header',
      ])
    },
    created() {
      // 菜单高亮
      this.act = this.list.findIndex(t => this.$route.path.includes(t.url));
    },
    methods: {
      link(i, index) {
        if (this.act === index) return;
        this.$go(i.url);
        this.act = index;
      }
    },
    watch: {
      $route(val) {
        for (let i = 0, len = this.list.length; i < len; i++) {
          let t = this.list[i];
          if (val.path.includes(t.url)) {
            this.act = i;
            break
          }
        }
      }
    }
  }
</script>

<style lang="sass" scoped>
  .main
    height: auto
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
            width: .48rem
          span
            margin-top: .07rem
            font-size: .2rem
          &.act
            color: #208AFF 
</style>

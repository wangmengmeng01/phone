<template>
  <div class="customer_detail">
    <div class="head center">
      <img class="icon place-img" src="/" alt="">
      <h2 class="name f28 color_font">{{item.name}}</h2>
      <p class="text f24 color_font-s">{{item.text}}</p>
    </div>
    <div class="bg p4">
      <h2 class="title f32 color_font">客户投资背景</h2>
      <ul>
        <li v-for="i in list">
          <h2 class="f28 color_font">{{i.tip1}}</h2>
          <p class="f24 color_font-s">{{i.tip2}}</p>
        </li>
      </ul>
    </div>
    <!--<div class="introduction">-->

    <!--</div>-->
    <!--<div class="record">-->

    <!--</div>-->
  </div>
</template>

<script>
  import { getUserBrokerageRecordList } from '@/service'
  export default {
    name: 'customer_detail',
    data() {
      return {
        item: {
          name: '赵一',
          text: '2016.01.15 成为我的客户'
        },
        list:[{
          tip1: '男 45岁',
          tip2: '性别&年龄'
        },{
          tip1: '男 45岁',
          tip2: '性别&年龄'
        },{
          tip1: '男 45岁',
          tip2: '性别&年龄'
        },{
          tip1: '男 45岁',
          tip2: '性别&年龄'
        },{
          tip1: '男 45岁',
          tip2: '性别&年龄'
        },{
          tip1: '男 45岁',
          tip2: '性别&年龄'
        },{
          tip1: '男 45岁',
          tip2: '性别&年龄'
        },{
          tip1: '男 45岁',
          tip2: '性别&年龄'
        },{
          tip1: '男 45岁',
          tip2: '性别&年龄'
        }]
      }
    },
    created() {
      this.init()
    },
    components: {
    },
    methods: {
      init(){
      }
    },
    watch: {
    }
  }
</script>

<style lang="sass" scoped>
  .customer_detail
    padding: .42rem
    height: 100%
    .head
      background: #fff
      padding: .4rem 0 .58rem
      .icon
        height: 1.48rem
        width: 1.48rem
        border-radius: 50%
      .name
        padding: .18rem 0
    .title
      line-height: 1rem
    .bg
      margin-top: .4rem
      background: #fff
    ul
      padding: .38rem 0
      display: flex
      flex-wrap: wrap
      li
        text-align: center
        flex: 33.33%
        box-sizing: border-box
        padding-bottom: .38rem
        border-top: 1px solid #CDCED3
        border-left: 1px solid #CDCED3
        &:nth-child(1), &:nth-child(2), &:nth-child(3)
          border-top: none
        &:nth-child(1), &:nth-child(4), &:nth-child(7)
          border-left: none
        h2
          line-height: .8rem
</style>

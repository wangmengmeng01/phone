<template>
  <div class="mine">
    <div class="head flex" @click="$go('/webapp/mine/qrcode')">
      <img :src="item.icon" alt="" class="head_icon">
      <div class="msg">
        <h2 class="f44"><span>{{item.name}}</span><img src="" alt=""></h2>
        <p class="f24">{{item.complany}}</p>
        <p class="f24">手机号  {{item.phone}}</p>
      </div>
      <span class="qrcode flex">
        <img src="../../assets/main/mine/qrcode.png" alt="" class="qrcode_icon">
        <img src="../../assets/common/arrow-transparent-right.png" alt="" class="arrow-transparent">
      </span>
    </div>
    <ul class="item" v-for="i in menu">
      <li v-for="j in i" class="flex border-notend-b" @click="$go(`/webapp/mine/${j.url}`)">
        <img :src="require(`@/assets/main/mine/${j.icon}.png`)" alt="" class="icon">
        <span class="name f32">{{j.name}}</span>
        <span class="f28 color_font-s" v-if="!j.url">敬请期待</span>
        <img src="../../assets/common/arrow-right.png" alt="" class="arrow">
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'mine',
    data() {
      return {
        item: {
          icon: require('@/assets/main/mine/head.png'),
          name: '贞子问',
          complany: '中赢卓信财富投资管理(北京)有限公司闵行分公司',
          phone: '17211112222'
        },
       menu: [[{
        icon: 'sweep',
        name: '扫一扫添加客户',
        url: 'qrcode'
      },{
        icon: 'sweep',
        name: '扫一扫添加理财师',
         url: ''
      },{
        icon: 'mine',
        name: '我的理财师',
         url: ''
      }],[{
        icon: 'have',
        name: '已有客户',
         url: 'customer'
      },{
        icon: 'customer',
        name: '潜在客户',
         url: 'customer_potential'
      }],[{
        icon: 'advertisement',
        name: '广告卓信产品记录',
         url: ''
      },{
        icon: 'advertisement',
        name: '针对客户展业记录',
         url: ''
      },{
        icon: 'share',
        name: '邀约客户投资记录',
         url: ''
      },{
        icon: 'discount',
        name: '赠送客户优惠记录',
         url: ''
      }], [{
        icon: 'commission',
        name: '我的佣金',
         url: ''
      }], [{
        icon: 'seting',
        name: '设置',
         url: 'seting'
      }]]
      }
    },
    created() {
    },
    methods: {
    },
    watch: {
    }
  }
</script>

<style lang="sass" scoped>
  .mine
    .head
      padding: .76rem .4rem .6rem
      align-items: flex-start
      color: #fff
      background: rgb(50,153,209)
      .head_icon
        width: 1.16rem
      .msg
        flex: 1
        padding: 0 .4rem
        p
          margin-top: .1rem
          line-height: .34rem
      .qrcode_icon
        width: .72rem
      .arrow-transparent
        height: .4rem
        padding-left: .4rem
    .item
      padding: 0 .4rem
      background: #fff
      margin-top: .4rem
      li
        height: 1.16rem
        .icon
          width: .56rem
        .name
          padding: 0 .4rem
          color: #252525
          flex: 1
        .arrow
          padding-left: .2rem
          height: .34rem
</style>

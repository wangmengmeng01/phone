<template>
  <div class="qrcode">
    <div class="head flex">
      <img :src="item.icon" alt="" class="head_icon">
      <div class="msg">
        <h2 class="f36"><span>{{item.name}}</span><img src="" alt=""></h2>
        <p class="f24">{{item.complany}}</p>
        <p class="f44 flex"><img src="../../assets/main/mine/phone.png" alt="">  {{item.phone}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'qrcode',
    data() {
      return {
        item: {
          icon: require('@/assets/main/mine/head.png'),
          name: '贞子问',
          complany: '中赢卓信财富投资管理(北京)有限公司闵行分公司',
          phone: '17211112222'
        },
      }
    },
    created() {
    },
    components: {
    },
    methods: {
    },
    watch: {
    }
  }
</script>

<style lang="sass" scoped>
  .qrcode
    height: 100%
    background: #fff
    .head
      background: #fff
      padding: .76rem .4rem .6rem
      align-items: flex-start
      .head_icon
        width: 1.16rem
      .msg
        flex: 1
        padding-left: .4rem
        p
          margin-top: .1rem
          line-height: .34rem
          &.flex
            justify-content: flex-start
          img
            width: .72rem
            padding-right: .1rem
</style>

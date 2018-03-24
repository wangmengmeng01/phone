<template>
  <div class="qrcode">
    <div v-if="item.mobile">
      <div class="head flex">
        <img :src="item.icon" alt="" class="head_icon place-img">
        <div class="msg">
          <h2 class="f36 flex"><span>{{item.realName}}</span><span v-if="(item.position=='1')||(item.position=='2')" class="status color_main"><img src="../../assets/main/mine/status_yellow.png" alt=""><i class="f12">{{['一般理财师','大区经理'][parseInt(item.position)-1]}}</i></span></h2>
          <p class="f24">{{item.department}}</p>
          <p class="f32 color_font-s">{{item.beInviteDate}} 成为我的理财师</p>
          <p class="img flex">
            <a class="color_font-s flex f44" :href="`tel:${item.mobile}`"><img src="../../assets/main/mine/phone.png" alt="">{{item.mobile}}</a>
          </p>
        </div>
      </div>
      <a class="f36 btn" :href="`tel:${item.mobile}`">拨打电话</a>
    </div>
    <p v-if="!item.mobile" class="f36 color_font-s center none">暂无</p>
  </div>
</template>

<script>
  import {
    searchMyManagerUserInfo
  } from '@/service'
  export default {
    name: 'master',
    data() {
      return {
        item: {},
      }
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        searchMyManagerUserInfo().then(r => this.item = r);
      }
    },
    watch: {}
  }
</script>

<style lang="sass" scoped>
  .qrcode
    height: 100%
    background: #fff
    a
      text-decoration: none
    .code
      text-align: center
      #code
        margin: 1rem auto .4rem
        width: 3.8rem
        height: 3.8rem
    .head
      background: #fff
      padding: .76rem .4rem .6rem
      align-items: flex-start
      .head_icon
        width: 1.16rem
        height: 1.16rem
      .msg
        flex: 1
        padding-left: .4rem
        h2
          justify-content: flex-start
          .status
            left: .1rem
            position: relative
            height: .38rem
            line-height: .38rem
            width: 1.54rem
            display: flex
            align-items: center
            justify-content: center
            i
              padding-left: .2rem
              position: relative
              z-index: 1
              font-style: normal
            img
              height: 100%
              width: 100%
              left: 0
              top: 0
              position: absolute
        p
          margin-top: .1rem
          line-height: .34rem
          &.img
            margin-top: 2.7rem
          &.flex
            justify-content: flex-start
          img
            width: .72rem
            padding-right: .1rem
    .btn
      border-radius: .36rem
      font-size: .36rem
      width: 4.8rem
      height: .72rem
      line-height: .72rem
      text-align: center
      margin: auto
      color: #fff
  .none
    padding-top: 5rem
</style>

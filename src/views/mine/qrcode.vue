<template>
  <div class="qrcode">
    <div class="head flex">
      <img :src="item.icon" alt="" class="head_icon place-img">
      <div class="msg">
        <h2 class="f36 flex"><span>{{item.userName}}</span><span v-if="!!item.position" class="status color_main"><img src="../../assets/main/mine/status_yellow.png" alt=""><i class="f12">{{['一般理财师','大区经理'][parseInt(item.position)-1]}}</i></span></h2>
        <p class="f24">{{item.pic}}</p>
        <p class="f44 flex"><img src="../../assets/main/mine/phone.png" alt="">  {{item.mobile}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'qrcode',
    data() {
      return {
        item: {},
      }
    },
    computed: {
      ...mapGetters([
        'user_info'
      ])
    },
    created() {
      this.item = this.user_info
      this.item.position = 1
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
  .qrcode
    height: 100%
    background: #fff
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
          &.flex
            justify-content: flex-start
          img
            width: .72rem
            padding-right: .1rem
</style>

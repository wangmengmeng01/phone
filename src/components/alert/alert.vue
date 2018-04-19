<template>
  <fMask v-if="visible" :type="type==='protocol' ? 'protocol' : 'smallToBig'">
    <div class="dialog" :class="[content?'text':'']">
  
      <!--协议弹窗-->
      <div v-if="type==='protocol'" class="alert-protocol">
        <div v-html="content" class="alert-protocol-con"></div>
        <p class="alert-btn">
          <span @click='handleAction(0)' class="cancel">我知道了</span>
        </p>
      </div>
  
      <!--普通的弹窗-->
      <div class="alert" v-else>
        <h2>{{title}}</h2>
        <div v-if="content" class="content">
          <p v-html="content"></p>
        </div>
        <p class="alert-btn">
          <span v-if="no" @click='handleAction(0)' class="cancel">{{no}}</span>
          <span class="submit" @click="handleAction(1)">{{yes}}</span>
        </p>
      </div>
      
      
    </div>
  </fMask>
</template>

<style lang="sass" scoped>
  .dialog
    width: 100%
    height: 100%
    display: flex
    justify-content: center
    align-items: center
    .alert
      height: auto
      width: 5.64rem
      background: #fff
      z-index: 101
      overflow: hidden
      border-radius: .1rem
      line-height: .44rem
      /*padding: .2rem*/
      h2
        font-size: .34rem
        text-align: center
        padding: .44rem 0
        font-weight: normal
        color: #333333
      .content
       padding: 0 0 .34rem 0
       line-height: .44rem
       height: .88rem
       overflow: auto
       max-height: calc(100vh - .16rem)
       text-align: center
       p
        font-size: .28rem
        color: #666666
      .alert-btn
        font-size: .3rem
        position: relative
        text-align: center
        display: flex
        justify-content: space-around
        span
          padding: .2rem .3rem
          flex: 1
          &:active
            background: #ccc
          &:nth-child(2)
            height: 100%
            border-left: 1px solid #EBEBEB
        .submit
          color: #ffffff
          background: #208AFF 
          /*border-radius: 0 0 0 .16rem*/
        .cancel
          color: #666666
          background: #F8F8F8
          border-radius: 0 0 0 .16rem
    .alert-protocol
      padding: .2rem .3rem
      padding-bottom: 1.2rem
      font-size: .32rem
      border-radius: .05rem
      box-sizing: border-box
      height: 90%
      background: #fff
      overflow: auto
      width: 90%
      border-radius: .16rem
      &-con
        line-height: 2
      &:after
        border-top-left-radius: .05rem
        border-top-right-radius: .05rem
        content: ''
        display: inline-block
        position: absolute
        top: 5%
        left: 5%
        width: 90%
        height: .15rem
        background: #fff
        display: none
      .alert-btn
        border-bottom-left-radius: .1rem
        border-bottom-right-radius: .1rem
        color: #ffffff
        line-height: 1rem
        box-shadow: -1px 0px .2rem 0px #ccc
        background: #208aff
        position: fixed
        bottom: 5%
        left: 5%
        width: 90%
        text-align: center
        span
          padding: .1rem .15rem
          flex: 1
          &:active
            background: #ccc
</style>

<script>
  import fMask from '@/components/mask';
  export default {
    name: 'fxd-alert',
    data() {
      return {
        dialogVisible: false,
        visible: false,
        callback: null,
      }
    },
    props: ['title', 'content', 'type', 'yes', 'no', 'protocolType'],
    components: {
      fMask,
    },
    created() {
//    log(this.type)
    },
    methods: {
      handleAction(type) {
        this.visible = false;
        this.callback(type);
      }
    }
  }
</script>

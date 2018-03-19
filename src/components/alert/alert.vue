<template>
  <fMask v-if="visible" :transition="protocolType ? 'protocol' : 'smallToBig'">
    <div class="dialog" :class="[content?'text':'']">

      <!--协议弹窗-->
      <div v-if="type==='protocol'" class="alert-protocol">
         <div>

         </div>
        <p class="alert-btn">
          <span @click='handleAction(0)' class="cancel">我知道了</span>
        </p>
      </div>

      <!--普通的弹窗-->

      <div class="alert" :class="[type==='help' ? 'help' : '']" v-else>
        <h2>{{title}}</h2>
        <div v-if="content" class="content" >
          <p v-html="content"></p>
        </div>
        <p class="alert-btn">
          <span v-if="no"  @click='handleAction(0)' class="cancel">{{no}}</span>
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
      &.help
        width: 68%
        h2
          padding: 15px 0
          margin: 0 15px
          font-size: 15px
        .content
          margin: 0 15px
          color: #808080
          font-size: 14px
          padding: 10px 0
          border-bottom: 1px solid #EBEBEB
          word-break: break-all
      height: auto
      background: #fff
      z-index: 101
      overflow: hidden
      border-radius: 5px
      line-height: 22px
      padding: 5px
      font-size: 14px
      h2
        text-align: center
        padding: 30px
        font-weight: normal
        border-bottom: 1px solid #EBEBEB
        .content
          border: 1px solid #EBEBEB
          padding: 2px
          line-height: 2
          overflow: auto
          max-height: calc(100vh - 8px)
      .alert-btn
        position: relative
        text-align: center
        display: flex
        justify-content: space-around
        span
          padding: 10px 15px
          flex: 1
          &:active
            background: #ccc
          &:nth-child(2)
            height: 100%
            border-left: 1px solid #EBEBEB
        .submit, .cancel
          color: #00aaee
    .alert-protocol
      border-radius: 5px
      box-sizing: border-box
      height: 90%
      background: #fff
      overflow: auto
      padding-bottom: 50px
      width: 90%
      &:after
        border-top-left-radius: 5px
        border-top-right-radius: 5px
        content: ''
        display: inline-block
        position: absolute
        top: 5%
        left: 5%
        width: 90%
        height: 15px
        background: #fff
      .alert-btn
        border-bottom-left-radius: 5px
        border-bottom-right-radius: 5px
        color: #00a8ef
        line-height: 50px
        box-shadow: -1px 0px 10px 0px #ccc
        background: #fff
        position: fixed
        bottom: 5%
        left: 5%
        width: 90%
        text-align: center
        span
          padding: 10px 15px
          flex: 1
          &:active
            background: #ccc
    .other
      padding: 0
      color: #808080
      width: 80%
      .alert-btn
        line-height: 40px
        font-size: 16px
        position: relative
        color: #00a8ef
        font-size: 16px
        &:after
          background: #ccc
          content: ''
          display: block
          position: absolute
          left: 10%
          top: 0
          width: 80%
          height: 1px
      dl
        &:last-child
          .feeText
            margin: 10px auto
        dt
          text-align: center
          line-height: 50px
          background: rgba(223,227,230,1)
          font-size: 16px
        dd
          padding: 5px 15px
          display: flex
          &.feeText
            width: 70%
            margin: auto
            span:last-child
              color: #00a8ef
              flex: .5
          span
            flex: 1

</style>
<script>
    import fMask from '@/components/mask';
    export default{
        name: 'fxd-alert',
        data() {
            return {
                dialogVisible:false,
                visible: false,
                callback:null,
            }
        },
        props: ['title', 'content', 'type', 'yes', 'no', 'protocolType'],
        components: {
            fMask,
        },
        methods: {
            handleAction(type){
                this.visible = false;
                this.callback(type);
            }
        }
    }
</script>

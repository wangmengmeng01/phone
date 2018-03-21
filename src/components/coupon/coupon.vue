<template>
  <transition name="bouncelnRight" mode="out-in">
    <div class="coupon-item" v-if="visibility && data" @click="checkedFn">
      <img :src="require(`@/assets/coupon/${['voucher','cash','red','dis'][parseInt(data.couponType || data.type)-1]}.png`)" alt="" class="bg">
      <img src="../../assets/common/close_circle.png" alt="" class="close" v-if="close" @click="closeFn">
      <div class="con">
        <div class="top f20">
          <div class="left">
            <h2 class="profitRate f20">+<span class="f36">{{data.profitRate}}</span>%</h2>
            <p class="couponName f36">{{data.couponName}}</p>
            <p class="remark f12">{{data.isSameOverlap=='2'?'不':''}}允许同类叠加使用</p>
          </div>
          <div class="right">
            <h2 class="from f20">来自<span class="f36">{{data.name}}</span>理财师<img src="../../assets/coupon/info.png" alt="" class="info"></h2>
            <p>{{data.remark}}</p>
            <p class="f12">{{data.startDate}}至{{data.endDate}}</p>
          </div>
        </div>
        <div class="bottom f20 color_font-s">
          <p>适用于{{data.productName}}</p>
          <img :src="require(`@/assets/coupon/check_${check?'succ':'none'}.png`)" alt="" class="check" v-if="checked">
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'coupon',
    data() {
      return {
        visibility: true,
        bg: '',
        check: false
      }
    },
    props: ['data', 'checked', 'close'],
    methods: {
      checkedFn(){
        if(!this.checked)return;
        this.check =! this.check;
        let res = this.check ? this.data : [];
        this.$emit('checkedCb', res)
      },
      closeFn(){
        this.visibility =! this.visibility;
        this.$emit('closeCb', this.data)
      }
    },
  }
</script>

<style lang="sass" scoped>
  .bouncelnRight-enter-active, .bouncelnRight-leave-active
    transition: all .2s
  .bouncelnRight-enter, .bouncelnRight-leave-active
    opacity: 0
    transform: translateX(100%)
  .coupon-item
    position: relative
    height: 3.16rem
    width: 100%
    .close
      transform: translate(50%, -50%)
      width: .56rem
      height: .56rem
      z-index: 1
      position: absolute
      right: 0
      top: 0
    .bg
      top: 0
      bottom: 0
      left: 0
      right: 0
      position: absolute
      height: 100%
      width: 100%
    .con
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      .top
        border-bottom: 1px dashed #181818
        height: calc(2.2rem - 1px)
        color: #fff
        display: flex
        justify-content: space-between
        .left
          display: flex
          flex-direction: column
          justify-content: space-between
          align-items: center
          padding: .4rem 0
          flex: 1
        .right
          padding-left: .2rem
          padding-top: .4rem
          padding-bottom: .4rem
          border-left: 1px dashed #fff
          justify-content: space-between
          display: flex
          flex-direction: column
          flex: 1.2
          .from
            display: flex
            align-items: center
            padding-bottom: .2rem
            span
              padding: 0 .1rem
            .info
              padding-left: .1rem
              width: .36rem
      .bottom
        display: flex
        justify-content: space-between
        padding: .2rem
        height: .96rem
        line-height: .28rem
        img
          padding-left: .2rem
          width: .38rem
          height: .38rem
</style>

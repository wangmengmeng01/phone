<template>
  <transition name="router-slid" mode="out-in">
    <div class="coupon-item" v-if="visibility" @click="checkedFn" >
      <img :src="require(`@/assets/coupon/${['voucher','cash','red','dis'][parseInt(data.couponType)-1]}.png`)" alt="" class="bg">
      <img src="../../assets/common/close_circle.png" alt="" class="close" v-if="close" @click="closeFn">
      <div class="con">
        <div class="top f20">
          <div class="left">
            <h2 class="profitRate f20">+<span class="f36">0.5</span>%</h2>
            <p class="couponName f36">加息券</p>
            <p class="remark">不允许同类叠加使用</p>
          </div>
          <div class="right">
            <h2 class="from f20">来自<span class="f36">江艺</span>理财师<img src="../../assets/coupon/info.png" alt="" class="info"></h2>
            <p>投满100,000元可用</p>
            <p>2018.01.01领取-2018.06.01过期</p>
          </div>
        </div>
        <div class="bottom f20 color_font-s">
          <p>适用于月月赢、月满赢、月月赢、月月赢、月月赢、月月赢、月月赢</p>
          <img :src="require(`@/assets/coupon/check_${check?'succ':'none'}.png`)" alt="" class="check" v-if="checked">
        </div>
      </div>
    </div>
    <div v-else>暂无</div>
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
    created() {
    },
    methods: {
      checkedFn(){
        this.check =! this.check;
        this.$emit('checkedCb',this.data)
      },
      closeFn(){
        this.visibility =! this.visibility;
      }
    },
    watch: {
    }
  }
</script>

<style lang="sass" scoped>
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
          flex: 1.3
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

<template>
  <transition name="bouncelnRight" mode="out-in">
    <div class="coupon-item" v-if="visibility && data" :class="ruleshowBol?'cc':''" style="box-shadow:  0 0 12px 0 rgba(0,0,0,0.06)">
      <img :src="require(`@/assets/coupon/${['voucher','cash','red','dis'][parseInt(data.couponType || data.type)-1]}.png`)" alt="" class="bg">
      <img src="../../assets/common/delete.png" alt="" class="close" v-if="close" @click="closeFn">
     
     <div class="con" @click="checkedFn">
        <!--<div class="top f20">
          <div class="left">
            <h2 class="profitRate f60"><span class="f60">{{data.profitRate}}</span>%</h2>
            <p class="couponName f32">{{data.couponName}}</p>
            <p class="remark f12">{{data.isSameOverlap=='2'?'不':''}}允许同类叠加使用</p>
            <p class="remark f12">{{data.isSameOverlap=='2'?'不':''}}允许同类叠加使用</p>
          </div>
          <div class="right">
            <h2 class="from f20" v-if="type !== 'mine'">来自<span class="f36">{{data.name}}</span>理财师<img src="../../assets/coupon/info.png" alt="" class="info"></h2>
            <p>{{data.remark}}</p>
            <p class="f12">{{data.startDate}}至{{data.endDate}}</p>
          </div>
        </div>-->
        <!--<div class="bottom f20 color_font-s">
          <p>适用于{{data.productName}}</p>
          <img :src="require(`@/assets/coupon/check_${check?'succ':'none'}.png`)" alt="" class="check" v-if="checked">
        </div>-->
        <div class="conDiv1">
        		<span class="f48 conDivp1" v-show="data.type" style="width: 1.94rem;">{{data.profitRate}}{{data.type==1?'%':'元'}}</span>
        		<span class="f48 conDivp1" v-show="data.couponType" style="width: 1.94rem;">{{data.profitRate}}{{data.couponType==1?'%':'元'}}</span>
        		<p class="f28 conDivp2"  v-if="type !== 'mine'">来源：理财师</p>
        		
        </div>
        <div class="conDiv2">
        		<p class="f28 conDivp1" style="width: 1.94rem;">—{{data.couponName}}—</p>
        		<p class="f28 conDivp2">有效期：{{data.startDate}}—{{data.endDate}}</p>
        </div>
        <img :src="require(`@/assets/coupon/check_${check?'succ':'none'}.png`)" alt="" class="check" v-show="check" v-if="checked">
      </div>
      <div class="conRule" @click.stop="ruleshowBol=!ruleshowBol"  :class="ruleshowBol?'hh':''">
      	<p class="conRule_p f28">
      		<span class="color_font-36">使用规则</span>
      		<span class="color_font-99">展开 <img v-if="!ruleshowBol" src="../../assets/coupon/iconDown.png"/> <img v-else src="../../assets/coupon/iconUp.png"/></span>
      	</p>
      	  <transition name="bouncelnTop" mode="out-in">
      	<div class="conRuleDiv f24"  v-show="ruleshowBol">
      		<p>适用产品：{{data.productName}}</p>
      		<p>使用条件：投资满{{data.maxAmount}}元可用</p>
      		<!--<p>注：满足条件时{{data.isSameOverlap=='2'?'不':''}}可与其他卡券叠加使用</p>-->
      	</div>
      	 </transition>
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
        check: false,
        ruleshowBol:false,
      }
    },
    props: ['data', 'checked', 'close', 'type'],
    methods: {
      checkedFn() {
        if (!this.checked) return;
        this.check = !this.check;
        let res = this.check ? this.data : [];
        this.$emit('checkedCb', res)
      },
      closeFn() {
        this.visibility = !this.visibility;
        this.$emit('closeCb', this.data)
      }
    },
  }
</script>

<style lang="sass" scoped>
  .bouncelnRight-enter-active, .bouncelnRight-leave-active
    transition: all .5s
  .bouncelnRight-enter, .bouncelnRight-leave-active
    opacity: 0
    transform: translateX(100%)
  .bouncelnTop-enter-active, .bouncelnTop-leave-active
    transition: all .5s
  .bouncelnTop-enter, .bouncelnTop-leave-active
    opacity: 0
    transform: translateY(-100%)

  .coupon-item
    position: relative
    height: 2.82rem
    border-radius: 0.12rem 0.12rem .12rem .12rem
    .hh
     height: 2.0rem 
    .conRule
      position: absolute
      top: 2.02rem
      left: 0	
      width: 6.86rem
      /*height: 2.8rem*/
      overflow: hidden
      border-radius: 0 0 .12rem .12rem
      background-color: #fff
      overflow: hidden
      .conRuleDiv
       float: left
       width: 6.50rem
       height: 1.17rem
       margin: 0 .18rem
       border-top: 1px solid #ececec
       color: #666666
       line-height: .24rem
       p:nth-child(1)
        text-align: left
        margin: .28rem 0
       p:nth-child(2)
        text-align: left
        margin: 0 0 .22rem
       p:nth-child(3)
        margin: .66rem 0 .22rem;
        text-align: center
      span:nth-child(1)
       float: left
       line-height: .8rem
       margin-left: .22rem
      span:nth-child(2)
       float: right
       line-height: .8rem
       img
        width: .24rem
        height: .14rem
        margin: 0 .17rem
    .close
      width: .52rem
      height: .52rem
      z-index: 1
      position: absolute
      right: .2rem
      top: 0.12rem
    .bg
      top: 0
      bottom: 0
      left: 0
      right: 0
      position: absolute
      height: 2.02rem
      width: 6.86rem

    .con
      position: absolute
      top: 0
      left: 0
      height: 2.02rem
      width: 6.86rem
      color: #fff
      img
       width: 1.22rem
       height: 1.1rem
       position: absolute
       right: -1px
       top: 0
      .conDiv1
       margin: .46rem 0 .40rem
       line-height: .44rem
       overflow: hidden
       .conDivp1
        float: left
        display: flex
        justify-content: center
       .conDivp2
        float: left
        width: 4.56rem
        padding-left: .32rem
        text-align: left
      .conDiv2
       margin: 0 0 .44rem
       line-height: .28rem
       overflow: hidden
       .conDivp1
        float: left
        display: flex
        justify-content: center
       .conDivp2
        float: left
        width: 4.56rem
        padding-left: .32rem
        text-align: left
  .cc
   height: 4.02rem
      
      
      
      
      
</style>

<template>
  <div class="coupon_choose">
    <ul class="nav flex f32">
      <li v-for="(i,index) in nav" @click="choose(i,index)" :class="[index===act?'act color_main':'color_font-s']">{{i.name}}({{i.size}})</li>
    </ul>
    <div class="coupon p4">
      <Coupon v-for="(i,index) in res" :data="i" :key="index" class="coupon_list"/>
    </div>
    <button class="btn">选取</button>
  </div>
</template>

<script>
  import Coupon from '@/components/coupon/coupon'
  import { showGiveCouponList } from '@/service'
  export default {
    name: 'coupon_choose',
    data() {
      return {
        act: 0,
        nav: [{
          name: '可用优惠',
          type: '1',
          size: 2
        },{
          name: '不可用优惠',
          type: '2',
          size: 10
        }],
        res: {}
      }
    },
    components: {
      Coupon,
    },
    created() {
      this.init();
    },
    methods: {
      init(){
        showGiveCouponList({couponType: '1'}).then(res=>{
          this.res = [{"couponName":"加息券002","endDate":"2018.03.31","receiveNo":"ZZT_20180201","couponType":"1","couponNo":"JXQ_ZZT_20180201_02","profitRate":"0","maxAmount":"800","productName":"双季丰、双季丰、月满赢","productNo":"QY_YYB_2,QY_YYB_2,QY_YYB_4","startDate":"2018.02.01"},{"couponName":"加息券002","endDate":"2018.03.31","receiveNo":"ZZT_20180201","couponType":"2","couponNo":"JXQ_ZZT_20180201_02","profitRate":"0","maxAmount":"800","productName":"双季丰、双季丰、月满赢","productNo":"QY_YYB_2,QY_YYB_2,QY_YYB_4","startDate":"2018.02.01"},{"couponName":"加息券002","endDate":"2018.03.31","receiveNo":"ZZT_20180201","couponType":"3","couponNo":"JXQ_ZZT_20180201_02","profitRate":"0","maxAmount":"800","productName":"双季丰、双季丰、月满赢","productNo":"QY_YYB_2,QY_YYB_2,QY_YYB_4","startDate":"2018.02.01"},{"couponName":"加息券002","endDate":"2018.03.31","receiveNo":"ZZT_20180201","couponType":"1","couponNo":"JXQ_ZZT_20180201_02","profitRate":"0","maxAmount":"800","productName":"双季丰、双季丰、月满赢","productNo":"QY_YYB_2,QY_YYB_2,QY_YYB_4","startDate":"2018.02.01"},{"couponName":"加息券002","endDate":"2018.03.31","receiveNo":"ZZT_20180201","couponType":"2","couponNo":"JXQ_ZZT_20180201_02","profitRate":"0","maxAmount":"800","productName":"双季丰、双季丰、月满赢","productNo":"QY_YYB_2,QY_YYB_2,QY_YYB_4","startDate":"2018.02.01"}]
        })
      },
      choose(i,index){
        this.act = index;
        this.init(i);
      },
      checked(res){
        log(res)
      }
    },
    watch: {
    }
  }
</script>

<style lang="sass" scoped>
  .coupon_choose
    .nav
      padding: .2rem
      margin: .4rem .6rem
      li
        padding-bottom: .2rem
        &.act
          border-bottom: 2px solid rgb(50,153,209)
        text-align: center
        flex: 1
    .coupon
      margin: auto .2rem
      border-radius: .2rem
      padding-top: .6rem
      padding-bottom: .3rem
      background: #fff
      .coupon_list
        margin-bottom: .4rem
    .btn
      font-size: .36rem
      margin-top: 1rem
      border-radius: 0
</style>

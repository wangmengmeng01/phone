<template>
  <div class="coupon_choose_usable">
    <ul class="nav f32">
      <li v-for="(i,index) in nav" @click="choose(i,index)" :class="[index===act?'act color_main':'color_font-s']">{{i.name}}</li>
    </ul>
    <div class="coupon">
      <Coupon v-for="(i,index) in res" :data="i" :key="index" class="coupon_list" checked="true"/>
    </div>
    <button class="btn">选取</button>
  </div>
</template>

<script>
  import Coupon from '@/components/coupon/coupon'
  import { showGiveCouponList } from '@/service'
  export default {
    name: 'coupon_choose_usable',
    data() {
      return {
        act: 0,
        nav: [{
          name: '加息券',
          type: '1',
        },{
          name: '现金红包',
          type: '2',
        },{
          name: '红包',
          type: '3',
        }],
        res: {}
      }
    },
    components: {
      Coupon,
    },
    created() {
      this.init(this.nav[0]);
    },
    methods: {
      init(item){
        showGiveCouponList({couponType: item.type}).then(res=>{
          this.res = res.couponList
//          this.res = [{"couponName":"加息券002","endDate":"2018.03.31","receiveNo":"ZZT_20180201","couponType":"1","couponNo":"JXQ_ZZT_20180201_02","profitRate":"0","maxAmount":"800","productName":"双季丰、双季丰、月满赢","productNo":"QY_YYB_2,QY_YYB_2,QY_YYB_4","startDate":"2018.02.01"},{"couponName":"加息券002","endDate":"2018.03.31","receiveNo":"ZZT_20180201","couponType":"2","couponNo":"JXQ_ZZT_20180201_02","profitRate":"0","maxAmount":"800","productName":"双季丰、双季丰、月满赢","productNo":"QY_YYB_2,QY_YYB_2,QY_YYB_4","startDate":"2018.02.01"},{"couponName":"加息券002","endDate":"2018.03.31","receiveNo":"ZZT_20180201","couponType":"3","couponNo":"JXQ_ZZT_20180201_02","profitRate":"0","maxAmount":"800","productName":"双季丰、双季丰、月满赢","productNo":"QY_YYB_2,QY_YYB_2,QY_YYB_4","startDate":"2018.02.01"},{"couponName":"加息券002","endDate":"2018.03.31","receiveNo":"ZZT_20180201","couponType":"1","couponNo":"JXQ_ZZT_20180201_02","profitRate":"0","maxAmount":"800","productName":"双季丰、双季丰、月满赢","productNo":"QY_YYB_2,QY_YYB_2,QY_YYB_4","startDate":"2018.02.01"},{"couponName":"加息券002","endDate":"2018.03.31","receiveNo":"ZZT_20180201","couponType":"2","couponNo":"JXQ_ZZT_20180201_02","profitRate":"0","maxAmount":"800","productName":"双季丰、双季丰、月满赢","productNo":"QY_YYB_2,QY_YYB_2,QY_YYB_4","startDate":"2018.02.01"}]
        }).catch(err=>{
          this.res = []
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
  .coupon_choose_usable
    padding-top: .2rem
    .nav
      position: fixed
      left: 0
      top: 1.08rem
      bottom: 0
      width: 2rem
      background: #fff
      li
        height: .96rem
        line-height: .96rem
        &.act
          background: #f1f1f9
        text-align: center
        flex: 1
    .coupon
      padding-bottom: 1.1rem
      padding-left: 2.2rem
      flex: 1
      .coupon_list
        margin-bottom: .2rem
    .btn
      position: fixed
      left: 0
      right: 0
      bottom: 0
      font-size: .36rem
      border-radius: 0
</style>

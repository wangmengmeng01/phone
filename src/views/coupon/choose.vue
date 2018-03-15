<template>
  <div class="coupon_choose">
    <ul class="nav flex f32">
      <li v-for="(i,index) in nav" @click="choose(i,index)" :class="[index===act?'act color_main':'color_font-s']">{{i.name}}({{i.size}})</li>
    </ul>
    <div class="coupon p4" :class="[!res.length?'none':'']">
      <Coupon v-for="(i,index) in res" :data="i" :key="index" class="coupon_list" checked="true"  @checkedCb="checkedCb(i,index)" ref="coupon"/>
      <div v-if="!res.length" class="nothing f32 color_font">暂无可送优惠券</div>
    </div>
    <button class="btn" @click="submit">选取</button>
  </div>
</template>

<script>
  import Coupon from '@/components/coupon/coupon'
  import { mapGetters, mapMutations } from 'vuex'
  import { searchCouponList, getCouponBenefit } from '@/service'
  import axios from 'axios'
  import {transformRequest} from '@/until'

  export default {
    name: 'coupon_choose',
    data() {
      return {
        act: 0,
        nav: [{
          name: '可用优惠',
          type: '1',
          size: 0
        },{
          name: '不可用优惠',
          type: '2',
          size: 0
        }],
        res: {},
        couponlist: [],
        pageIndex:1,//分页
      }
    },
    components: {
      Coupon,
    },
    computed: {
      ...mapGetters([
        'coupon'
      ])
    },
    created() {
    	this.SET_COUPON({
          data: []
        });
      this.init(this.nav[0]);
    },
    methods: {
    	  ...mapMutations([
        'SET_COUPON',
      ]),
      init(item){
      	const {productNo, investAmount} = this.coupon.params;
      	let pageIndex=this.pageIndex;
        searchCouponList({
        	productNo,
        	investAmount,
        	useType:item.type,
        	pageIndex
        }).then(res=>{
          this.res = res.couponList
          this.nav[0].size=res.availableNum;
          this.nav[1].size=res.disabledNum;

        }).catch(err=>{
          this.res = []
        })
      },
      choose(i,index){
        if(this.act===index)return;
        this.act = index;
        this.init(i);
      },
      checkedCb(data, index){
        if(!this.couponlist.length){
          this.couponlist.push(data)
          return
        }
        if(!this.$refs.coupon[index].check){
          const couponlistIndex = this.couponlist.findIndex(t=>t.couponNo === data.couponNo);
          this.couponlist.splice(couponlistIndex,1)
          return
        }

         if(!this.isSameOverlapList(data, index)) return;
        if(!this.isDifferentOverlap(data, index)) return;
        const couponlistIndex = this.couponlist.findIndex(t=>t.couponNo === data.couponNo);
          couponlistIndex == -1
          ?
          this.couponlist.push(data)
          :
          this.couponlist.splice(couponlistIndex,1)
      },
      isSameOverlapList(data, index){
        // 抽出所有类型相同并且不能同类相加的卡券
        const isSameOverlapList = this.couponlist.filter(t=>(t.type === data.type && t.isSameOverlap == '2'));
        // 如果有了则不能再加了，否则可以加
        if(!isSameOverlapList.length){
          this.$refs.coupon[index].check = false;
          this.$toask('此券不允许同类叠加');
          return false
        }
        return true
      },
      isDifferentOverlap(data, index){
        // 抽出所有类型不同并且不能异类相加的卡券
        const isSameOverlapList = this.couponlist.filter(t=>(t.type != data.type && t.isDifferentOverlap == '2'));
        // 如果有了则不能再加了，否则可以加
        if(!isSameOverlapList.length){
          this.$refs.coupon[index].check = false;
          this.$toask('此券不允许异类叠加');
          return false
        }
        return true
      },

      transformParams(data){
        let str = '';
        data.
        return
      },
      submit(){
        const bidNo = this.$route.query.bidNo;
        this.SET_COUPON({
          data: this.couponlist
        });
        const couponList = this.couponlist.map(t=>{
            const {couponNo, couponType, couponRate, isSameOverlap, isDifferentOverlap, receiveNo} = t;
           return {couponNo, couponType, couponRate, isSameOverlap, isDifferentOverlap, receiveNo};
  })
        axios.get('http://192.168.8.161:8506/zw/api/coupon/filter/getCouponBenefit?client=2&userToken=c03e58915b154e7cad16d730cd63f1f8&couponList=[{"couponNo":"JXQ_ZZT_20180201_01","couponType":1,"couponRate":"0.1","isSameOverlap":1,"isDifferentOverlap":1,"receiveNo":"ZZT_20180201"},{"couponNo":"JXQ_ZZT_20180201_02","couponType":1,"couponRate":"0.2","isSameOverlap":1,"isDifferentOverlap":1,"receiveNo":"ZZT_20180202"}]')
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });


//        getCouponBenefit({
//          couponList
//        }).then(r=>{
//          log(r)
//        });
//        this.$go(this.coupon.backurl,{bidNo,linkType:this.$route.query.linkType})
      }
    },
    watch: {
    }
  }
</script>

<style lang="sass" scoped>
  .coupon_choose
    height: 100%
    padding-bottom: 1.08rem
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
      &.none
        padding: 0
        margin: 0
      .nothing
        background: #f1f1f9
        height: 100vh
        display: flex
        align-items: center
        justify-content: center
      margin: auto .2rem
      border-radius: .2rem
      padding-top: .6rem
      padding-bottom: .3rem
      background: #fff
      .coupon_list
        margin-bottom: .4rem
    .btn
      position: fixed
      bottom: 0
      left: 0
      right: 0
      font-size: .36rem
      margin-top: 1rem
      border-radius: 0
</style>

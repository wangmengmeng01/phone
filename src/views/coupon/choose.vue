<template>
  <div class="coupon_choose">
    <ul class="nav flex f32">
      <li v-for="(i,index) in nav" @click="choose(i,index)" :class="[index===act?'act color_main':'color_font-s']">{{i.name}}({{i.size}})</li>
    </ul>
    <div class="coupon p4" :class="[!res.length?'none':'']">
      <Coupon v-for="(i,index) in res" :data="i" :key="index" class="coupon_list"/>
      <div v-if="!res.length" class="nothing f32 color_font">暂无可送优惠券</div>
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
      this.init(this.nav[0]);
    },
    methods: {
      init(item){
        showGiveCouponList({couponType: item.type}).then(res=>{
          this.res = res.couponList
        }).catch(err=>{
          this.res = []
        })
      },
      choose(i,index){
        if(this.act===index)return;
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

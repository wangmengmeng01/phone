<template>
  <div class="coupon_choose_usable">
    <ul class="nav f32">
      <li v-for="(i,index) in nav" @click="choose(i,index)" :class="[index===act?'act color_main':'color_font-s']">{{i.name}}</li>
    </ul>
    <div class="coupon">
      <Coupon v-for="(i,index) in res" :data="i" :key="index" class="coupon_list" checked="true" @checkedCb="checkedCb"/>
      <div v-if="!res.length" class="none f32 color_font">暂无可送优惠券</div>
    </div>
    <button class="btn" @click="submit">选取</button>
  </div>
</template>

<script>
  import Coupon from '@/components/coupon/coupon'
  import { mapGetters, mapMutations } from 'vuex'
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
        res: {},
        couponlist: []
      }
    },
    computed: {
      ...mapGetters([
        'coupon'
      ])
    },
    components: {
      Coupon,
    },
    created() {
      this.init(this.nav[0]);
    },
    methods: {
      ...mapMutations([
        'SET_COUPON',
      ]),
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
      checkedCb(data){
        this.couponlist.length
          ? this.couponlist.concat(this.couponlist.filter(t=>{
          return t.couponNo !== data.couponNo
        }))
          : this.couponlist.push(data)
      },
      submit(){
        this.SET_COUPON({
          data: this.couponlist
        });
        this.$go(this.coupon.backurl)
      }
    },
    watch: {
    }
  }
</script>

<style lang="sass" scoped>
  .coupon_choose_usable
    height: 100%
    padding-top: .2rem
    .nav
      height: 100%
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
      .none
        height: 100vh
        display: flex
        align-items: center
        justify-content: center
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

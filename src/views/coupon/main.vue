<template>
  <div class="coupon_main">
    <ul class="nav flex f32">
      <li v-for="(i,index) in nav" @click="choose(i,index)" :class="[index===act?'act color_main':'color_font-s']">{{i.name}}({{i.size}})</li>
    </ul>
    <div class="coupon p4" :class="[!res.length?'none':'']">
      <Coupon v-for="(i,index) in res" :data="i" :key="index" class="coupon_list" />
      <div v-if="!res.length" class="nothing f32 color_font"><img src="../../assets/common/nothing_coupon.png" alt=""><p>暂无{{nav[act].name}}券</p></div>
    </div>
  </div>
</template>

<script>
  import Coupon from '@/components/coupon/coupon'
  import {
    searchUserCouponInfo
  } from '@/service'
  export default {
    name: 'coupon_main',
    data() {
      return {
        act: 0,
        nav: [{
          name: '未使用',
          type: '1',
          status: '3',
          size: 0
        }, {
          name: '已使用',
          type: '1',
          status: '4',
          size: 0
        }, {
          name: '过期未使用',
          type: '1',
          status: '6',
          size: 0
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
    //    mounted() {
    //      document.body.onscroll = () => {
    //        if(document.documentElement.scrollTop >= document.body.scrollHeight - document.documentElement.clientHeight) {
    //          if(this.res.length <= 10)return;
    //          if(this.pageIndex < Math.ceil(this.nav[this.act].size / 10)) return;
    //          this.pageIndex++;
    //          this.init();
    //        }
    //      }
    //    },
    methods: {
      init() {
        searchUserCouponInfo(this.nav[this.act]).then(res => {
          this.res = res.couponList;
          this.nav[0].size = res.notUsedCount;
          this.nav[1].size = res.usedCount;
          this.nav[2].size = res.expireNotUsedCount;
        }).catch(() => {
          this.res = []
        })
      },
      choose(i, index) {
        if (this.act === index) return;
        window.scroll(0, 0);
        this.act = index;
        this.pageIndex = 1; // 切换菜单重置pageIndex
        this.init(i);
      },
    },
    watch: {}
  }
</script>

<style lang="sass" scoped>
  .coupon_main
    padding: .2rem
    .nav
      margin: .4rem 0
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
          img
            width: 3.32rem
      border-radius: .2rem
      padding-top: .6rem
      padding-bottom: .3rem
      background: #fff
      .coupon_list
        margin-bottom: .4rem
</style>

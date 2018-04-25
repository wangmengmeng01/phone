<template>
  <div class="gift_choose">
    <ul class="nav flex f32">
      <li v-for="(i,index) in nav" @click="linkto(i,index)" :class="[index===act?'act color_main':'color_font-s']">{{i.name}}({{i.size}})</li>
    </ul>
    <div class="gift p4" :class="[!res.length?'none':'']">
      <ul>
        <li class="item flex">
          <img src="../../assets/found/gift.png" alt="" class="icon">
          <div class="r">
            <p class="t corlor_font f32">2018.01.01 <span class="f24">收到</span> <span class="f24 color_font-s">来自</span> 江艺 <span class="f24 color_font-s">理财师</span></p>
            <div class="b flex">
              <div>
                <h2 class="f32 color_font">20元红包</h2>
                <p class="f24 color_font-s">2018.07.03 过期</p>
              </div>
              <span class="color_main f28 button">领取</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  import {
    searchGiveCouponList
  } from '@/service'
  export default {
    name: 'gift_choose',
    data() {
      return {
        act: 0,
        nav: [{
          name: '未领取',
          type: '1',
          size: 2
        }, {
          name: '已领取',
          type: '2',
          size: 10
        }, {
          name: '过期未领取',
          type: '2',
          size: 10
        }],
        res: {},
        couponList: []
      }
    },
    computed: {
      ...mapGetters([
        'gift'
      ])
    },
    created() {
      this.init(this.nav[0]);
    },
    methods: {
      init(item) {
        searchGiveCouponList({
          source: '2'
        }).then(res => {
          this.res = res.couponList
        }).catch(err => {
          this.res = []
        })
      },
      choose(i, index) {
  
      },
      checkedCb(data) {
  
      },
      submit() {
  
      }
    },
    watch: {}
  }
</script>

<style lang="sass" scoped>
  .gift_choose
    height: 100%
    padding-bottom: 1.08rem
    .nav
      padding: .2rem
      margin: .4rem 0
      li
        padding-bottom: .2rem
        &.act
          border-bottom: 2px solid rgb(50,153,209)
        text-align: center
        flex: 1
    .gift
      .item
        &:not(:last-child)
          border-bottom: 1px solid #CDCED3
        padding: .4rem
        .icon
          width: 1.34rem
          height: 1.54rem
        .r
          padding-left: .3rem
          flex: 1
          .b
            margin-top: .2rem
            h2
              padding-bottom: .2rem
            .button
              text-align: center
              display: inline-block
              width: 1.32rem
              height: .52rem
              line-height: .52rem
              background: #F0F0F0
              border-radius: .32rem
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
      padding-top: .6rem
      padding-bottom: .3rem
      background: #fff
      .gift_list
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

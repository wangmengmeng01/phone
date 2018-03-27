<template>
  <div class="found">
    <!--我的礼物-->
    <div class="item mygift" v-if="item.coupon && item.coupon.couponList.length">
      <h2 class="subtitle f28 color_font-s">理财师 <span v-if="realName">{{realName}}</span> 送我的{{item.coupon.couponList.length}}个礼物</h2>
      <h3 class="title color_font flex">我的礼物
        <!--<div class="flex">-->
        <!--<span class="f28 color_main">更多</span>-->
        <!--<img src="../../assets/common/arrow-right.png" alt="">-->
        <!--</div>-->
      </h3>
      <div class="con">
        <ul :style="{width: item.coupon.couponList.length*4.38+'rem'}" id="gift">
          <li v-for="i in item.coupon.couponList" @click="giftData=i,gift_visible=true">
            <p class="f26"><span>收到礼物</span>赶快领取您的福利吧</p>
            <p class="f20">{{i.startDate}}收到～{{i.endDate}}失效</p>
          </li>
        </ul>
      </div>
    </div>
    <!--履行承诺-->
    <div class="item promise">
      <h2 class="subtitle f28 color_font-s">一诺千金，奋争到底</h2>
      <h3 class="title color_font flex">履行承诺
        <!--<div class="flex">-->
        <!--<span class="f28 color_main">更多</span>-->
        <!--<img src="../../assets/common/arrow-right.png" alt="">-->
        <!--</div>-->
      </h3>
      <div class="con">
        <ul  v-if="item.promise && item.promise.promiseInviteList.length">
          <li class="border-notend-b" v-for="i in item.promise.promiseInviteList" @click="$go('/prod/buyBid',{bidNo:i.bidNo,promiseInviteId:i.promiseInviteId,backTitle:i.productName,inviteAmount:i.inviteAmount})">
            <div class="flex subitem">
              <div class="left">
                <img src="../../assets/found/luo.png" alt="">
                <p class="color_font-s f12">{{['今天','前天'][i.day]}}<br>收到履约邀请</p>
              </div>
              <div class="right">
                <p class="f20 color_font-s">我承诺，理财师{{i.userName}}</p>
                <h2 class="f48 color_font">赚取<span class="f12 color_font-s">约</span><span class="color_font-red f44">{{i.interest}}</span><span class="f12 color_font-s">元</span>{{i.productName}}收益</h2>
                <h3 class="f28 color_font"><span class="f20 color_font-s">立投 </span>{{i.bidName}}<span class="f20 color_font-s"> 剩余可投<{{i.amountWait | thousand}}</span></h3>
                <p class="f36">{{i.inviteAmount}}<span class="f20 color_font-s">元</span>{{i.annualizedRate}}%<span class="f20 color_font-s">历史年化</span>{{i.periodLength}}<span class="f20 color_font-s">{{['天','周','月','年'][i.periodUnit-1]}}</span></p>
              </div>
            </div>
            <p class="flex subitemBtn"><span class="color_main f28 ">现在购买</span></p>
          </li>
        </ul>
        <div class="nothing_found" v-else>
          <img src="../../assets/common/nothing_found.png" alt="">
          <p class="f24">暂无履约记录</p>
        </div>
      </div>
    </div>
    <!--平台活动-->
    <!--<div class="item act">-->
    <!--<h2 class="subtitle f28 color_font-s">更多优惠等你参与</h2>-->
    <!--<h3  class="title color_font flex">平台活动-->
    <!--<div class="flex">-->
    <!--<span class="f28 color_main">更多</span>-->
    <!--<img src="../../assets/common/arrow-right.png" alt="">-->
    <!--</div>-->
    <!--</h3>-->
    <!--<div class="con">-->
    <!--<ul>-->
    <!--<li class="flex">-->
    <!--<img src="../../assets/found/new.png" alt="" class="left">-->
    <!--<div class="right">-->
    <!--<h2 class="flex subitemBtn color_font f32">一项新手专项的活动<span class="color_main">去捧场</span></h2>-->
    <!--<p class="f20 color_font-s">这项活动的介绍这项活动的介绍这项活动的介绍这项活动 的介绍</p>-->
    <!--</div>-->
    <!--</li>-->
    <!--</ul>-->
    <!--</div>-->
    <!--</div>-->
    <!--展业良机-->
    <!--<div class="item opportunity">-->
    <!--<h2 class="subtitle f28 color_font-s">良机不好错过，抓紧时间去开发客户吧</h2>-->
    <!--<h3 class="title color_font flex">展业良机-->
    <!--<div class="flex">-->
    <!--<span class="f28 color_main">更多</span>-->
    <!--<img src="../../assets/common/arrow-right.png" alt="">-->
    <!--</div>-->
    <!--</h3>-->
    <!--<div class="con">-->
    <!--<ul>-->
    <!--<li class="flex">-->
    <!--<div class="left">-->
    <!--<img src="/" alt="" class="place-img">-->
    <!--<p class="color_font-s f20">张先生</p>-->
    <!--</div>-->
    <!--<div class="right">-->
    <!--<h2 class="flex"><span class="f52 color_font">10+万在投</span><span class="color_main f28">查看</span></h2>-->
    <!--<h3 class="flex"><span class="f32 color_font">3-6天内到期</span><p class="color_font-s f32">预计佣金 <span class="color_font-red">300+</span>元</p></h3>-->
    <!--</div>-->
    <!--</li>-->
    <!--</ul>-->
    <!--</div>-->
    <!--</div>-->
    <!--展业攻略-->
    <!--<div class="item raiders">-->
    <!--<h2 class="subtitle f28 color_font-s">告诉你如何有效拓展自己的业务</h2>-->
    <!--<h3 class="title color_font">展业攻略</h3>-->
    <!--<div class="con">-->
    <!--<p class="color_font-s f32">良机不好错过，抓紧时间去开发客户吧良机不 好错过，抓紧时间去开发客户吧</p>-->
    <!--</div>-->
    <!--</div>-->
    <Gift :data="giftData" v-if="gift_visible" />
    <!--<p class="RiskTips">————<i>出借有风险，选择需谨慎</i>————</p>-->
  </div>
</template>

<script>
  import Gift from '@/components/gift/gift'
  import {
    getPromiseInviteList,
    searchGiveCouponList,
    getPossibleInviteList,
    searchMyManagerUserInfo
  } from '@/service'
  export default {
    name: 'found',
    data() {
      return {
        gift_visible: false,
        giftData: {},
        item: {},
        realName: ''
      }
    },
    components: {
      Gift,
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        Promise.all([searchGiveCouponList({
          source: '2'
        }), getPromiseInviteList()]).then(r => {
          const [coupon, promise] = r;
          this.item = {
            coupon,
            promise
          };
        }).then(() => {
          searchMyManagerUserInfo({
            filter_msg: 1
          }).then(r => {
            this.realName = r.realName
          });
        })
      }
    },
    watch: {}
  }
</script>

<style lang="sass" scoped>
  .found
    min-height: 100vh
    .item
      margin: .4rem .2rem
      background: #fff
      padding: .4rem
      border-radius: .2rem
      .subitemBtn
        margin-top: .3rem
        span
          padding: .1rem
          background: #f0f0f8
          border-radius: .2rem
      .con
        margin: .78rem auto
      .title
        img
          padding-left: .2rem
        margin-top: .12rem
        font-size: .52rem
      img
        height: .34rem
    .mygift
      .con
        overflow-x: auto
      ul
        padding-left: .96rem
        li
          /*&:not(:first-child)*/
            /*transform: scale(.8)*/
          float: left
          padding-top: 2.9rem
          text-align: center
          height: 5.12-2.9rem
          width: 4.38rem
          background: url("../../assets/found/gift.png") no-repeat center center
          background-size: 100% 100%
          p
            line-height: .36rem
            color: rgba(255,255,255,.8)
            span
              display: block
            &:last-child
              padding-top: .15rem
    .promise
      .nothing_found
        text-align: center
        img
          height: 4.86rem
      ul
        li
          padding: .4rem 0
          &:last-child
            padding-bottom: 0
          &:first-child
            padding-top: 0
          .subitemBtn
            justify-content: flex-end
          .subitem
            align-items: flex-start
            .left
              text-align: center
              width: 1rem
              p
                line-height: .28rem
              img
                width: .72rem
                height: .78rem
            .right
              padding-left: .22rem
              flex: 1
              p:first-child
                padding-bottom: .24rem
              h2
                line-height: .4rem
                padding-bottom: .18rem
              h3
                padding-bottom: .24rem
              p:last-child
                color: #1C1C1C
    .act
      ul
        li
          .left
            width: .72rem
            height: .77rem
          .right
            flex: 1
            padding-left: .46rem
            h2
              margin-bottom: .24rem
            p
              line-height: .28rem
    .opportunity
      .left
        width: .72rem
        padding-right: .48rem
        img
          width: .72rem
          height: .72rem
      .right
        flex: 1
        h2
          margin-bottom: .4rem
    .raiders
      p
        line-height: .44rem
  .RiskTips
    margin: 1.06rem 0 0.98rem
    height: 0.84rem
    text-align: center
    line-height: 0.24rem
    font-size: 0.24rem
    color: #B6B2B2
    i
      font-style: inherit
      margin: 0 0.2rem
</style>

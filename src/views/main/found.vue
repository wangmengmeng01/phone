<template>
  <div class="found">
    <!--我的礼物-->
    <div class="item mygift">
      <h2 class="subtitle f28 color_font-s">理财师 赵一 送我的3个礼物</h2>
      <h3 class="title color_font flex">我的礼物
        <div class="flex">
          <span class="f28 color_main">更多</span>
          <img src="../../assets/common/arrow-right.png" alt="">
        </div>
      </h3>
      <div class="con">
        <ul>
          <li>
            <p class="f26"><span>收到礼物</span>赶快领取您的福利吧</p>
            <p class="f20">2018.01.01收到～2018.06.30失效</p>
          </li>
        </ul>
      </div>
    </div>
    <!--履行承诺-->
    <div class="item promise">
      <h2 class="subtitle f28 color_font-s">一诺千金，奋争到底</h2>
      <h3  class="title color_font flex">履行承诺
        <div class="flex">
          <span class="f28 color_main">更多</span>
          <img src="../../assets/common/arrow-right.png" alt="">
        </div>
      </h3>
      <div class="con">
        <ul>
          <li class="border-notend-b">
            <div class="flex subitem">
              <div class="left">
                <img src="../../assets/found/luo.png" alt="">
                <p class="color_font-s f12">今天<br>收到履约邀请</p>
              </div>
              <div class="right">
                <p class="f20 color_font-s">我承诺，理财师赵一</p>
                <h2 class="f48 color_font">赚取<span class="f12 color_font-s">约</span><span class="color_font-red f44">5,000</span><span class="f12 color_font-s">元</span>月月赢收益</h2>
                <h3 class="f28 color_font"><span class="f20 color_font-s">立投 </span>月月赢-12M500G号<span class="f20 color_font-s"> 剩余可投<5万</span></h3>
                <p class="f36">50,000.00<span class="f20 color_font-s">元</span>9.6%<span class="f20 color_font-s">历史年化</span>50<span class="f20 color_font-s">周</span></p>
              </div>
            </div>
            <p class="flex subitemBtn"><span class="color_main f28 ">现在购买</span></p>
          </li>
        </ul>
      </div>
    </div>
    <!--平台活动-->
    <div class="item act">
      <h2 class="subtitle f28 color_font-s">更多优惠等你参与</h2>
      <h3  class="title color_font flex">平台活动
        <div class="flex">
          <span class="f28 color_main">更多</span>
          <img src="../../assets/common/arrow-right.png" alt="">
        </div>
      </h3>
      <div class="con">
        <ul>
          <li class="flex">
            <img src="../../assets/found/new.png" alt="" class="left">
            <div class="right">
              <h2 class="flex subitemBtn color_font f32">一项新手专项的活动<span class="color_main">去捧场</span></h2>
              <p class="f20 color_font-s">这项活动的介绍这项活动的介绍这项活动的介绍这项活动 的介绍</p>
            </div>
          </li>
          <li class="flex">
            <img src="../../assets/found/hot.png" alt="" class="left">
            <div class="right">
              <h2 class="flex subitemBtn color_font f32">一项平台力荐的活动<span class="color_main">去捧场</span></h2>
              <p class="f20 color_font-s">这项活动的介绍这项活动的介绍这项活动的介绍这项活动 的介绍</p>
            </div>
          </li>
          <li class="flex">
            <img src="../../assets/found/zan.png" alt="" class="left">
            <div class="right">
              <h2 class="flex subitemBtn color_font f32">一项参与热度最高的活动<span class="color_main">去捧场</span></h2>
              <p class="f20 color_font-s">这项活动的介绍这项活动的介绍这项活动的介绍这项活动 的介绍</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--展业良机-->
    <div class="item opportunity">
      <h2 class="subtitle f28 color_font-s">良机不好错过，抓紧时间去开发客户吧</h2>
      <h3 class="title color_font flex">展业良机
        <div class="flex">
          <span class="f28 color_main">更多</span>
          <img src="../../assets/common/arrow-right.png" alt="">
        </div>
      </h3>
      <div class="con">
        <ul>
          <li class="flex">
            <div class="left">
              <img src="/" alt="" class="place-img">
              <p class="color_font-s f20">张先生</p>
            </div>
            <div class="right">
              <h2 class="flex"><span class="f52 color_font">10+万在投</span><span class="color_main f28">查看</span></h2>
              <h3 class="flex"><span class="f32 color_font">3-6天内到期</span><p class="color_font-s f32">预计佣金 <span class="color_font-red">300+</span>元</p></h3>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--展业攻略-->
    <div class="item raiders">
      <h2 class="subtitle f28 color_font-s">告诉你如何有效拓展自己的业务</h2>
      <h3 class="title color_font">展业攻略</h3>
      <div class="con">
        <p class="color_font-s f32">良机不好错过，抓紧时间去开发客户吧良机不 好错过，抓紧时间去开发客户吧</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'found',
    data() {
      return {
      }
    },
    created() {
    },
    methods: {
    },
    watch: {
    }
  }
</script>

<style lang="sass" scoped>
  .found
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
        margin-top: .12rem
        font-size: .52rem
      img
        height: .34rem
    .mygift
      ul
        li
          padding-top: 2.8rem
          text-align: center
          height: 5.12-2.8rem
          width: 4.38rem
          background: url("../../assets/found/gift.png") no-repeat center center
          background-size: 100% 100%
          p
            line-height: .36rem
            color: #fff
            span
              display: block
            &:last-child
              padding-top: .28rem
    .promise
      ul
        li
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
</style>

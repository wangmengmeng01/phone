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
            <p><span>收到礼物</span>赶快领取您的福利吧</p>
            <p>2018.01.01收到～2018.06.30失效</p>
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
          <li>

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
          <li></li>
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
          <li></li>
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
      .title
        margin-top: .12rem
        font-size: .52rem
      img
        width: .34rem
        height: .34rem
    .mygift
      li
        height: 5.12rem
        width: 4.38rem
        background: url("../../assets/found/gift.png") no-repeat center center
        background-size: 100% 100%
</style>

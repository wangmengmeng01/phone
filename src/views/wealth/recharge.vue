<template>
  <div class="recharge">
    <div class="top">
      <img src="../../assets/common/contacts.png">
      <div class="topRight">
        <div class="TRTop"><span>招商银行</span><em>快捷支付</em></div>
        <p>6214*********0891</p>
      </div>
    </div>
    <div class="rechargeLimit">单笔限额1000元，每日限额1000元</div>
    <div class="center">
      <div class="centerTop">充值金额</div>
      <div class="centerC"><span>¥</span><input type="text" placeholder="100元起"></div>
      <div class="centerB"><span>账户余额</span><em>0.00元</em></div>
    </div>
    <div class="bottom">
      <div class="bottomTop">银行预留手机号<span>183****5642</span></div>
      <div class="bottomB">
        <input type="text" placeholder="请输入短信验证码">
        <div class="getCode">获取短信验证码</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'recharge',
    data() {
      return{
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

<style lang="stylus" scoped>
  i,em{font-style: normal;}
  .hide{
    display: none;
  }

  .recharge
    .top
      height 2.28rem
      background #ffffff
      margin-top 0.4rem
      display flex
      padding 0 0.4rem
      img
        width 0.96rem
        height 0.96rem
        margin auto 0
      .topRight
        flex 1
        color #181818
        margin-left 0.34rem
        p
          font-size 0.44rem
          margin-top 0.32rem
        .TRTop
          font-size 0.36rem
          margin-top 0.6rem
          em
            width:1rem;
            height:0.32rem;
            padding 0 0.1rem
            border-radius: 0.04rem ;
            font-size 0.2rem
            color #3299D1
            line-height 0.32rem
            text-align center
            border 1px solid #3299D1
            position relative
            left 0.2rem
            top -0.06rem
          span
            font-size 0.36rem


    .rechargeLimit
      color #8D8D94
      font-size 0.28rem
      text-align center
      margin-top 0.34rem
    .center
      height 3.92rem
      background #ffffff
      padding 0 0.4rem
      margin-top 0.6rem
      .centerTop
        font-size 0.32rem
        text-align left
        padding-top 0.4rem
        color #8D8D94
      .centerC
        display flex
        border-bottom  1px solid #CDCED3
        height 1.42rem
        span
          font-size 0.56rem
          color #181818
          display inline-block
          height 1.1rem
          line-height 1.1rem
          margin-top 0.16rem
        input
          font-size 0.36rem
          height 1.1rem
          line-height 1.1rem
          width 3.36rem
          margin-top 0.1rem
          text-indent 0.2rem
      .centerB
        display flex
        font-size 0.28rem
        justify-content space-between
        padding-top 0.4rem
        span
          color #8D8D94
        em
          color #F36E71
    .bottom
      height 3.34rem
      padding 0 0.4rem
      background #ffffff
      margin-top 0.4rem
      font-size 0.32rem
      .bottomTop
        padding-top 0.4rem
        color #8D8D94
        span
          color #181818
          display inline-block
          text-indent 0.2rem
      .bottomB
        display flex
        justify-content space-between
        margin-top 0.82rem
        border-bottom 1px solid #CDCED3
        padding-bottom 0.3rem
        input
          font-size 0.32rem
        .getCode
          height 0.52rem
          line-height 0.52rem
          text-align center
          color #3299D1
          font-size 0.28rem
          background rgba(240,240,248,1)
          border-radius 0.32rem
          width 2.46rem

</style>

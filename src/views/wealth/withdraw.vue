<template>
  <div class="withdraw">
    <div class="top">
      <img src="../../assets/common/contacts.png">
      <div class="topRight">
        <div class="TRTop"><span>{{cardMes.bankName}}</span><em>快捷支付</em></div>
        <p>{{cardMes.bankCardNo}}</p>
      </div>
    </div>
    <div class="rechargeLimit">预计到账时间T+1工作日，节假日顺延</div>
    <div class="withdrawTips">该时间为平台预估时间，具体以实际到账时间为准</div>
    <div class="center">
      <div class="centerTop">提现金额</div>
      <div class="centerC"><span>¥</span><input type="text" placeholder="100元起"><div class="wall">全提</div></div>
      <div class="centerB"><span>账户余额</span><em>0.00元</em></div>
      <div class="centerB"><span>可提现余额</span><em>0.00元</em></div>
    </div>
    <div class="bottom">
      <div class="bottomB"><span>手续费</span><em>0.00元</em></div>
      <div class="bottomB"><span>实际到账</span><em>0.00元</em></div>
    </div>
  </div>
</template>

<script>
	import { selectBeforeRecharge, rechargeSendSmsCode, submitUserRecharge } from '@/service'
	import { mapGetters, mapMutations } from 'vuex'
  export default {
    name: 'withdraw',
    data() {
      return{
			cardMes: {}, //银行卡信息
      }
    },
    created() {
    	
    	selectBeforeRecharge().then(res => {
			this.cardMes = res;

			this.itemSms.mobile = res.mobile;
			this.itemSms.bankCardNo = res.bankCardNo;
			this.singleMoney = res.singleTransQuota;
			this.dayMoney = res.cardDailyTransQuota;

		});
    	
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

  .withdraw
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
    .withdrawTips
      font-size 0.24rem
      color #8D8D94
      text-align center
      margin-top 0.2rem
    .center
      height 4.52rem
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
        position relative
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
        .wall
          width 1.32rem
          height 0.52rem
          background rgba(240,240,248,1)
          border-radius: 0.32rem
          font-size 0.32rem
          color #3299D1
          line-height 0.52rem
          text-align center
          position absolute
          right 0
          top 0.42rem
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
      height 2.44rem
      padding 0 0.4rem
      background #ffffff
      margin-top 0.4rem
      font-size 0.32rem
    .bottomB
      display flex
      font-size 0.32rem
      justify-content space-between
      padding-top 0.4rem
      span
        color #181818
      em
        color #F36E71
</style>

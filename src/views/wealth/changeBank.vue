<template>
  <div class="changeBank">
    <div class="top">
      <img src="../../assets/common/contacts.png">
      <div class="topRight">
        <div class="TRTop"><span>{{cardMes.bankName}}</span><em>快捷支付</em></div>
        <p>{{cardMes.bankCardNo|hideBankNum}}</p>
      </div>
    </div>
    <div class="bankInfo">
      <div class="border"></div>
      <div class="bankITop">
        <div>持卡人姓名</div>
        <div>{{cardMes.realName|nameDesensitization}}</div>
      </div>
      <div class="bankIBottom">
        <div>手机号</div>
        <div>{{cardMes.mobile|desensitization}}</div>
      </div>
    </div>
    <div class="bottom">
      <div class="bottomTop">银行预留手机号<span>{{cardMes.mobile|desensitization}}</span></div>
      <div class="bottomB">
        <input type="tel" maxlength="6" oninput="if( ! /^-?\d+\.?\d{0,2}$/.test(this.value)){ var s = this.value;this.value=s.substring(0,s.length-1);}" v-model="rebindSms" placeholder="请输入短信验证码">
        <div class="getCode" @click="sendMess" :class="click_code?'disableBtn':''">{{codeText}}</div>
      </div>
    </div>
    <p class="rebind" @click="submit" :class="[rebindSms.length==6?'':'disable']">下一步</p>
  </div>
</template>

<script>
  import {
    selectBeforeRecharge,
    rechargeSendSmsCode
  } from '@/service'
  import {
    mapMutations
  } from 'vuex'
  export default {
    name: 'changeBank',
    data() {
      return {
        cardMes: '', //银行卡信息
        smsSeq: '', //短信校验码
        itemSms: {
          busiType: 'rebind',
          smsTempType: 'O',
        }, //发送短信参数
        click_code: false, // 短信按钮能否点击
        codeText: '获取短信验证码', // 获取验证码提示
        num: 60, // 验证码倒计时
        rebindSms: '', //短信验证码
      }
    },
    created() {
      selectBeforeRecharge().then(res => {
        this.cardMes = res;
        this.itemSms.bankCardNo = res.bankCardNo;
        this.itemSms.mobile = res.mobile;
      });
      this.RESET('bindCard');
    },
    methods: {
      ...mapMutations([
        'RESET',
        'SET_BINDCARD',
      ]),
      sendMess() {
        this.smsSeq = '';
        rechargeSendSmsCode(this.itemSms).then(res => {
          if (res.code == "100") {
            this.$toask('短信验证码已发送');
            this.smsSeq = res.result.smsSeq;
  
            this.countdown();
  
          } else if (res.code == "1000") {
            this.$go('/login');
          } else {
            this.$toask(res.message);
          }
  
        });
      },
  
      /**
       * 倒计时
       */
      countdown() {
        this.click_code = !this.click_code;
        let time = setInterval(() => {
          this.num--;
          if (this.num < 0) {
            clearInterval(time);
            this.click_code = !this.click_code;
            this.codeText = '获取短信验证码';
            this.num = 60;
            return
          }
          this.codeText = `发送(${this.num})`;
        }, 1000)
      },
  
      submit() {
        this.$go('/changeBank2');
        this.SET_BINDCARD({
          "realName": this.cardMes.realName,
          "cardNumber": this.cardMes.cardNumber,
          "orgSmsCode": this.rebindSms,
          "orgSmsSeq": this.smsSeq
  
        });
  
  
      },
  
  
    },
    watch: {}
  }
</script>

<style lang="stylus" scoped>
  i,em{font-style: normal;}
   .disableBtn{
  	pointer-events: none;
  }
  .hide{
    display: none;
  }

  .changeBank
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

  .bankInfo
    overflow hidden
    height 2.44rem
    background #ffffff
    font-size 0.32rem
    padding 0 0.4rem
    .bankITop,.bankIBottom
      display flex
      justify-content space-between
      color #8D8D94
      margin-top 0.36rem
      div:nth-child(2)
        color #181818
  .border
    height 1px
    background #CDCED3
    
.rebind {
	margin: 0 auto;
	padding: 0;
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	width: 7.5rem;
	height: 1.1rem;
	overflow: hidden;
	line-height: 1.1rem;
	font-size: 0.36rem;
	text-align: center;
	background-color: #3299D1;
	color: #FFFFFF;
}  
.disable {
	background: #98cceb;
}
</style>

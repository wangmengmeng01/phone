<template>
  <div class="recharge">
    <!--<div class="top">
      <img src="../../assets/common/contacts.png">
      <div class="topRight">
        <div class="TRTop"><span></span><em>快捷支付</em></div>
        <p></p>
      </div>
    </div>
    <div class="rechargeLimit">单笔限额元，每日限额元</div>
    <div class="center">
      <div class="centerTop">充值金额</div>
      <div class="centerC"><span>¥</span><input type="text" ></div>
      <div class="centerB"><span>账户余额</span><em>元</em></div>
    </div>
    <div class="bottom">
      <div class="bottomTop">银行预留手机号<span></span></div>
      <div class="bottomB">
        <input type="tel" oninput="if( ! /^-?\d+\.?\d{0,2}$/.test(this.value)){ var s = this.value;this.value=s.substring(0,s.length-1);}" maxlength="6" v-model="rechargeSms" placeholder="请输入短信验证码">
        <div >{{codeText}}</div>
      </div>
    </div>
    <p class="rechargeBtn ">下一步</p>-->
    
     <div class="recharge-bank">
    		<p class="f28 p1"> <img class="logo" :src="require(`../../assets/wealth/whiteLogo/${bankNo}.png`)"/> <span>{{cardMes.bankName}}</span> <img class="img1" src="../../assets/wealth/kjzf.png"/></p>
    		<p class="f48 p2 center">{{cardMes.bankCardNo|hideBankNum}}</p>
    </div>
    <p class="recharge-tips f28">单笔限额{{cardMes.singleTransQuota/10000}}万元，每日限额{{cardMes.cardDailyTransQuota/10000}}万元</p>
    
    <p class="recharge-div borderB f28 color_font-36">
    		<span class="recharge-div-s1">可用余额(元)</span>
    		<span class="recharge-div-s2">{{cardMes.availableAmount|tofixed2}}</span>
    </p>
    <p class="recharge-div borderB f28 color_font-36">
    		<span class="recharge-div-s1">充值金额(元)</span>
    		<input type="tel" class="recharge-div-s2 f28 input" name="" id=""maxlength="10" oninput="if( ! /^-?\d+\.?\d{0,2}$/.test(this.value)){ var s = this.value;this.value=s.substring(0,s.length-1);}" v-model="rechargeMoney" placeholder="请输入充值金额" />
    </p>
     <p class="recharge-div borderB f28 color_font-36">
    		<span class="recharge-div-s1">银行预留手机</span>
    		<span class="recharge-div-s2">{{cardMes.mobile|desensitization}}</span>
    </p>
     <p class="recharge-div borderB f28 color_font-36">
    		<span class="recharge-div-s1">验证码</span>
    		<input type="tel" class="recharge-div-s4 f28 input" oninput="if( ! /^-?\d+\.?\d{0,2}$/.test(this.value)){ var s = this.value;this.value=s.substring(0,s.length-1);}" maxlength="6" v-model="rechargeSms" placeholder="请输入短信验证码">
   		<span class="recharge-div-s5 f28" @click="sendMess" :class="click_code?'disableBtn':''">{{codeText}}</span>
     </p>
    
    
    <button class="btn recharge-btn" @click="submit" :class="[(rechargeMoney.length && rechargeSms.length==6)?'':'dis' ]">确定</button>
    
    
    
  </div>
</template>

<script>
  import {
    selectBeforeRecharge,
    rechargeSendSmsCode,
    submitUserRecharge
  } from '@/service'
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  export default {
    name: 'recharge',
    data() {
      return {
      	bankNo:100,
        cardMes: {}, //银行卡信息
        singleMoney: 0, //单次限额
        dayMoney: 0, //单日限额
        rechargeMoney: '', //充值金额
        rechargeSms: '', //短信验证码
        codeText: '获取验证码', // 获取验证码提示
        num: 60, // 验证码倒计时
        click_code: false, // 短信按钮能否点击
        smsSeq: '', //短信校验码
        itemSms: {
          busiType: 'recharge',
          smsTempType: '',
        }, //发送短信参数
        rechargeItem: {
          gateBusiId: 'QP',
        } //充值参数
  
      }
    },
    created() {
  
      selectBeforeRecharge().then(res => {
        this.cardMes = res;
  		this.bankNo=parseInt( this.cardMes.bankNo);
        this.itemSms.mobile = res.mobile;
        this.itemSms.bankCardNo = res.bankCardNo;
        this.singleMoney = res.singleTransQuota;
        this.dayMoney = res.cardDailyTransQuota;
  
      });
    },
    methods: {
      ...mapMutations([
        'SET_SUCC_PAGE'
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
            this.codeText = '获取验证码';
            this.num = 60;
            return
          }
          this.codeText = `发送(${this.num})`;
        }, 1000)
      },
  
      submit() {
  
        if (!this.rechargeMoney) {
          this.$toask('充值金额不能为空');
          return;
        }
  
        if (this.rechargeMoney < 100) {
          this.$toask('充值金额不能小于100元');
          return;
        }
  
        if (this.rechargeMoney > this.singleMoney) {
          this.$toask('充值金额大于单笔限额');
          return;
        }
  
        if (!this.rechargeSms) {
          this.$toask('短信验证码不能为空');
          return;
        }
  
        this.rechargeItem.rechargeAmt = this.rechargeMoney;
        this.rechargeItem.bankSmsCode = this.rechargeSms;
        this.rechargeItem.bankSmsSeq = this.smsSeq;
        this.rechargeItem.bankSmsSeq = 'AAAAAAAA';
        submitUserRecharge(this.rechargeItem).then(res => {
          let params = {
            "title": "恭喜，充值成功",
            'sub_title': "您的资金已充至存管账户",
            "btn_text": "立即投资",
            "backurl": "/product",
            "sub_btn_text": "去账户中心查看",
            "sub_backurl": "/wealth"
          };
          this.SET_SUCC_PAGE(params);
          this.$go('/static/succ');
        });
  
      }
  
    },
    watch: {
  
      //		'rechargeMoney': function(val, oldval) {
      //
      //			console.log(oldval);
      //			console.log(val);
      //		}
  
    }
  }
</script>

<style lang="scss" scoped>
.recharge{
 	
  	&-bank{
  		margin: 0.24rem  .3rem  0;
  		width: 6.9rem;
  		height: 2.4rem;
		border-radius: 6px;
		color: #FFFFFF;
		background-image: linear-gradient( #FF7553 11%, #FB613B 100%);
		overflow: hidden;
		.p1{
			float: left;
			margin: .38rem 0 .44rem .54rem;
			line-height: .48rem;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.logo{
				width: .48rem;
				height: .48rem;
				background-size: 100% 100%;
				
			}
			.img1{
				width: 1.12rem;
				height: .36rem;
				background-size: 100% 100%;
			}
			span{
				margin: 0 .2rem;
			}
			
		}
		.p2{
			float: left;
			margin-bottom: .44rem;
			width: 6.9rem;
		}
  	}
  	&-tips{
  		margin: 0.22rem  .3rem .4rem;
  		width:6.9rem;
  		line-height: .44rem;
  		color: #666666;
  		i{
  			font-style: inherit;
  			color: #FB613B;
  		}
  	}
  	&-div{
  		margin: 0 .3rem;
  		width: 6.9rem;
  		height: 1.0rem;
  		display: flex;
  		justify-content: flex-start;
  		align-items: center;
  		position: relative;
  		&-s1{
  			width: 2.26rem;
  			text-align: left;
  		}
  		&-s2{
  			width: 4.04rem;
  		}
  		&-s3{
  			width: .56rem;
  			color: #2170FF;
  		}
  		&-s4{
  			width: 2.70rem;
  		}
  		&-s5{
  			position: absolute;
  			top: 0.24rem;
  			right: 0;
  			width: 1.82rem;
  			color: #2170FF;
  			height: .52rem;
  			line-height: .52rem;
  			text-align: center;
  			border: 1px solid #2170FF;
  			border-radius: .52rem;
  		}
  		input{
  			border: none;
  			background-color: #fff;
  			text-align: left;
  			width: 4.04rem;
  		}
  	}
  	&-btn{
  		position: fixed;
  		z-index: 100;
  		left: 0;
  		right: 0;
  		bottom: .4rem;
  		margin: 0 .3rem;
  		width: 6.9rem;
  	}
  	.dis{
  		background-color: #E5E5E5;
  		pointer-events: none;
  	}
  	.disableBtn{
  		pointer-events: none;
  	}
  
 }
</style>

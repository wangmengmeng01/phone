<template>
	<div class="changeBank">
		<!--<div class="top">
      <img src="../../assets/common/contacts.png">
      <div class="topRight">
        <div class="TRTop"><span>{{cardMes.bankName}}</span><em>快捷支付</em></div>
        <p></p>
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
    -->
		<div class="changeBank pageCenter">
			<div class="changeBank-bank">
				<p class="f28 p1"> <img class="logo" :src="require(`../../assets/wealth/whiteLogo/${bankNo}.png`)" /> <span>{{cardMes.bankName}}</span> <img class="img1" src="../../assets/wealth/kjzf.png" /></p>
				<p class="f48 p2 center">**** **** **** {{cardMes.bankCardNo|hideBankNum2}}</p>
			</div>
			<p class="changeBank-tips f28">
				<span>温馨提示：</span>
				<span>1.大额充值建议网站操作</span>
				<span>2.七天之内进行过换绑卡，提现、充值、投资操作，不能换绑卡</span>
			</p>
			
			<p class="changeBank-phone f36 color_font-36 center">{{cardMes.mobile|desensitization}}</p>
			
			<p class="changeBank-div borderB f28 color_font-36 top">
		    		<span class="changeBank-div-s1">验证码</span>
		    		<input type="tel" class="changeBank-div-s4 f28 input" oninput="if( ! /^-?\d+\.?\d{0,2}$/.test(this.value)){ var s = this.value;this.value=s.substring(0,s.length-1);}" maxlength="6" v-model="rebindSms" placeholder="请输入短信验证码">
		   		<span class="changeBank-div-s5 f28" @click="sendMess" :class="click_code?'disableBtn':''">{{codeText}}</span>
		     </p>
			<button class="btn changeBank-btn"  :class="[rebindSms.length==6?'':'dis']"@click="submit">换绑卡</button>
		</div>

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
				bankNo:100,
				cardMes: '', //银行卡信息
				smsSeq: '', //短信校验码
				itemSms: {
					busiType: 'rebind',
					smsTempType: 'O',
				}, //发送短信参数
				click_code: false, // 短信按钮能否点击
				codeText: '获取验证码', // 获取验证码提示
				num: 60, // 验证码倒计时
				rebindSms: '', //短信验证码
			}
		},
		created() {
			selectBeforeRecharge().then(res => {
				this.cardMes = res;
				this.itemSms.bankCardNo = res.bankCardNo;
				this.itemSms.mobile = res.mobile;
				this.bankNo=parseInt(this.cardMes.bankNo);
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
					if(res.code == "100") {
						this.$toask('短信验证码已发送');
						this.smsSeq = res.result.smsSeq;

						this.countdown();

					} else if(res.code == "1000") {
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
					if(this.num < 0) {
						clearInterval(time);
						this.click_code = !this.click_code;
						this.codeText = '获取验证码';
						this.num = 60;
						return
					}
					this.codeText = `${this.num}`;
				}, 1000)
			},

			submit() {

				if(!this.rebindSms) {
					this.$toask('短信验证码不能为空!');
					return
				}

				this.SET_BINDCARD({
					"realName": this.cardMes.realName,
					"cardNumber": this.cardMes.cardNumber,
					"orgSmsCode": this.rebindSms,
					"orgSmsSeq": this.smsSeq
				});
				this.$go('/changeBank2');
			},

		},
		watch: {}
	}
</script>

<style lang="scss" scoped>
	.changeBank {
 	
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
  		span{
  			display: block;text-align: left;
  		}
  	}
  	&-phone{
  		margin: 1.2rem  0 .6rem 0;
  		line-height: .36rem;
  	}
  	.top{
  		border-top: 1px solid #E5E5E5;
  	}
  	&-div{
  		margin: 0 .3rem;
  		width: 6.9rem;
  		height: 1.0rem;
  		display: flex;
  		justify-content: flex-start;
  		align-items: center;
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
  		color: #9b9b9b;
  		border: 1px solid #9b9b9b;
  	}
  
 }
</style>
<template>
	<div class="bankDepository">

		<div class="bankDep bb">
			<p class="f32 ffl bankDep-Title"><span></span>银行存管系统上线，资金存管更合规</p>
			<p class="f28 ffl bankDep-Word">2017年7月，中赢金融平台正式接入银行资金存管系统，依托中国领先的零售精品银行为客户提供点对点资金存管服务，实现“独立专用账户，实时专款专用。”真正意义上保障出借人的利益和资金交易安全。</p>
			<img class="bankDep-group " src="../../assets/main/prod/Group4@2x.png" />
		</div>

		<div class="bankDep bb">
			<p class="f32  ffl bankDep-Title"><span></span>客户资金存管</p>
			<p class="f28  ffl bankDep-Word">每位出借人、借款人均在银行开设独立子账户，资金由银行全程存管，与中赢金融账户无任何从属或关联关系。<i>投资时</i>，资金直接从出借人账户划拨借款人账户，<i>还款时</i>，资金从借款人账户划拨出借人账户，杜绝平台在用户未授权情况下挪用资金的风险。</p>
		</div>

		<div class="bankDep">
			<p class="f32  ffl bankDep-Title"><span></span>资金交易存管</p>
			<p class="f28  ffl bankDep-Word">用户在开户环节，须通过短信、身份证、银行卡三重认证，交易时须在银行支付页面输入交易密码，确保资金操作时的身份真实性。网站与银行之间的信息传输全部采用SSL加密通道，确保用户信息的安全。</p>
		</div>

	</div>
</template>

<script>
	export default {

		name: 'bankDepository',

		data() {
			return {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.ffl {
		float: left;
		text-align: left;
	}
	
	.bb {
		border-bottom: 1px solid #E5E5E5;
	}
	
	.bankDepository {
		margin: 0 auto;
		padding: 0;
		width: 7.5rem;
		/*border-top: 1px solid rgba(0, 0, 0, 0.03);*/
		.bankDep {
			margin: 0 .3rem;
			width: 6.9rem;
			background-color: #FFFFFF;
			overflow: hidden;
			p>i {
				font-style: inherit;
				color: #3299D1;
			}
			&-Title {
				margin: 0.40rem 0 0.28rem;
				height: 0.32rem;
				width: 6.9rem;
				line-height: 0.32rem;
				span {
					float: left;
					width: .08rem;
					height: .32rem;
					background-color: #208AFF;
					margin-right: .1rem;
				}
			}
			&-Word {
				margin: 0 0 .42rem .18rem;
				line-height: 0.44rem;
				width: 6.72rem;
				text-align: justify;
				color: #666666;
			}
			&-group {
				margin: 0 0.1rem 0.4rem;
				width: 6.7rem;
				height: 3.76rem;
				background-size: 100% 100%;
			}
		}
	}
</style>
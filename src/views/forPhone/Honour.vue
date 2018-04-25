<template>
	<div class="Honour">
	
		<div class="bankDep">
			<img class="bankDep-group" src="../../assets/main/prod/Group@2x.png" />
			<p class="bankDep-t">历史兑付</p>
		</div>
	
		<div class="bankDep">
			<p class="f36 color-font ffl bankDep-Title">风控保障，出借安全</p>
			<p class="f24 color-font ffl bankDep-Word">中赢金融平台通过目前市场上仅有的超过500万人次真实信贷数据校验过的风控模型——海量@风控技术全面的保护了出借者利益。</p>
		</div>
		<div class="bankDep">
			<p class="f36 color-font ffl bankDep-Title">技术保障，信息安全</p>
			<p class="f24 color-font ffl bankDep-Word">中赢金融平台采用国际领先MD5加密技术，并由专业团队7*24小时严密监控，实现存储安全、数据安全、隐私安全，真正做到全方位保护用户信息安全。</p>
		</div>
		<div class="bankDep">
			<p class="f36 color-font ffl bankDep-Title">资产充沛，极致分散</p>
			<p class="f24 color-font ffl bankDep-Word">丰富的小微信用借款(件均8000)，车辆抵押借款，融资租凭收益权等。借款人的每一笔出借通过系统实时匹配交易技术，将资金持续、自动地分散到大量贷款标的，有效减少风险。</p>
		</div>
	
	</div>
</template>

<script>
	export default {
	
		name: 'Honour',
	
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
	
	.Honour {
		margin: 0 auto;
		padding: 0;
		width: 7.5rem;
		margin-top: 0.4rem;
		.bankDep {
			padding: 0 0.37rem 1.0rem;
			width: 6.76rem;
			margin-top: 0.4rem;
			background-color: #FFFFFF;
			overflow: hidden;
			p>i {
				font-style: inherit;
				color: #3299D1;
			}
			&-Title {
				margin: 0.58rem 0 0.4rem;
				height: 0.36rem;
				width: 6.76rem;
				line-height: 0.36rem;
			}
			&-Word {
				line-height: 0.36rem;
				width: 6.76rem;
			}
			&-group {
				margin: 0.6rem 2.34rem 0;
				width: 2.08rem;
				height: 2.08rem;
				background-size: 100% 100%;
			}
			&-t {
				margin-top: 0.4rem;
				text-align: center;
				line-height: 0.36rem;
				height: 0.36rem;
				font-size: 0.36rem;
				color: #8D8D94;
			}
		}
	}
</style>
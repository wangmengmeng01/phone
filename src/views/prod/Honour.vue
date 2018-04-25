<template>
	<div class="Honour">
	
		<div class="bankDep">
			<img class="bankDep-group" src="../../assets/main/prod/Group@2x.png" />
			<p class="bankDep-t">100%历史兑付</p>
		</div>
	
		<div class="bankDep">
			<p class="f32 color-font ffl bankDep-Title">风控保障，出借安全</p>
			<img class="bankDep-img" src="../../assets/main/prod/g1.png"/>
			<p class="f28  ffl bankDep-Word">中赢金融平台通过目前市场上仅有的超过500万人次真实信贷数据校验过的风控模型——海量@风控技术全面的保护了出借者利益。</p>
		</div>
		<div class="bankDep">
			<p class="f32 color-font ffl bankDep-Title">技术保障，信息安全</p>
			<img class="bankDep-img" src="../../assets/main/prod/g2.png"/>
			<p class="f28  ffl bankDep-Word">中赢金融平台采用国际领先MD5加密技术，并由专业团队7*24小时严密监控，实现存储安全、数据安全、隐私安全，真正做到全方位保护用户信息安全。</p>
		</div>
		<div class="bankDep">
			<p class="f32 color-font ffl bankDep-Title">资产充沛，极致分散</p>
			<img class="bankDep-img"  src="../../assets/main/prod/g3.png"/>
			<p class="f28  ffl bankDep-Word">丰富的小微信用借款(件均8000)，车辆抵押借款，融资租凭收益权等。借款人的每一笔出借通过系统实时匹配交易技术，将资金持续、自动地分散到大量贷款标的，有效减少风险。</p>
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
		/*border-top: 1px solid rgba(0, 0, 0, 0.03);*/
		
		.bankDep {
			width: 7.5rem;
/*			margin-top: 0.4rem;*/
			background-color: #FFFFFF;
			overflow: hidden;
			&-img{
			float: left;
			margin: 0 .24rem 0 .3rem;
			width: .86rem;
			height: .80rem;
			background-size: 100% 100%;
			}
			p>i {
				font-style: inherit;
				color: #3299D1;
			}
			&-Title {
				margin: .6rem  0.3rem .42rem ;
				height: 0.32rem;
				width: 6.9rem;
				line-height: 0.32rem;
				color: #363636;
				
			}
			&-Word {
				float: left;
				line-height: 0.44rem;
				width: 5.8rem;
				text-align: justify;
				color: #666666;
			}
			&-group {
				margin: 0.56rem 2.28rem 0.3rem;
				width: 2.94rem;
				height: 1.5rem;
				background-size: 100% 100%;
			}
			&-t {
				margin: 0 0.3rem .2rem ;
				height: 0.36rem;
				width: 6.9rem;
				font-size: .36rem;
				line-height: 0.36rem;
				text-align: center;
				color: #4859AB ;
			}
		}
	}
</style>
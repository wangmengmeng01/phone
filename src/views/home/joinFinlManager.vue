<template>
	<div class="joinFM">
		<!--审核进度-->
		<div class="joinFMtop">
			<p class="joinFMp1"><span class="higSpan ml"></span><span></span><span class="boder"></span><span></span><span class="boder"></span></p>
			<p class="joinFMp2"><span>上传身份证</span><span>人工审核</span><span>完成加盟</span></p>
		</div>

		<!--上传身份证-->

		<div class="joinFMdiv">
			<p class="joinFMdivWord"><span>1</span>身份证正面</p>

			<p class="inputFile">
				<input type="file" name="" id="" value="" />
			</p>

		</div>

		<div class="joinFMdiv">
			<p class="joinFMdivWord"><span>2</span>身份证反面</p>

			<p class="inputFile">
				<input type="file" name="" id="" value="" />
			</p>

		</div>

		<!--阅读协议-->
		<div class="joinFMdiv h">
			<div class="pdcTitle">已阅读同意</div>

			<div class="checkAgreement">
				<p class="checkAgreementImg">
					<img src="../../assets/common/check_succ.png" />
					<input type="checkbox" class="checkInput" name="" id="" value="" />
				</p>
				<p class="agreement">《卓信理财师加盟协议》</p>
			</div>

		</div>

		<!--立刻购买-->
		<div class="productDetailBottom" @click="$go('/webapp/prod/buyBid',{bidNo:detail.bidNo,backTitle:'确认购买'})">
			申请加盟
		</div>
	</div>
</template>

<script>
	export default {

		name: 'joinFinlManager',

		data() {
			return {

			}
		}
	}
</script>

<style scoped>
	.joinFM {
		margin: 0 auto;
		padding: 0;
		width: 7.5rem;
		overflow: hidden;
	}
	
	.joinFMtop {
		float: left;
		padding: 0 0.4rem;
		width: 6.7rem;
		height: 1.2rem;
		font-size: 0.32rem;
		color: #8D8D94;
	}
	
	.joinFMp1 {
		margin: 0.4rem 0 0.16rem;
		width: 6.7rem;
		height: 0.28rem;
		overflow: hidden;
	}
	
	.joinFMp1>span:nth-child(1),
	.joinFMp1>span:nth-child(3),
	.joinFMp1>span:nth-child(5) {
		float: left;
		width: 0.28rem;
		height: 0.28rem;
		border-radius: 0.28rem;
	}
	
	.joinFMp1>span:nth-child(2),
	.joinFMp1>span:nth-child(4) {
		float: left;
		margin: 0.12rem 0.16rem;
		width: 1.8rem;
		height: 0.04rem;
		border-radius: 0.04rem;
		background: linear-gradient(to right, #8E9EAB, #EEF2F3);
	}
	
	.boder {
		border: 1px solid #8D8D94;
		box-sizing: border-box;
	}
	
	.higSpan {
		background-color: #3299D1;
		border: none;
	}
	
	.ml {
		margin-left: 0.84rem;
	}
	
	.joinFMp2 {
		width: 6.7rem;
		height: 0.36rem;
		line-height: 0.36rem;
		overflow: hidden;
	}
	
	.joinFMp2>span:nth-child(1) {
		float: left;
		width: 1.60rem;
		text-align: center;
		margin-left: 0.16rem;
	}
	
	.joinFMp2>span:nth-child(2) {
		float: left;
		width: 1.28rem;
		margin: 0 1.16rem 0 0.92rem;
	}
	
	.joinFMp2>span:nth-child(3) {
		float: left;
		width: 1.28rem;
	}
	
	.joinFMdiv {
		margin-top: 0.4rem;
		float: left;
		padding: 0 0.4rem;
		width: 6.7rem;
		height: 4.66rem;
		background-color: #FFFFFF;
		font-size: 0.28rem;
		color: #8D8D94;
		overflow: hidden;
	}
	
	.h {
		height: 1.76rem;
	}
	
	.joinFMdivWord {
		float: left;
		margin-top: 0.4rem;
		width: 6.7rem;
		height: 0.32rem;
		line-height: 0.32rem;
		overflow: hidden;
	}
	
	.joinFMdivWord>span {
		float: left;
		width: 0.32rem;
		height: 0.32rem;
		margin-right: 0.2rem;
		border: 1px solid #8D8D94;
		box-sizing: border-box;
		font-size: 0.24rem;
		border-radius: 0.32rem;
		text-align: center;
	}
	
	.inputFile {
		margin: 0.38rem 0 0 0.56rem;
		float: left;
		width: 5.6rem;
		height: 2.6rem;
		border: 1px dashed #8D8D94;
		box-sizing: border-box;
		overflow: hidden;
	}
	
	.inputFile>input {
		float: left;
		width: 5.6rem;
		height: 2.6rem;
	}
	
	.pdcTitle {
		margin-top: 0.4rem;
		height: 0.28rem;
		line-height: 0.28rem;
		text-align: left;
		font-size: 0.28rem;
	}
	
	.checkAgreement {
		margin-top: 0.36rem;
		height: 0.34rem;
		overflow: hidden;
	}
	
	.checkAgreementImg {
		float: left;
		width: 0.32rem;
		height: 0.32rem;
		margin: 0.01rem 0;
		position: relative;
	}
	
	.checkAgreementImg>img {
		position: absolute;
		left: 0;
		top: 0;
		width: 0.32rem;
		height: 0.32rem;
		background-size: 100% 100%;
	}
	
	.checkInput {
		position: absolute;
		width: 0.32rem;
		height: 0.32rem;
		left: 0;
		top: 0;
		opacity: 0;
	}
	
	.agreement {
		margin-left: 0.06rem;
		float: left;
		width: 6.30rem;
		font-size: 0.22rem;
		line-height: 0.34rem;
		text-align: left;
		color: #3299D1;
	}
	
	.productDetailBottom {
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
</style>
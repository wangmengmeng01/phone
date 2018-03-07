<template>
	<div>
		<div class="head flex"> </div>
		<div class="productDiv productDiv1">
			<div class="productDivDetial">
				<div class="pddTitle">
					<span class="pddTitleBidName">月月赢-12M500G号</span>
					<p class="pddTitleTips">
						<span>佣金1.5%</span>
						<span>30天锁定</span>
					</p>
				</div>
				<p class="productDivRate">10%</p>
				<p class="productDivWrod">历史年化</p>
				<div class="hotProductDivProgress">
					<div class="tipsImg">
						<img src="../../assets/main/home/tipsImg.png" /><span>48%</span>
					</div>
					<div class="redTipsImg">
						<p><i>5</i>万</p>
						<p>剩余不到</p>
					</div>
					<p class="grayLine"></p>
					<p class="proLine"></p>
					<p class="proTip"><i>120</i>人参与</p>
				</div>
				<p class="hotProductDivMessage">
					<span>起投金额 <i>1000元</i></span>
					<span>投资期限 <i>52</i>周</span>
					<span class="hotProductDivTitleBtn">购买</span>
				</p>
			</div>

		</div>

		<div class="productDiv productDiv2">
			<div class="productDivDetial">
				<div class="pddTitle">
					<span class="pddTitleBidName">月月赢-12M500G号</span>
					<p class="pddTitleTips">
						<span>佣金1.5%</span>
						<span>30天锁定</span>
					</p>
				</div>
				<p class="productDivRate">10%</p>
				<p class="productDivWrod">历史年化</p>
				<div class="hotProductDivProgress">
					<div class="tipsImg">
						<img src="../../assets/main/home/tipsImg.png" /><span>48%</span>
					</div>
					<div class="redTipsImg">
						<p><i>5</i>万</p>
						<p>剩余不到</p>
					</div>
					<p class="grayLine"></p>
					<p class="proLine"></p>
					<p class="proTip"><i>120</i>人参与</p>
				</div>
				<p class="hotProductDivMessage">
					<span>累计销售 <i>1000万</i></span>
					<span>累计收益 <i>102万</i></span>
					<span class="hotProductDivTitleBtn">购买</span>
				</p>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		name: 'productList',
		data() {
			return {}
		},
		created() {
//			var dd=document.getElementsByClassName("flex");
//			var ff=dd.getElementsByTagName("span");
//			console.log(ff.innerHTML)
			console.log(this.$route.query);
		},
		methods: {}
	}
</script>

<style scoped>
	.productDiv {
		margin: 0 auto;
		padding: 0;
		text-align: center;
		width: 7.1rem;
		background-color: #fff;
		border-radius: 0.2rem;
		overflow: hidden;
		background: rgba(255, 255, 255, 1);
		box-shadow: 5px 0px 4px 0px rgba(219, 219, 219, 0.5);
		border-radius: 20px;
	}
	
	.productDiv1 {
		margin-top: 0.4rem;
	}
	
	.productDiv2 {
		margin-top: 1.0rem;
	}
	
	.productDivTitle {
		margin: 0.4rem 0.4rem 0.18rem 0.4rem;
		width: 6.30rem;
		height: 0.52rem;
		overflow: hidden;
	}
	
	.productDivTitle>span:nth-child(1) {
		float: left;
		font-size: 0.52rem;
		text-align: left;
		margin-right: 0.16rem;
		color: #181818;
	}
	
	.productDivTitle>span:nth-child(2) {
		float: left;
		margin: 0.04rem 0;
		width: 1.4rem;
		height: 0.44rem;
		line-height: 0.40rem;
		border: 2px solid #FB6862;
		text-align: center;
		color: #FB6862;
		font-size: 0.28rem;
		border-radius: 4px;
		box-sizing: border-box;
	}
	
	.productDivTitle>span:nth-child(3) {
		float: right;
		line-height: 0.52rem;
		text-align: center;
		color: #3EB7F9;
		font-size: 0.28rem;
		overflow: hidden;
	}
	
	.productDivTitle>span:nth-child(3)>img {
		float: right;
		margin: 0.08rem 0.12rem;
		width: 0.2rem;
		height: 0.36rem;
	}
	
	.productDivTitleTips {
		margin: 0 0.4rem 0.34rem;
		width: 6.30rem;
		height: 0.44rem;
		overflow: hidden;
	}
	
	.tispImg {
		float: left;
		width: 1.24rem;
		height: 0.44rem;
		background: url(../../assets/main/prod/prodTipsImg.png) no-repeat 0 0;
		background-size: 100% 100%;
		text-align: center;
		line-height: 0.44rem;
		font-size: 0.28rem;
		color: #89C1FF;
	}
	
	.tispImg1 {
		float: left;
		width: 1.24rem;
		height: 0.44rem;
		text-align: center;
		line-height: 0.44rem;
		font-size: 0.28rem;
		color: #8D8D94;
	}
	
	.productDivTitleTips>span:nth-child(2) {
		float: left;
		margin-left: 0.12rem;
		line-height: 0.44rem;
		text-align: left;
		font-size: 0.28rem;
		color: #8D8D94;
	}
	
	.productDivDetial {
		float: left;
		overflow: hidden;
	}
	
	.pddTitle {
		float: left;
		margin: 0.56rem 0.4rem 0;
		width: 6.30rem;
		height: 0.32rem;
		overflow: hidden;
	}
	
	.pddTitleBidName {
		float: left;
		font-size: 0.32rem;
		line-height: 0.32rem;
		text-align: left;
		color: #181818;
		margin-right: 0.18rem;
	}
	
	.pddTitleTips {
		float: left;
		/*width: 3.0rem;*/
		height: 0.32rem;
		overflow: hidden;
	}
	
	.pddTitleTips>span {
		float: left;
		line-height: 0.26rem;
		font-size: 0.2rem;
		width: 1.0rem;
		height: 0.28rem;
		margin-top: 0.02rem;
		text-align: center;
		border: 1px solid #F41F1F;
		color: #F41F1F;
		box-sizing: border-box;
		border-radius: 2px;
		margin-right: 0.12rem;
	}
	
	.productDivRate {
		float: left;
		width: 6.3rem;
		margin: 0.52rem 0.4rem 0;
		height: 0.6rem;
		line-height: 0.6rem;
		font-size: 0.6rem;
		color: #F84740;
		text-align: left;
	}
	
	.productDivWrod {
		float: left;
		width: 6.3rem;
		margin-left: 0.4rem;
		line-height: 0.20rem;
		height: 0.20rem;
		text-align: left;
		font-size: 0.2rem;
		color: #8D8D94;
	}
	
	.hotProductDivProgress {
		float: left;
		margin: 0.28rem 0.4rem 0;
		width: 6.3rem;
		height: 0.28rem;
		position: relative;
	}
	
	.grayLine {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 5.0rem;
		height: 0.28rem;
		background-color: #F0EAF0;
	}
	
	.proLine {
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: 2;
		width: 2.8rem;
		height: 0.28rem;
		background: linear-gradient(to right, #8E9EAB, #EEF2F3);
	}
	
	.tipsImg {
		position: absolute;
		bottom: 0.20rem;
		left: 0.6rem;
	}
	
	.tipsImg>img {
		margin-left: -0.12rem;
		width: 0.24rem;
		height: 0.16rem;
		background-size: 100% 100%;
	}
	
	.tipsImg>span {
		margin-left: 0.05rem;
		color: #F84740;
		line-height: 0.32rem;
		font-size: 0.32rem;
	}
	
	.redTipsImg {
		position: absolute;
		z-index: 3;
		background: url(../../assets/main/home/redTipsImg.png) no-repeat 0 0;
		width: 0.92rem;
		height: 1.04rem;
		background-size: 100% 100%;
		bottom: 0.28rem;
		left: 3.0rem;
	}
	
	.redTipsImg>p:nth-child(1) {
		margin-top: 0.14rem;
		text-align: center;
		font-size: 0.24rem;
		color: #FFFFFF;
	}
	
	.redTipsImg>p:nth-child(1) i {
		font-style: inherit;
		font-size: 0.36rem;
	}
	
	.redTipsImg>p:nth-child(2) {
		margin-top: 0.03rem;
		font-size: 0.20rem;
		text-align: center;
		color: #FFFFFF;
	}
	
	.proTip {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 1.28rem;
		height: 0.28rem;
		text-align: right;
		font-size: 0.24rem;
		color: #8D8D94;
	}
	
	.proTip>i {
		font-style: inherit;
		color: #000;
	}
	
	.hotProductDivMessage {
		float: left;
		margin: 0.28rem 0.4rem 0.44rem 0.4rem;
		height: 0.48rem;
		width: 6.3rem;
		line-height: 0.48rem;
		font-size: 0.24rem;
		overflow: hidden;
		color: #8D8D94;
	}
	
	.hotProductDivMessage>span:nth-child(1) {
		float: left;
		width: 2.0rem;
		text-align: left;
	}
	
	.hotProductDivMessage>span:nth-child(2) {
		float: left;
		width: 2.24rem;
		text-align: center;
	}
	
	.hotProductDivMessage>span:nth-child(3) {
		float: right;
		width: 1.16rem;
		height: 0.48rem;
		line-height: 0.48rem;
		text-align: center;
		background-color: #F0F0F8;
		border-radius: 0.28rem;
		color: #3299D1;
		font-size: 0.24rem;
	}
	
	.hotProductDivMessage>span:nth-child(1) i {
		color: #000000;
		font-style: inherit;
	}
	
	.hotProductDivMessage>span:nth-child(2) i {
		color: #000000;
		font-style: inherit;
	}
	
	.bb {
		border-bottom: 4px solid #CDCED3;
		box-sizing: border-box;
	}
</style>
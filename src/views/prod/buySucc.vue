<template>
	<div class="buySucc">
		<img src="../../assets/common/succ.png" />
		<p class="f36 color_font ffl">恭喜，购买成功</p>
		<p class="f28 color_font-s ffl">您已成功购买了该标的</p>
		<p class="f36 ffl" @click="$go('/product')">继续购买其他标的</p>
		<p class="f28 ffl">查看我的资产</p>
	</div>
</template>

<script>
	export default {

		name: 'buySucc',

		data() {
			return {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.ffl {
		float: left;
		width: 7.5rem;
	}
	
	.buySucc {
		background-color: #FFFFFF;
		text-align: center;
		overflow: hidden;
		padding-top: 2.2rem;
		height: 100%;
		img {
			width: 1.52rem;
			height: 1.86rem;
			background-size: 100% 100%;
		}
		p:nth-child(2) {
			margin-top: 0.72rem;
			height: 0.36rem;
			line-height: 0.36rem;
			font-size: 0.36rem;
			color: #181818;
		}
		p:nth-child(3) {
			margin-top: 0.20rem;
			height: 0.28rem;
			line-height: 0.28rem;
		}
		p:nth-child(4) {
			margin: 1.2rem 1.35rem 0;
			height: 0.72rem;
			width: 4.8rem;
			line-height: 0.72rem;
			color: #FFFFFF;
			background-color: #3299D1;
			border-radius: 0.36rem;
		}
		p:nth-child(5) {
			margin-top: 0.4rem;
			height: 0.28rem;
			line-height: 0.28rem;
			color: #3299D1;
		}
	}
</style>
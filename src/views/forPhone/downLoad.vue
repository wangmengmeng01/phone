<template>
	<div class="downLoad">
		<div class="downLoadBG">
			<p class="f48 color-font">理财师APP</p>
			<p class="f36 color-font">安全投资、便捷加盟、高效拓客</p>

			<p class="f36 andriodLink"><img src="../../assets/main/forPhone/android.png" /><span>安卓下载</span>

				<a href="http://fdfs.chinazyjr.com:6230/group1/M00/13/26/rBACZlqqmiKAf8ReAGOBcPfkDJA716.apk"></a>
			</p>
			<p class="f36"> <img src="../../assets/main/forPhone/ios.png" /><span>IOS下载</span></p>

			<div class="tips">
				<div id="pp">因IOS版APP目前正在上架中，故暂时提供50个内测名额，请按如下操作： </div>
				<div id="pp">1、联系您的理财师，确认是否还有可用名额 </div>
				<div id="pp">2、将您iPhone的设备号，告知您的理财师</div>
				<div id="pp">3、等待理财师向您反馈内测APP下载二维码</div>
				<div id="pp">4、扫码下载内测APP并安装</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {

		name: 'downLoad',

		data() {
			return {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.downLoad {
		overflow: hidden;
	}
	
	p {
		text-align: center;
	}
	
	#pp {
		margin: 0;
		padding: 0;
		float: left;
		text-align: left;
		line-height: 0.34rem;
		font-size: 0.24rem;
		color: #FFFFFF;
	}
	
	.downLoadBG {
		float: left;
		width: 7.5rem;
		height: 16.24rem;
		background: url(../../assets/main/forPhone/downLoadBg.png) no-repeat 0 0;
		background-size: 100% 100%;
		position: relative;
		p:nth-child(1) {
			margin: 1.4rem 0 0.36rem;
		}
		p:nth-child(2) {
			margin-bottom: 0.74rem;
		}
		p:nth-child(3) {
			margin: 0 1.24rem 0.2rem 1.24rem;
			width: 5.02rem;
			height: 0.96rem;
			text-align: center;
			line-height: 0.96rem;
			border-radius: 0px 0px 4px 4px;
			background-color: #3299D1;
			color: #FFFFFF;
			overflow: hidden;
			position: relative;
			a {
				position: absolute;
				left: 0;
				top: 0;
				opacity: 0;
				width: 100%;
				height: 100%;
			}
		}
		p:nth-child(4) {
			margin: 0 1.24rem 0.2rem 1.24rem;
			width: 5.02rem;
			height: 0.96rem;
			text-align: center;
			line-height: 0.96rem;
			border-radius: 0px 0px 4px 4px;
			background-color: #7db6e3;
			color: #FFFFFF;
			pointer-events: none;
			overflow: hidden;
		}
		p>span {
			float: left;
		}
		img {
			width: 0.48rem;
			height: 0.48rem;
			float: left;
			margin: 0.24rem 0.15rem 0.24rem 1.5rem;
		}
		.tips {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 6.4rem;
			height: 2.12rem;
			background: url(../../assets/main/forPhone/tips@2x.png) no-repeat 0 0;
			background-size: 100% 100%;
			padding: 0.5rem 0.32rem 0.4rem 0.78rem;
			overflow: hidden;
		}
	}
</style>
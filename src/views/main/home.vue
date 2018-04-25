<template>
	<div class="home">
		<!-- 轮播图片 -->
		<div class="swiper-container swiper-container1">
			<div class="swiper-wrapper swiper-wrapper1">
				<div class="swiper-slide swiper-slide1"><img :src="require('@/assets/main/home/banner4.png')" alt=""></div>
				<div class="swiper-slide swiper-slide1"><img :src="require('@/assets/main/home/banner1.png')" alt=""></div>
				<div class="swiper-slide swiper-slide1"><img :src="require('@/assets/main/home/banner2.png')" alt=""></div>
			</div>
			<div class="swiper-pagination"></div>
			<!--<div class="swiper-button-next"></div>
   	        <div class="swiper-button-prev"></div>-->
		</div>
		<!-- 公告 -->
		<div class="indexNotice center">
			<img :src="require('@/assets/main/home/NEW@2x.png')" alt="">
			<p class="indexNoticeP">公告ABC123公告ABC123…</p>
			<span class="indexNoticeSpan">更多</span>
		</div>
		<!--关于我们 安全保障 运营数据 理财师加盟-->
		<div class="indexMessage center bottomBorder">
			<div  @click="$go('/home/aboutUs',{id:0,backTitle:'关于我们'})">
				<img :src="require('@/assets/main/home/yhcg.png')" alt="">
				<p class="f24">银行存管</p>
			</div>
			<div  @click="$go('/home/aboutUs',{id:1,backTitle:'安全保障',forNative:1})">
				<img :src="require('@/assets/main/home/aqbz.png')" alt="">
				<p class="f24">安全保障</p>
			</div>
			<div  @click="linkPage">
				<img :src="require('@/assets/main/home/jmlcs.png')" alt="">
				<p class="f24">理财师加盟</p>
			</div>
		</div>
		<!-- 新手专享 -->
		<div class="new bottomBorder">
			<p class="newTitle">新手专享</p>
			<div v-show="lineWrongBol">
				<div class="canvasDiv">
					<span class="perSpan" :style="{left:left,bottom:bottom}"></span>
					<div v-show="newBol" class="canvasDivMes">
						<p v-if="newList.amountWait>=10000">剩余{{newList.amountWait/10000}}万元</p>
						<p v-else>剩余{{newList.amountWait|formatNum}}元</p>
						<p><i>{{newList.annualizedRate|tofixed2}}</i>%<span v-show="newList.appendRate>0">+{{newList.appendRate|tofixed2}}%</span></p>
						<p>历史年化</p>
					</div>
					<div v-show="!newBol"  class="canvasDivMes">
						<p>剩余-,-元</p>
						<p><i>--</i><span>--</span></p>
						<p>历史年化</p>
					</div>
					
					<canvas id="canvas" width="" height=""></canvas>
				</div>
				<div v-show="newBol"  class="newBidMes">
					<p><img src="../../assets/main/home/time.png" />期限<i>{{newList.periodLength}}</i>{{newList.periodUnit|Totime}}</p>
					<p><img src="../../assets/main/home/money.png" />起投<i>{{newList.investMinAmount|formatNum}}</i>元</p>
				</div>
				<div v-show="!newBol"  class="newBidMes">
					<p><img src="../../assets/main/home/time.png" />期限<i>--</i>--</p>
					<p><img src="../../assets/main/home/money.png" />起投<i>--</i>元</p>
				</div>
				<p v-if="newBol" class="newBtn" @click="$go('/prod/productDetail',{bidNo:newList.bidNo,backTitle:newList.bidName})">立即投资</p>
				<p v-else class="newBtn disable">已售罄</p>
			</div>
			<div v-show="!lineWrongBol" class="line-wrong">
				<img src="../../assets/main/home/router@2x.png"/>
				<p>网络未连接，请检查网络设置</p>
				<span>刷新</span>
				<p>查看如何解决 ></p>
			</div>
		</div>
		<div class="recommend"   v-show="recomPro.length">
			<p class="newTitle">为您推荐 <span @click="$go('/product')">更多</span></p>
			<div class="recommendDiv bottomBorder"   v-for="(a,index) in hotPro" @click="$go('/prod/productDetail',{bidNo:a.bidNo,backTitle:a.bidName})">
				<p class="recommendDivTitle">{{a.bidName}}</p>
				<div class="bidMessage">
					<div>
						<p class="bidMesRate"><i>{{a.annualizedRate|tofixed2}}</i>%</p>
						<p class="bidMesP f24 color_font-99">历史年化</p>
					</div>
					<div>
						<p class="bidMesTime"><i>{{a.periodLength}}</i>{{a.periodUnit|Totime}}</p>
						<p v-if="a.amountWait>=10000" class="bidMesP f24 color_font-99">剩余{{a.amountWait/10000}}万元</p>
						<p v-else class="bidMesP f24 color_font-99">剩余{{a.amountWait|numfixed}}元</p>
					</div>
				</div>
			</div>
		</div>
		<!--<div class="recommend bottomBorder">
			<p class="newTitle">运营报告 <span>了解详情</span></p>
			<div class="yybgDiv">
				<div>
					<p><i>59.2</i>亿元</p>
					<p>累计管理和配置的置产规模</p>
				</div>
				<div>
					<p><i>1000</i>天</p>
					<p>公司安全运营时间</p>
				</div>
			</div>
			<p class="Timetips f24 color_font-99 center">数据统计截止至2018年2月28日</p>
		</div>-->
		<div class="recommend">
			<p class="xxpl" @click="$go('/home/aboutUs?id=2&backTitle=信息披露')"><img src="../../assets/main/home/xxpl.png" />信息披露</p>
			<p class="about" @click="$go('/home/aboutUs?id=0&backTitle=关于我们')"><img src="../../assets/main/home/gywm.png" />关于我们</p>
		</div>
		
		<div class="tips f24 color_font-99" style="padding: 1.0rem  0 1.5rem">
			——出借有风险，选择需谨慎——
		</div>
	</div>
</template>

<script>
	import '@/lib/swiper/swiper.css'
	import { noviceExclusive, recommendProduct, sellsProduct, getUserStatus } from '@/service'
	const Swiper = require("@/lib/swiper/swiper").Swiper;

	export default {
		name: "home",
		data() {
			return {
				itemNew: {},
				newList: {}, //新手
				recomPro: {}, //推荐
				hotPro: {}, //热销
				openStatus: true,
				Percentage: 0,
				left: 0+ 'rem',
				bottom: 0 + 'rem',
				lineWrongBol:true,
				newBol:true,
			};
		},
		components: {},
		created() {
			noviceExclusive(this.itemNew).then(res => {
				if(res.code == "100"){
					if(!res.result.productList.length){
						this.newBol=false;
						this.Percentage=100;
						this.roll();
						return;
					}
					this.newList = res.result.productList[0];
					this.Percentage=res.result.productList[0].amountScale;
					this.roll();
				}else{
					this.lineWrongBol=false;
				}
			}).catch(function(error) {
         	 });;
			recommendProduct(this.itemNew).then(res => {
				this.recomPro = res.productList;
			});

			sellsProduct(this.itemNew).then(res => {
				this.hotPro = res.productList;
			});

		},
		mounted() {

			/*banner*/
			var swiper = new Swiper(".swiper-container1", {
				spaceBetween: 0,
				centeredSlides: true,
				autoplay: {
					delay: 2000,
					disableOnInteraction: false
				},
				pagination: {
					el: ".swiper-pagination",
					clickable: true
				},
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev"
				}
			});
			
		},
		methods: {
			roll() {
				let canvas = document.getElementById("canvas");
				let context = canvas.getContext("2d");
				context.globalCompositeOperation = 'source-atop';
				let width = canvas.clientWidth;
				let height = width/2;
				let deg = Math.PI / 180;
				let x = width / 2;
				let w = 10;
				let r = width - 10;

				function one(w) {
					context.scale(0.5, 0.5);
					context.beginPath();
					context.arc(2 * x, 2 * x - 5, r, 180 * deg, 360 * deg, false);
					context.strokeStyle = "#EBEBEB";
					context.lineWidth = w;
					context.stroke();
					context.globalCompositeOperation = 'source-atop';
					context.save();
				};
				let Percentage = this.Percentage;
				function two(per) {
					let endDeg = per * 1.8 + 180;
					context.beginPath();
					context.arc(2 * x, 2 * x - 5, r, 180 * deg, endDeg * deg, false);
					context.strokeStyle = "#208AFF";
					context.lineWidth = w;
					context.stroke();
					context.globalCompositeOperation = 'source-atop';
					context.save();
				}
				if(window.devicePixelRatio) {
					canvas.style.width = width + "px";
					canvas.style.height = height + "px";
					canvas.height = height * window.devicePixelRatio;
					canvas.width = width * window.devicePixelRatio;
					context.scale(window.devicePixelRatio, window.devicePixelRatio);
					canvas.style.width = width;
					canvas.style.height = width;
				}

				var nn = 180 + Percentage * 1.8;
				var sin = Math.sin(nn * deg).toFixed(2);
				var cos = Math.cos(nn * deg).toFixed(2);
				var x8 = width /2 * cos;
				var y8 = width /2 * sin;
				let cc=0;
				if(Percentage<=50){
					cc=-2;
				}else{
					cc=5;
				}
				this.left = (x8  + ((width-10)/2)-cc) + 'px';
				this.bottom = (-y8-12) + 'px';
				one(w);
				let per=0;
				var rollTimee=setInterval(function(){
					per= per +2;
					if(per>Percentage){
						clearInterval(rollTimee);
					}else{
						two(per);
					}
				},30)
			},
			linkPage() {
				getUserStatus().then(res => {

					if(res.code == "100") {
						const info = res.result;
						if(info.openAccountStatus == "3") {
							this.$go('/home/joinFinlManager');
						} else {
							this.$go('/reg_bank');
						}

					} else if(res.code == "1210" || res.code == "1000") {
						this.$go('/login');
					} else {
						this.$toask(res.message);
					}

				});

			}

		},
		watch: {}
	};
</script>

<style scoped>
	.home{
		background-color: #FFFFFF;
	}
	.newBidDiv {
		float: left;
		width: 7.1rem;
		overflow: hidden;
	}
	
	.RiskTips {
		margin: 1.06rem 0 0.98rem;
		height: 0.84rem;
		text-align: center;
		line-height: 0.24rem;
		font-size: 0.24rem;
		color: #B6B2B2;
	}
	
	.RiskTips>i {
		font-style: inherit;
		margin: 0 0.2rem;
	}
	
	.swiper-pagination-bullet {
		width: 10px;
		height: 10px;
	}
	
	p {
		margin: 0 auto;
		padding: 0;
		font-size: 0.24rem;
	}
	
	.center {
		margin: 0 auto;
		padding: 0;
		text-align: center;
	}
	/*banner轮播*/
	
	.indexSwiper {
		margin: 0 0.01rem;
		width: 7.48rem;
		height: 3.9rem;
		/* background-color:rgb(202, 35, 91); */
	}
	
	.swiper-container1 {
		width: 7.5rem;
		height: 3.9rem;
		overflow: hidden;
	}
	
	.swiper-wrapper1 {
		width: 22.5rem;
		height: 3.9rem;
	}
	
	.swiper-container2 {
		width: 7.1rem;
		height: 5.0rem;
		overflow: hidden;
	}
	
	.swiper-wrapper2 {
		/*width: 22.5rem;*/
		height: 5.0rem;
	}
	
	.swiper-slide1 {
		float: left;
		width: 7.5rem;
		height: 100%;
		text-align: center;
		font-size: 18px;
		background: rgb(12, 185, 142);
		/* Center slide text vertically */
		display: -webkit-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		-webkit-align-items: center;
		align-items: center;
	}
	
	.swiper-slide1>img {
		width: 100%;
		height: 100%;
		background-size: 100% 100%;
	}
	
	.swiper-pagination-bullet-active {
		color: #ffffff;
		background: #007aff;
	}
	
	.swiper-pagination2>span {
		width: 0.12rem;
		height: 0.12rem;
		border-radius: 0;
	}
	/* 公告 */
	
	.indexNotice {
		width: 7.5rem;
		height: 0.8rem;
		background-color: #F9FCFF;
		overflow: hidden;
		display: none;
	}
	
	.indexNotice>img {
		float: left;
		width: 0.76rem;
		height: 0.48rem;
		box-sizing: 100% 100%;
		margin: 0.16rem 0.1rem 0.16rem 0.3rem;
	}
	
	.indexNoticeP {
		float: left;
		color: #363636;
		margin: 0.22rem 0;
		width: 4rem;
		height: 0.4rem;
		font-size: 0.28rem;
		line-height: 0.4rem;
		text-align: left;
	}
	
	.indexNoticeSpan {
		float: right;
		color: #999999;
		margin: 0.22rem 0;
		height: 0.4rem;
		font-size: 0.28rem;
		line-height: 0.4rem;
		text-align: right;
		margin-right: 0.3rem;
	}
	/* 关于我们 运营数据 */
	
	.indexMessage {
		margin: 0 auto;
		padding: 0;
		width: 6.9rem;
		/*height: 1.76rem;*/
		overflow: hidden;
		display: flex;
		justify-content: space-around;
	}
	
	.indexMessage img {
		width: 0.7rem;
		height: 0.7rem;
		background-size: 100% 100%;
		margin: 0.32rem 0 0.16rem;
	}
	
	.indexMessage p {
		color: #666666;
		font-size: 0.24rem;
		margin-bottom: 0.3rem;
	}
	
	.bottomBorder {
		border-bottom: 1px solid #ececec;
	}
	/* 新手专享 */
	
	.new {
		margin: 0 auto;
		padding: 0;
		text-align: center;
		width: 6.9rem;
		overflow: hidden;
	}
	
	.newTitle {
		float: left;
		margin: 0.3rem 0 0 0;
		width: 6.9rem;
		height: 0.44rem;
		font-size: 0.36rem;
		line-height: 0.44rem;
		color: #363636;
		text-align: left;
		font-weight: 500;
	}
	
	.newTitle span {
		float: right;
		font-size: 0.28rem;
		color: #999999;
		line-height: 0.44rem;
		font-weight: normal;
	}
	
	.canvasDiv {
		float: left;
		margin: 0.3rem 0.9rem;
		width: 5.1rem;
		height: 2.5rem;
		position: relative;
	}
	
	.perSpan {
		position: absolute;
		z-index: 100;
		background: #208AFF;
		box-shadow: 0 0 4px 0 #208AFF;
		width: .24rem;
		height: .24rem;
		border-radius: .24rem;
	}
	
	.canvasDivMes {
		position: absolute;
		z-index: 2;
		width: 5.1rem;
		height: 2.5rem;
	}
	
	.canvasDivMes p:nth-child(1) {
		margin: .58rem 0 .48rem;
		font-size: .24rem;
		color: #999999;
		line-height: .24rem;
	}
	
	.canvasDivMes p:nth-child(2) {
		line-height: .72rem;
		font-size: .36rem;
		color: #FF5513;
	}
	
	.canvasDivMes p:nth-child(3) {
		height: .48rem;
		font-size: .24rem;
		line-height: .48rem;
		color: #999999;
	}
	
	.canvasDivMes i {
		font-size: .76rem;
		font-style: inherit;
		font-weight: 500;
	}
	
	#canvas {
		width: 5.1rem;
		height: 2.5rem;
	}
	
	.newBidMes {
		float: left;
		width: 6.9rem;
		/*display: flex;*/
		/*justify-content: space-around;*/
		font-size: 0.24rem;
		color: #999999;
		overflow: hidden;
	}
	
	.newBidMes p:nth-child(1){
		float: left;
		width: 2.75rem;
		padding-left:.7rem ;
		line-height: 0.36rem;
		margin-bottom: 0.4rem;
		text-align: left;
	}
	.newBidMes p:nth-child(2){
		float: left;
		width: 2.75rem;
		padding-right:.7rem ;
		line-height: 0.36rem;
		margin-bottom: 0.4rem;
		text-align: right;
	}
	
	.newBidMes img {
		width: 0.28rem;
		height: 0.28rem;
		background-size: 100% 100%;
		margin: 0.15rem 0.1rem 0 0;
	}
	
	.newBidMes i {
		font-style: inherit;
		font-size: 0.36rem;
		color: #363636;
	}
	
	.newBtn {
		float: left;
		margin: 0 1.05rem 0.4rem;
		width: 4.8rem;
		height: 0.8rem;
		background-color: #208AFF;
		line-height: 0.8rem;
		border-radius: 0.08rem;
		text-align: center;
		color: #ffffff;
		font-size: 0.32rem;
	}
	/* 为您推荐 */
	
	.recommend {
		margin: 0 auto;
		padding: 0;
		text-align: center;
		width: 6.9rem;
		background-color: #fff;
		overflow: hidden;
	}
	
	.recommendDiv {
		width: 6.9rem;
		/*height: 2.52rem;*/
		overflow: hidden;
	}
	
	.recommendDivTitle {
		float: left;
		width: 6.6rem;
		margin: .4rem 0 0 0;
		color: #666666;
		font-size: 0.28rem;
		height: 0.32rem;
		line-height: 0.32rem;
		text-align: left;
		font-weight: 500;
	}
	
	.bidMessage>div:nth-child(1) {
		float: left;
		width: 4.3rem;
		height: 1.6rem;
		text-align: left;
	}
	
	.bidMessage>div:nth-child(2) {
		float: left;
		width: 2.6rem;
		height: 1.6rem;
		text-align: left;
	}
	
	.bidMesRate {
		margin: 0.2rem 0 0.18rem 0;
		height: 0.52rem;
		line-height: 0.52rem;
		font-size: 0.36rem;
		text-align: left;
		color: #FF5513;
		font-weight: 500;
	}
	.bidMesRate i{
		font-size: .52rem;
		font-style: inherit;
	}
	.bidMesTime {
		margin: 0.2rem 0 0.18rem 0;
		height: 0.52rem;
		line-height: 0.52rem;
		font-size: 0.24rem;
		text-align: left;
		color: #999999;
	}
	
	.bidMesTime i {
		font-style: inherit;
		color: #4a4a4a;
		font-size: 0.48rem;
	    font-weight:500;
	}
	
	.bidMesP {
		margin-bottom: 0.46rem;
	}
	
	.yybgDiv {
		float: left;
		margin-top: 0.4rem;
		width: 6.9rem;
		height: 1.36rem;
		overflow: hidden;
	}
	
	.yybgDiv div:nth-child(1) {
		float: left;
		width: 3.3rem;
		height: 1.36rem;
		background: url(../../assets/main/home/yybg1.png) no-repeat 0 0;
		background-size: 100% 100%;
	}
	
	.yybgDiv div:nth-child(2) {
		float: right;
		width: 3.3rem;
		height: 1.36rem;
		background: url(../../assets/main/home/yybg2.png) no-repeat 0 0;
		background-size: 100% 100%;
	}
	
	.yybgDiv p:nth-child(1) {
		text-align: left;
		margin: .2rem 0 .1rem .26rem;
		height: .5rem;
		line-height: .5rem;
		font-size: 0.24rem;
		color: #FFFFFF;
	}
	
	.yybgDiv p>i {
		font-style: inherit;
		font-size: 0.44rem;
		font-weight: 500;
	}
	
	.yybgDiv p:nth-child(2) {
		margin: 0 0 0 .26rem;
		text-align: left;
		color: #FFFFFF;
		font-size: 0.24rem;
	}
	
	.Timetips {
		float: left;
		width: 6.9rem;
		margin: .3rem 0 .4rem 0;
	}
	
	.xxpl {
		margin: .4rem 0 .2rem 0;
		float: left;
		width: 3.45rem;
		border-right: 1px solid #E5E5E5;
		box-sizing: border-box;
		padding-right: 0.44rem;
		text-align: right;
		font-size: 0.28rem;
		line-height: .32rem;
		color: #666666;
	}
	
	.about {
		margin: .4rem 0 .2rem 0;
		float: left;
		width: 3.45rem;
		text-align: left;
		font-size: 0.28rem;
		line-height: .32rem;
		color: #666666;
	}
	
	.about img,
	.xxpl img {
		margin: 0.06rem .16rem 0 .44rem;
		width: .32rem;
		height: .32rem;
		background-size: 100% 100%;
	}
	
	
	.line-wrong{
		width: 6.9rem;
	}
	.line-wrong img{
		margin: .26rem 0 .32rem;
		width: 1.26rem;
		height: 1.68rem;
		background-size: 100% 100%;
	}
	.line-wrong p:nth-child(2){
		font-size: .26rem;
		color: #9f9f9f;
	}
	.line-wrong span:nth-child(3){
		display: block;
		width: 1.4rem;
		height: .64rem;
		line-height: .64rem;
		border: 1px solid  #999FAD;
		border-radius: .64rem;
		box-sizing: border-box;
		margin: .64rem  2.75rem .44rem;
		font-size: .28rem;
		color: #999FAD;
	}
	.line-wrong p:nth-child(4){
		color: #208AFF ;
		font-size: .26rem;
		margin-bottom: .44rem;
	}
	.disable{
		pointer-events: none;
		background-color: #E1E1E1;
		
	}
</style>
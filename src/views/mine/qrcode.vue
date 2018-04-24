<template>
	<div class="qrcode">
		<img :src="require(`@/assets/main/mine/${item.flag==1?'lcs':'userImg'}.png`)" alt="" class="head_icon place-img">
		<p class="qrcode-p1 f28 color_font-36 center"><i v-show="item.userName">{{item.userName | nameDesensitization}}</i>&nbsp;&nbsp; {{item.mobile | desensitization}}</p>
		<p :class="item.flag==1?'':'opcity'" class="qrcode-p2 f30 color_font-99 center">{{item.position}}</p>
		<div :class="item.flag==1?'':'opcity'" class="qrcode-p3 f30 color_font-99 center">
			<!--<p>中赢卓信财富投资管理(北京)有限公司</p>-->
			<p>{{item.department}}</p>
		</div>
		<!--<div class="msg">
        <h2 class="f36 flex"><span></span><span v-if="(item.position=='1')||(item.position=='2')" class="status color_main"><img src="../../assets/main/mine/status_yellow.png" alt=""><i class="f16">{{['一般理财师','大区经理'][parseInt(item.position)-1]}}</i></span></h2>
        <p class="f24">{{item.pic}}</p>
        <p class="f44 flex"></p>
        <h2 class="f28 flex">
        	<span class="color_font-36">{{item.userName | nameDesensitization}}</span><span style="margin-left: .2rem;" v-show="item.position">{{item.position}}</span>
        	<span v-if="(item.position=='1')||(item.position=='2')" class="status color_main">
        		<img src="../../assets/main/mine/status_yellow.png" alt=""><i class="f16">{{['一般理财师','大区经理'][parseInt(item.position)-1]}}</i></span>
        
         </h2>
         <p class="f28 flex color_font-99">{{item.department}}</p>
      </div>-->
		<div class="code">
			<canvas id="code"></canvas>
			<p class="f28 center">扫一扫该二维码，添加我</p>
		</div>
	</div>
</template>

<script>
	import QRious from 'qrious'
	import {
		mapGetters
	} from 'vuex'
	export default {
		name: 'qrcode',
		data() {
			return {
				item: {},
			}
		},
		computed: {
			...mapGetters([
				'user_info'
			])
		},
		created() {
			this.item = this.user_info;
		},
		mounted() {
			this.$nextTick(() => {
				new QRious({
					element: document.getElementById('code'),
					value: this.user_info.userCode,
					size: 260
				});
			});
		},
		components: {},
		methods: {
			init() {}
		},
		watch: {}
	}
</script>

<style lang="scss" scoped>
i{
	font-style: inherit;
}
	.qrcode {
		margin: 0 auto;
		padding: 0;
		height: 100%;
		background: #fff;
		width: 7.5rem;
		.head_icon {
			width: 1.0rem;
			height: 1.0rem;
			background-size: 100% 100%;
			margin: .7rem 3.25rem 0;
		}
		&-p1 {
			margin: .3rem 0;
			line-height: .28rem;
		}
		&-p2 {
			margin: 0 0 .3rem 0;
			line-height: .3rem;
		}
		&-p3 {
			margin-bottom: .6rem;
			p {
				line-height: .44rem;
			}
		}
		.opcity{
			opacity: 0;
		}
	}
	
	.code {
		#code {
			margin: 0 1.15rem .4rem;
			width: 5.2rem;
			height: 5.2rem;
			p {}
		}
		p {
			margin-top: .4rem;
			color: #9b9b9b;
		}
	}
	
</style>
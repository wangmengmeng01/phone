<template>
	<div class="invitation">
		<img class="banner" src="../../assets/main/mine/banner@2x.png" />
		<div class="invitation-num f28">
			<div class="boderR">
				<p class="color_font-99">已注册好友</p>
				<p class="color_font-36">{{item.registerCount}}人</p>
			</div>
			<div>
				<p class="color_font-99">已投标好友</p>
				<p class="color_font-36">{{item.investCount}}人</p>
			</div>
		</div>
		<div class="list f28">
			<p class="list-title">
				<span>手机号码</span>
				<span>注册日期</span>
				<span>是否投标</span>
			</p>
			<div class="list-list" v-if="list.length">
				<p class="list-list-p" v-for="(i,index) in list">
					<span>{{i.mobile}}</span>
					<span>{{i.registerDate}}</span>
					<span>{{i.isInvest==1?'是':'否'}}</span>
				</p>
			</div>
			<p v-else class="list-none f28 center">暂无好友</p>
		</div>

		<button class="btn" @click="showBol=!showBol">立即邀请好友</button>

		<p class="share" v-show="showBol" @click="showBol=!showBol">
			<img src="../../assets/main/mine/share@2.png" />
		</p>
	</div>
</template>

<script>
	import {
		getInviteRecordList,
	} from '@/service'

	export default {
		name: 'invitation',
		data() {
			return {

				pageIndex: 1,
				item: {},
				list: [],
				showBol: false,
			}
		},
		computed: {},
		created() {

			getInviteRecordList({
				pageIndex: this.pageIndex
			}).then(res => {

				this.item = res;

				this.list = this.list.concat(res.list);
			});

		},
		mounted() {},
		components: {},
		methods: {},
		watch: {}
	}
</script>

<style lang="scss" scoped>
	.share {
		position: fixed;
		z-index: 1000000;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.2);
		/*background-color: red;*/
		top: -.88rem;
		display: flex;
		justify-content: flex-end;
		img {
			margin-top: .88rem;
			width: 5.78rem;
			height: 3.58rem;
			background-size: 100% 100%;
		}
	}
	
	.invitation {
		margin: 0 auto;
		padding: 0;
		width: 7.5rem;
		overflow: hidden;
		padding-bottom: 1.0rem;
		.banner {
			float: left;
			width: 7.5rem;
			height: 3.6rem;
			background-size: 100% 100%;
		}
		&-num {
			float: left;
			margin: 0 .3rem;
			width: 6.9rem;
			overflow: hidden;
			div {
				margin: .5rem 0;
				float: left;
				text-align: center;
				width: 3.45rem;
				height: .96rem;
				p:nth-child(1) {
					line-height: .28rem;
				}
				p:nth-child(2) {
					margin-top: .42rem;
					line-height: .28rem;
				}
			}
			.boderR {
				border-right: 1px solid #E5E5E5;
				box-sizing: border-box;
			}
		}
		.list {
			float: left;
			width: 7.5rem;
			overflow: hidden;
			&-title {
				float: left;
				padding: 0 .44rem;
				width: 6.62rem;
				height: 1.04rem;
				line-height: 1.04rem;
				background: #F7F7F7;
				display: inline-flex;
				justify-content: space-between;
				span {
					width: 1.6rem;
					text-align: center;
				}
			}
			&-list {
				float: left;
				width: 7.5rem;
				&-p {
					padding: 0 .44rem;
					width: 6.62rem;
					height: 1.04rem;
					line-height: 1.04rem;
					display: inline-flex;
					justify-content: space-between;
					span {
						width: 1.6rem;
						text-align: center;
					}
				}
				>p:nth-child(2n+1) {
					background: #FFFFFF;
				}
				>p:nth-child(2n) {
					background: #F7F7F7;
				}
			}
			&-none {
				float: left;
				margin: 2.8rem 0.3rem 1.36rem;
				width: 6.9rem;
				color: #666666;
			}
		}
		.btn {
			position: fixed;
			margin: 0 auto;
			padding: 0;
			left: 0;
			right: 0;
			bottom: 0;
			width: 7.5rem;
			border-radius: 0;
		}
	}
</style>
<template>
	<div class="invitation">
		<img class="banner" src="../../assets/main/mine/banner@2x.png" />
		<div class="invitation-num f28">
			<div class="boderR">
				<p class="color_font-99">已注册好友</p>
				<p class="color_font-36">10人</p>
			</div>
			<div>
				<p class="color_font-99">已投标好友</p>
				<p class="color_font-36">2人</p>
			</div>
		</div>
		<div class="list f28">
			<p class="list-title">
				<span>手机号码</span>
				<span>注册日期</span>
				<span>是否投标</span>
			</p>
			<!--<div class="list-list">
				<p class="list-list-p">
					<span>手机号码</span>
					<span>注册日期</span>
					<span>是否投标</span>
				</p>
				<p class="list-list-p">
					<span>手机号码</span>
					<span>注册日期</span>
					<span>是否投标</span>
				</p>
			</div>-->

			<p class="list-none f28 center">暂无好友</p>
		</div>

		<button class="btn">立即邀请好友</button>
	</div>
</template>

<script>
	export default {
		name: 'invitation',
		data() {
			return {}
		},
		computed: {},
		created() {},
		mounted() {},
		components: {},
		methods: {},
		watch: {}
	}
</script>

<style lang="scss" scoped>
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
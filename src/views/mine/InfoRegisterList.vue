<template>
	<div class="InfoRegisterList">
		<div v-if="list.length" style="background-color: #F6F5F5;">
			<div v-for="(i,index) in list" class="InfoRegisterList-list borderB">
				<p class="InfoRegisterList-list-p f28">{{i.mobile}} &nbsp;&nbsp;({{i.userName|nameDesensitization}})</p>
				<div class="InfoRegisterList-list-div borderB">
					<p>
						<span class="f32 span1 color_font-36">{{i.productName}}</span>
						<span class="f24 color_font-99">主推产品</span>
					</p>
					<p>
						<span class="f32 span2">{{i.amount|formatNum}}</span>
						<span class="f24 color_font-99">推荐金额(元)</span>
					</p>
					<p>
						<span class="f32" :class="i.resultType==1?'span5':(i.resultType==2)?'span4':'span3'">{{i.resultType==1?'无意向':(i.resultType==2)?'有意向':'成交'}}</span>
						<span class="f24 color_font-99">推荐结果</span>
					</p>
				</div>
				<div class="userMes">
					<p class="place f28 color_font-99"><img src="../../assets/main/mine/place.png" />{{i.address}}</p>
					<p class="time f28 color_font-99"><img src="../../assets/main/mine/zydjTime.png" />{{i.invistDate}}</p>
				</div>
				<div class="listMark f28 color_font-99">备注：{{i.remark}}</div>
			</div>
		</div>

		<div v-else class="InfoRegisterList-none">
			<img src="../../assets/main/mine/zwjl.png" />
			<p class="f28 center">暂无展业记录</p>
		</div>

	</div>
</template>

<script>
	import {
		getShowBusinessHistory
	} from '@/service'
	export default {

		name: 'InfoRegisterList',

		data() {
			return {
				targetUserCode: this.$route.query.userCode, //用户code
				pageIndex: 1, //分页数
				total: 0, //总页数
				list: [],
			}
		},
		computed: {},
		created() {
			this.init();
		},
		mounted() {
			window.scroll(0, 0);
			document.body.onscroll = () => {

				if((document.documentElement.scrollTop || document.body.scrollTop) >= document.body.scrollHeight - document.documentElement.clientHeight) {

					this.pageIndex++;
					if(this.pageIndex > this.total) {
						return;
					}
					if(this.$route.query.rollType) {
						this.init();
					}
				}
			}
		},
		methods: {
			init() {
				getShowBusinessHistory({
					targetUserCode: this.targetUserCode,
					pageIndex: this.pageIndex,
				}).then(res => {
					this.list = this.list.concat(res.list);
					this.total = Math.ceil(res.total / 10);
				});
			}
		},
		watch: {}
	}
</script>

<style lang="scss" scoped>
	.InfoRegisterList {
		margin: 0 auto;
		padding: 0;
		width: 7.5rem;
		overflow: hidden;
		padding-bottom: .68rem;
		&-none {
			padding: 0 .3rem;
			width: 6.9rem;
			img {
				margin: 4.8rem 2.74rem .6rem;
				padding: 0;
				width: 1.42rem;
				height: .98rem;
				background-size: 100% 100%;
			}
			p {
				color: #666666;
			}
		}
		&-list {
			margin-top: .2rem;
			padding: 0 .3rem;
			width: 6.9rem;
			background-color: #FFFFFF;
			overflow: hidden;
			.listMark {
				margin: 0 0 .4rem 0;
				float: left;
				line-height: .30rem;
				width: 6.9rem;
				text-align: left;
				/*overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;*/
			}
			&-p {
				float: left;
				margin: .38rem 0 .32rem;
				color: #666666;
			}
			&-div {
				float: left;
				width: 6.9rem;
				overflow: hidden;
				p:nth-child(1) {
					float: left;
					width: 2.74rem;
				}
				p:nth-child(2) {
					float: left;
					width: 2.86rem;
				}
				p:nth-child(3) {
					float: left;
					width: 1.3rem;
				}
				.span1 {
					color: #363636;
				}
				.span2 {
					color: #FF5513;
				}
				.span3 {
					color: #49E897;
				}
				.span4 {
					color: #FAC151;
				}
				.span5 {
					color: #666666;
				}
				p>span:nth-child(1) {
					text-align: left;
					display: block;
					line-height: .32rem;
				}
				p>span:nth-child(2) {
					text-align: left;
					display: block;
					margin: .22rem 0 .20rem;
					line-height: .24rem;
				}
			}
			.userMes {
				float: left;
				width: 6.9rem;
				/*height: 1.0rem;*/
				overflow: hidden;
				.place {
					width: 5.02rem;
					margin: .36rem 0;
					float: left;
					/*height: .28rem;*/
					line-height: .28rem;
					text-align: left;
					display: flex;
					align-items: center;
					/*overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;*/
					img {
						width: .24rem;
						height: .28rem;
						background-size: 100% 100%;
						margin-right: .12rem;
					}
				}
				.time {
					width: 1.88rem;
					margin: .36rem 0;
					float: right;
					height: .28rem;
					line-height: .28rem;
					text-align: left;
					display: flex;
					align-items: center;
					img {
						width: .28rem;
						height: .28rem;
						background-size: 100% 100%;
						margin-right: .12rem;
					}
				}
			}
		}
	}
</style>
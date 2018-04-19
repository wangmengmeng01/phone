<template>
	<div class="higHqualityAssets">

		<div v-for="(i,index) in list" class="hha-div" v-show="totalPage>0">
			<p class="hha-div-title f32 color-font ffl">{{i.borrowName}}</p>
			<p class="f32 hha-div-p1 ffl">
				<span class="ffl">{{i.annualizedRate|tofixed2}}%</span>
				<span class="ffl">{{i.contractAmount|formatNum}}</span>
				<span class="ffl">{{i.periodLength}}{{i.periodUnit|Totime}}</span>
			</p>
			<p class="f24 color_font-s hha-div-p2 ffl bb">
				<span class="ffl">历史年化</span>
				<span class="ffl">募集金额(元)</span>
				<span class="ffl">项目期限</span>
			</p>
		</div>

		<div class="joinListDiv1" v-show="totalPage<=0" >
			<img src="../../assets/main/prod/norecord.png" />
			<p class="noRecord">暂无记录</p>
		</div>

	</div>
</template>

<script>
	import {
		standardAndPlanList
	} from '@/service'
	export default {
		name: 'higHqualityAssets',

		data() {
			return {
				item: {
					pageIndex: 1
				},
				list: [], //优选资产列表
				totalPage: 0, //总页数
			}
		},
		created() {
			this.init();
		},
		mounted() {
			window.scroll(0, 0);
			document.body.onscroll = () => {

				if((document.documentElement.scrollTop || document.body.scrollTop) >= document.body.scrollHeight - document.documentElement.clientHeight) {

					this.item.pageIndex++;
					if(this.item.pageIndex > this.totalPage) {
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
				standardAndPlanList(this.item).then(res => {
					console.log(res);
					this.list = this.list.concat(res.list);
					this.totalPage = Math.ceil(res.allCount / 10);
				});
			}

		}
	}
</script>

<style lang="scss" scoped>
	.joinListDiv1 {
		float: left;
		width: 7.5rem;
		overflow: hidden;
	}
	
	.joinListDiv1>img {
		margin: 1.14rem 1.48rem 0.5rem 2.0rem;
	    width: 4.02rem;
	    height: 4.1rem;
	    -webkit-background-size: 100% 100%;
	    background-size: 100% 100%;
	}
	
	.noRecord {
		text-align: center;
		font-size: 0.28rem;
		color: #8D8D94;
		margin-bottom: 1.0rem;
	}
	
	.ffl {
		float: left;
	}
	
	.bb {
		border-bottom: 1px solid #E5E5E5;
		box-sizing: border-box;
	}
	
	.higHqualityAssets {
		margin: 0 auto;
		padding: 0;
		width: 7.5rem;
		background-color: #FFFFFF;
		/*border-top: 1px solid rgba(0, 0, 0, 0.03);*/
	}
	
	.hha-div {
		overflow: hidden;
		&-title {
			margin: 0.4rem 0.3rem 0.3rem;
			line-height: 0.28rem;
			width: 6.9rem;
		}
		&-p1 {
			margin: 0 0.3rem 0.24rem;
			overflow: hidden;
			text-align: center;
			width: 6.9rem;
			line-height: .56rem;
			span:nth-child(1) {
				text-align: left;
				width: 2.92rem;
				font-size: .56rem;
				color: #FF5513;
			}
			span:nth-child(2) {
				text-align: left;
				width: 2.44rem;
				font-size: .36rem;
			}
			span:nth-child(3) {
				text-align: left;
				width: 1.54rem;
				font-size: .36rem;
			}
		}
		&-p2 {
			margin: 0 0.3rem 0;
			overflow: hidden;
			text-align: center;
			width: 6.9rem;
			padding-bottom: 0.4rem;
			text-align: left;
			font-size: .28rem;
			color: #999999;
			span:nth-child(1) {
				width: 2.92rem;
			}
			span:nth-child(2) {
				width: 2.44rem;
			}
			span:nth-child(3) {
				width: 1.54rem;
			}
		}
	}
</style>
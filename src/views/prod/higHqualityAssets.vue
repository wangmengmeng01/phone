<template>
	<div class="higHqualityAssets">

		<div v-for="(i,index) in list" class="hha-div">
			<p class="hha-div-title f32 color-font ffl">{{i.borrowName}}</p>
			<p class="f32 hha-div-p1 ffl">
				<span class="ffl">{{i.annualizedRate}}%</span>
				<span class="ffl">＜{{i.contractAmount/10000|tofixed}}万</span>
				<span class="ffl">{{i.periodLength}}{{i.periodLength|Totime}}</span>
			</p>
			<p class="f24 color_font-s hha-div-p2 ffl" :class="index<list.length-1?'bb':''">
				<span class="ffl">历史年化</span>
				<span class="ffl">募集金额</span>
				<span class="ffl">项目期限</span>
			</p>
		</div>

		<div class="joinListDiv1" v-show="totalPage<=0" style="background-color: #f1f1f9;">
			<img src="../../assets/main/prod/norecord.png" />
			<p class="noRecord">暂无记录</p>
		</div>

	</div>
</template>
<script>
	import { standardAndPlanList } from '@/service'
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

				if(document.documentElement.scrollTop >= document.body.scrollHeight - document.documentElement.clientHeight) {

					this.item.pageIndex++;
					if(this.item.pageIndex > this.totalPage) {
						return;
					}
					this.init();

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
		margin: 1.14rem 1.74rem 0.5rem;
		width: 4.02rem;
		height: 4.1rem;
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
		border-bottom: 2px solid #CDCED3;
		box-sizing: border-box;
	}
	
	.higHqualityAssets {
		margin: 0 auto;
		padding: 0;
		width: 7.5rem;
		margin-top: 0.4rem;
		background-color: #FFFFFF;
	}
	
	.hha-div {
		overflow: hidden;
		&-title {
			margin: 0.42rem 0 0 0.6rem;
			height: 0.32rem;
			line-height: 0.32rem;
			width: 6.9rem;
		}
		&-p1 {
			margin: 0.4rem 0.8rem 0.2rem;
			overflow: hidden;
			text-align: center;
			width: 5.9rem;
			span:nth-child(1) {
				width: 1.95rem;
				text-align: left;
			}
			span:nth-child(2) {
				width: 2.0rem;
				text-align: center;
			}
			span:nth-child(3) {
				width: 1.95rem;
				text-align: right;
			}
		}
		&-p2 {
			margin: 0 0.8rem 0;
			overflow: hidden;
			text-align: center;
			width: 5.9rem;
			padding-bottom: 0.6rem;
			span:nth-child(1) {
				width: 1.95rem;
				text-align: left;
			}
			span:nth-child(2) {
				width: 2.0rem;
				text-align: center;
			}
			span:nth-child(3) {
				width: 1.95rem;
				text-align: right;
			}
		}
	}
</style>
<template>
	<div class="higHqualityAssets" @scroll="dd">

		<div  v-for="(i,index) in list" class="hha-div">
			<p class="hha-div-title f32 color-font ffl">{{i.borrowName}}</p>
			<p class="f32 hha-div-p1 ffl">
				<span class="ffl">{{i.annualizedRate}}%</span>
				<span class="ffl">＜{{i.contractAmount/10000|tofixed}}万</span>
				<span class="ffl">{{i.periodLength}}{{i.periodLength|Totime}}</span>
			</p>
			<p class="f24 color_font-s hha-div-p2 ffl"  :class="index<list.length-1?'bb':''">
				<span class="ffl">历史年化</span>
				<span class="ffl">募集金额</span>
				<span class="ffl">项目期限</span>
			</p>
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
					pageIndex: "1"
				},
				list: {}, //优选资产列表
				totalPage:0,//总页数

			}
		},
		created() {
			standardAndPlanList(this.item).then(res => {
				console.log("优选资产");
				console.log(res);
				this.list = res.list;
				this.totalPage= Math.ceil(res.allCount/10);
//				console.log(this.totalPage);
			});
		},
		methods: {
			
			dd() {
			   
			}
			
			
		}
	}
</script>

<style lang="scss" scoped>
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
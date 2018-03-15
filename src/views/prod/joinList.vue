<template>
	<div class="jionList">
		<div class="joinListDiv" v-show="list.length">
			<div v-for="(i,index) in list" class="joinCxt" :class="[i>0?'boderTop':'']">
				<p>
					<span class="jionName">{{i.userName}}</span>
					<span class="joinTime">{{i.createTime}}</span>
				</p>
				<p>{{i.investAmount|formatNum}}</p>
			</div>

		</div>

		<div class="joinListDiv1" v-show="!list.length" style="background-color: #f1f1f9;">
			<img src="../../assets/main/prod/norecord.png" />
			<p class="noRecord">暂无记录</p>
		</div>

	</div>
</template>

<script>
	import { searchBidsInvestList } from '@/service'
	export default {
		name: 'jionList',

		data() {
			return {
				item: {
					productNo: this.$route.query.productNo,
					bidNo: this.$route.query.bidNo,
					pageIndex: "1"
				},
				list: {}, //交易记录

			}
		},
		created() {
			searchBidsInvestList(this.item).then(res => {
				console.log("交易记录");
				console.log(res);
				this.list = res.bidsInvestList;

			});
		},
		methods: {}
	}
</script>

<style scoped>
	.noRecord {
		width: 7.5rem;
	}
	
	.jionList {
		margin: 0 auto;
		width: 7.5rem;
		overflow: hidden;
	}
	
	.joinListDiv {
		float: left;
		margin-top: 0.4rem;
		padding: 0 0.4rem;
		width: 6.7rem;
		background-color: #FFFFFF;
		overflow: hidden;
	}
	
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
	}
	
	.joinCxt {
		float: left;
		width: 6.7rem;
		height: 1.18rem;
		overflow: hidden;
	}
	
	.joinCxt>p:nth-child(1) {
		float: left;
		width: 3.7rem;
		height: 1.18rem;
		overflow: hidden;
	}
	
	.jionName {
		float: left;
		width: 3.7rem;
		margin: 0.22rem 0 0.08rem 0;
		font-size: 0.28rem;
		text-align: left;
		color: #181818;
		line-height: 0.4rem;
	}
	
	.joinTime {
		float: left;
		width: 3.7rem;
		line-height: .28rem;
		font-size: 0.2rem;
		text-align: left;
	}
	
	.joinCxt>p:nth-child(2) {
		float: right;
		margin: 0.44rem 0;
		word-break: 3.0rem;
		height: 0.4rem;
		font-size: 0.28rem;
		text-align: right;
		line-height: 0.4rem;
	}
	
	.boderTop {
		border-top: 2px solid #CDCED3;
		margin-bottom: 1.0rem;
	}
</style>
<template>
	<div class="jionList">

		<div class="joinListDiv" v-show="list.length">
			<p class="joinCxtTitle boderTop">
				<span>投资人</span>
				<span>投资时间</span>
				<span>投资金额(元)</span>
			</p>
			<div class="joinCxt boderTop" v-for="(i,index) in list">
				<p>{{i.userName|desensitization}}</p>
				<p>
					<span>{{i.createTime.split(" ")[0]}}</span>
					<span>{{i.createTime.split(" ")[1]}}</span>
				</p>
				<p>{{i.investAmount|formatNum}}</p>
			</div>
		</div>
		<div class="joinListDiv1" v-show="!list.length">
			<img src="../../assets/main/prod/norecord.png" />
			<p class="noRecord">暂无记录</p>
		</div>
	</div>
</template>

<script>
	import {
		searchBidsInvestList
	} from '@/service'
	export default {
		name: 'jionList',

		data() {
			return {
				item: {
					productNo: this.$route.query.productNo,
					bidNo: this.$route.query.bidNo,
					pageIndex: "1",
				},
				list: [], //交易记录
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
				searchBidsInvestList(this.item).then(res => {
					this.list = this.list.concat(res.bidsInvestList);
					this.totalPage = Math.ceil(res.total / 10);

				});
			}

		}
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
		/*border-top: 1px solid rgba(0, 0, 0, 0.03);*/
	}
	
	.joinListDiv {
		float: left;
		padding: 0 0.3rem;
		width: 6.9rem;
		background-color: #FFFFFF;
		overflow: hidden;
	}
	
	.joinListDiv1 {
		float: left;
		width: 7.5rem;
		overflow: hidden;
		background-color: #FFFFFF;
	}
	
	.joinListDiv1>img {
		margin: 1.14rem 1.48rem 0.5rem 2.0rem;
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
		width: 6.9rem;
		height: 1.44rem;
		line-height: 1.44rem;
		overflow: hidden;
		display: flex;
		justify-content: space-between;
		color: #363636;
	}
	
	.joinCxt p {
		width: 1.6rem;
		font-size: .28rem;
		text-align: center;
	}
	
	.joinCxt p>span:nth-child(1) {
		float: left;
		margin: .42rem 0 .06rem;
		line-height: .24rem;
		color: #999999;
		width: 1.6rem;
	}
	
	.joinCxt p>span:nth-child(2) {
		float: left;
		margin: .06rem 0 .42rem;
		line-height: .24rem;
		color: #999999;
		width: 1.6rem;
	}
	
	.joinCxtTitle {
		width: 6.9rem;
		display: flex;
		justify-content: space-between;
	}
	
	.joinCxtTitle span {
		width: 1.6rem;
		font-size: .28rem;
		line-height: .9rem;
		color: #666666;
		text-align: center;
	}
	
	.boderTop {
		border-bottom: 1px solid #E5E5E5;
	}
</style>
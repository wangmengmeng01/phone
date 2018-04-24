<template>
	<div class="claims pageCenter">
		<!--<ul v-show="list.length">
      <li class="item flex">
        <div class="left">
          <div class="top">
            <img src="../../assets/wealth/wealth/zq.png" alt="" class="icon">
            <h2 class="color_font f28">债券ID {{i.id}}</h2>
            <p class="color_font-s f24">{{i.matchDate}} 购入</p>
          </div>
          <div class="bottom">
            <h2 class="color_font f28">{{i.deptGrade}}</h2>
            <p class="color_font-s f24">债权评级</p>
          </div>
        </div>
        <div class="right">
          <p class="p1 flex color_font f36"><span></span><span></span></p>
          <p class="p2 flex color_font-s f24"><span>债权价值(元)</span><span>占资产金额比重</span></p>
          <p class="p3 f40 color_main">{{i.borrowName}}</p>
          <p class="p5 flex color_font f36"><span>{{i.borrowAmount|formatNum}}</span><span>正常</span></p>
          <p class="p6 flex color_font-s f24"><span>募集总额(元)</span><span>还款状态</span></p>
        </div>
      </li>
    </ul>-->

		<!--<div class="joinListDiv1" v-show="!list.length" style="background-color: #f1f1f9;float: left;width: 7.5rem;overflow: hidden;">
      <img style="margin: 1.14rem 1.74rem 0.5rem;width: 4.02rem;height: 4.1rem;background-size: 100% 100%;" src="../../assets/main/prod/norecord.png" />
      <p class="noRecord" style="text-align: center;font-size: 0.28rem;color: #8D8D94;margin-bottom: 1.0rem;">暂无记录</p>
    </div>-->

		<div  v-if="list.length">
			<div class="claims-list sonDiv"  v-for="(i,index) in list">
				<p class="title f28 boderB">债权ID{{i.id}}</p>
				<div class="claims-list-div">
					<p>
						<span class="f32 color">{{i.currValue|formatNum}}</span>
						<span class="f24 color_font-99">持有价值(元)</span>
					</p>
					<p>
						<span class="f32">{{i.deptProportion|tofixed2}}%</span>
						<span class="f24 color_font-99">占资产金额比重</span>
					</p>
					<p>
						<span class="f32">{{i.borrowAmount|formatNum}}</span>
						<span class="f24 color_font-99">募集总额(元)</span>
					</p>

				</div>
			</div>
		</div>

		<div v-else class="claims-none">
			<img src="../../assets/main/mine/zwjl.png" />
			<p class="f28">暂无记录</p>
		</div>

	</div>
</template>

<script>
	import {
		serchDebtHoldedRecord
	} from '@/service'
	export default {
		name: 'claims',
		data() {
			return {
				item: {
					cashNo:this.$route.query.cashNo,
					pageNum: 1,
				},
				list: [],
				totalPage: 0,
			}
		},
		created() {
			this.item.cashNo = this.$route.query.cashNo;
			this.init();

		},
		mounted() {
			window.scroll(0, 0);
			document.body.onscroll = () => {

				if((document.documentElement.scrollTop || document.body.scrollTop) >= document.body.scrollHeight - document.documentElement.clientHeight) {

					this.item.pageNum++;
					if(this.item.pageNum > this.totalPage) {
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
				serchDebtHoldedRecord(this.item).then(res => {
					this.list = this.list.concat(res.deptHoldedList);
					this.totalPage = Math.ceil(res.totalNum / 10);
				});
			}
		},
		watch: {}
	}
</script>

<style lang="scss" scoped>
	.claims {
		&-none {
			/*display: none;*/
			img {
				margin: 4.02rem 3.04rem .6rem;
				width: 1.42rem;
				height: .98rem;
				background-size: 100% 100%;
			}
			p {
				color: #666666;
				text-align: center;
			}
		}
		&-list {
			margin: .16rem 0 0 0;
			background-color: #FFFFFF;
			.title {
				width: 6.9rem;
				margin: .32rem 0 .3rem;
				line-height: .28rem;
				color: #666666;
			}
			&-div {
				margin: .4rem 0;
				width: 6.9rem;
				display: flex;
				height: .78rem;
				display: flex;
				justify-content: space-between;
				p {
					width: 1.68rem;
					height: .78rem;
					overflow: hidden;
					span:nth-child(1) {
						float: left;
						display: block;
					}
					span:nth-child(2) {
						margin-top: .22rem;
						float: left;
						display: block;
					}
					.color {
						color: #FF5513;
					}
				}
			}
		}
	}
</style>
<template>
	<div class="wealthMyAssert pageCenter">
		<!--<div class="wealthMATop" >
      <div class="wealthMATopB">
        <div class="wealthMATopBL">
          我的资产
        </div>
        <div class="wealthMATopT">合计{{totalMoney| formatNum}}元</div>
  
      </div>
      <ul class="wealthMyObject">
        <li >
          <div class="wealthMyObjectT">
            <div class="wealthMyObjectTT"></div>
            <div class="wealthMyObjectTC"></div>
            <div class="wealthMyObjectTB" >查看</div>
          </div>
          <div class="wealthMyObjectC">
            <div class="wealthMyObjectCL">
              <span>持有金额</span>
              <em class="bigAmount"></em>
            </div>
          </div>
          <div class="wealthMyObjectB">
            <div class="wealthMyObjectBL">
              <span>到期天数</span>
              <i>{{i.interestEndDate}}天</i>
            </div>
            <div class="wealthMyObjectBR">
              <span>持有收益</span>
              <em>+{{i.holdAmount | formatNum
                  }}</em>
            </div>
          </div>
        </li>
      </ul>
    </div>
    
    
  
    <div class="joinListDiv1" v-show="!invesProperty.res.length" style="background-color: #f1f1f9;">
      <img src="../../assets/main/prod/norecord.png" />
      <p class="noRecord">暂无记录</p>
    </div>-->
		<div class="wealthMyAssert-list sonDiv2" v-if="invesProperty.res.length">
			<div v-for="(i) in invesProperty.res" class="wealthMyAssert-list-div borderB" @click="$go('/wealth/productDetail',{bidNo:i.borrowNo,backTitle:i.borrowNo,cashNo:i.cashNo,bidType:i.borrowType})">
				<div class="div1">
					<span class="f28">{{i.borrowName}} </span>
					<span class="f24" :class="i.cashStatus=='4'?'':'dis'">{{i.cashStatus=='4'?'已到期':'持有中'}}</span>
				</div>
				<div class="div2">
					<p class="f36 color">{{i.initCashAmount | formatNum}}</p>
					<p>
						<span class="f24 color_font-99">起息日期</span>
						<span class="f24 color_font-36">{{i.interestStartDate}}</span>
					</p>
				</div>
				<div class="div2 marginB">
					<p class="f24 color_font-99">投资金额(元)</p>
					<p>
						<span class="f24 color_font-99">到期日期</span>
						<span class="f24 color_font-36">{{i.interestEndDate}}</span>
					</p>
				</div>
			</div>
		</div>

		<div v-else class="wealthMyAssert-none">
			<img src="../../assets/main/mine/zwjl.png" />
			<p class="f28">暂无投资记录</p>
		</div>
	</div>
</template>

<script>
	import {
		invesProperty
	} from '@/service'
	export default {
		name: 'changeBank',
		data() {
			return {
				invesProperty: {
					data: {
						bidType: '2',
						status: '1',
						pageNum: '1'
					},
					res: []
				},
				totalPage: 0,
				totalMoney: 0,
			}
		},
		created() {
			this.init()
		},
		mounted() {
			window.scroll(0, 0);
			document.body.onscroll = () => {
				if((document.documentElement.scrollTop || document.body.scrollTop) >= document.body.scrollHeight - document.documentElement.clientHeight) {
					this.invesProperty.data.pageNum++;
					if(this.invesProperty.data.pageNum > this.totalPage) {
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
				invesProperty(this.invesProperty.data).then(res => {
					console.log(res)
					this.invesProperty.res = this.invesProperty.res.concat(res.dataList);
					this.totalMoney = res.totalAmount;
					this.totalPage = Math.ceil(res.totalNum / 10);
				});
			}
		},
		watch: {}
	}
</script>

<style lang="scss" scoped>
	i,
	em {
		font-style: normal;
	}
	
	.wealthMyAssert {
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
			&-div {
				overflow: hidden;
				.div1 {
					float: left;
					margin: .36rem 0 .24rem;
					height: .4rem;
					width: 6.9rem;
					display: flex;
					justify-content: space-between;
					align-items: center;
					span:nth-child(1) {
						color: #666666;
						width: 5.92rem;
						text-align: left;
					}
					span:nth-child(2) {
						width: .96rem;
						height: .4rem;
						border: 1px solid #208AFF;
						color: #208AFF;
						border-radius: 3px;
						display: flex;
						align-items: center;
						justify-content: center;
						
					}
				}
				.div2 {
					float: left;
					width: 6.9rem;
					margin: 0 0 .28rem 0;
					height: .36rem;
					display: flex;
					justify-content: space-between;
					align-items: center;
					p {
						height: .36rem;
						width: 2.68rem;
						display: flex;
						justify-content: space-between;
						align-items: center;
					}
				}
				.marginB {
					margin-bottom: .4rem;
				}
				.color {
					color: #FF5513;
				}
				.dis {
					border: 1px solid #999999;
					color: #999999;
				}
			}
		}
	}
</style>
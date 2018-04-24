<template>
	<div class="customer">
		<div class="customer-selsectBtn f28 color_font-99" @click="selectBtn">
			<p :class="checkBol?'blueLine':''">已有客户</p>
			<p :class="checkBol?'':'blueLine'">潜在客户</p>
		</div>

		<!--<div class="item mb4" v-for="i in list" v-if="list.length">
      <div class="t flex" @click="$go('customer_detail',{userCode: i.userCode})">
        <div class="l flex">
          <img src="/" alt="" class="place-img">
          <div class="ll">
            <h2 class="color_font f36">{{i.realName}}</h2>
            <p class="color_font-s f24">{{i.sex | sex}} {{i.age}}岁</p>
          </div>
        </div>
        <div class="c">
          <ul>
            <li class="color_font-s f20">{{i.beInviteDate}}成为我的客户</li>
            <li class="color_font-s f20" v-if="i.lastInvestDate">{{i.lastInvestDate}}完成最近一笔投资</li>
          </ul>
        </div>
        <span class="color_main f24"><img src="../../assets/common/arrow-right.png" alt=""></span>
      </div>
      <div class="b color_main f28 flex">
        <span @click="send_coupon(i)">赠送优惠</span>
        <div></div>
        <a class="color_main" :href="`tel:${i.mobile}`">拨打电话</a>
      </div>
    </div>-->
		<!--已有客户-->
		<div class="customer-list1" v-if="checkBol">
			<div v-for="i in list" v-if="list.length" class="customer-User borderBottom">
				<div class="customer-User-top" @click="$go('customer_detail',{userCode: i.userCode})">
					<img src="../../assets/main/mine/userImg.png" />
					<p class="f32 color_font-36 customer-User-top-p1">
						<span v-show="i.realName">{{i.realName |nameDesensitization}}</span>
						<span>{{i.mobile|desensitization}}</span>
						
					</p>
					<p class="f28 color_font-99 customer-User-top-p2">{{i.beInviteDate}}成为我的客户</p>
				</div>
				<div class="customer-User-div">
					<p class="customer-User-div-p1 f28">
						<a :href="`tel:${i.mobile}`">
							<img src="../../assets/main/mine/xdh.png" />
							<span>拨打电话</span>
						</a>
					</p>
					<p class="customer-User-div-p2 f28" @click="$go('InfoRegister',{userCode: i.userCode,realName:i.realName,mobile:i.mobile})">
						<img src="../../assets/main/mine/zydj.png" />
						<span>展业登记</span>
					</p>
					<p class="customer-User-div-p2 f28" @click="send_coupon(i)">
						<img src="../../assets/main/mine/zsyh.png" />
						<span>赠送礼物</span>
					</p>
				</div>
			</div>
		</div>

		<!--潜在客户-->
		<div class="customer-list2" v-else>
			<div v-for="i in list" v-if="list.length" class="customer-User borderBottom">
				<div class="customer-User-top">
					<img src="../../assets/main/mine/userImg.png" />
					<p class="f32 color_font-36 customer-User-top-p1">
						
						<span v-show="i.customerName">{{i.customerName|nameDesensitization}}</span>
						<span>{{i.customerPhone|desensitization}}</span>
					</p>
					<p class="f28 color_font-99 customer-User-top-p2">{{i.createTime}}成为我的客户</p>
				</div>
				<div class="customer-User-div1">
					<p class="customer-User-div1-p1 f28">
						<a  :href="`tel:${i.customerPhone}`">
							<img src="../../assets/main/mine/xdh.png" />
							<span>拨打电话</span>
						</a>
					</p>
					<!--<p class="customer-User-div1-p2 f28">
						<img src="../../assets/main/mine/dx.png" />
						<span>短信推送下载APP</span>
					</p>-->
				</div>
			</div>
		</div>
		<!--暂无理财师-->
		<div class="customer-none" v-if="!list.length">
			<img src="../../assets/main/mine/zwkh.png" />
			<p class="f28">暂无客户</p>
		</div>

		<button class="btn"  v-if="checkBol"  @click="$go('addUser',{backTitle:'添加客户'})">添加新客户</button>
	</div>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	import {
		searchExistingCustomers,
		searchPotentialCustomers
	} from '@/service'
	export default {
		name: 'customer',
		data() {
			return {
				checkBol: true,
				total: 0,
				pageIndex: 1,
				list: [],
			}
		},
		created() {
			this.RESET('coupon');
			this.init();
		},
		  mounted() {
		    document.body.onscroll = () => {
		      if ((document.documentElement.scrollTop || document.body.scrollTop) >= document.body.scrollHeight - document.documentElement.clientHeight) {
		        if (this.total <= 10) return;
		        if (this.pageIndex > Math.ceil(this.total / 10)) return;
		        this.pageIndex++;
		        if(this.$route.query.rollType) {
					this.init();
				}
		      }
		    }
		  },
		methods: {
			...mapMutations([
				'RESET',
				'SET_COUPON',
			]),
			selectBtn() {
				this.pageIndex = 1;
				this.list = [];
				this.checkBol = !this.checkBol;
				this.init();
			},
			init() {

				if(this.checkBol) {
					//已有客户
					searchExistingCustomers({
						pageIndex: this.pageIndex
					}).then(r => {
						this.list = this.list.concat(r.list);
						this.total = r.total;
					});

				} else {
					//潜在客户
					searchPotentialCustomers({
						pageIndex: this.pageIndex
					}).then(r => {
						this.list = this.list.concat(r.customerList);
						this.total = r.total;
						console.log(this.list);
						
					});
				}

			},
			send_coupon(item) {
				const {
					userCode,
					realName,
					mobile,
					
				} = item;
				this.SET_COUPON({
					params: {
						userCode,
						realName,
						mobile,
					}
				});
				this.$go('send_discount')
			}
		},
	}
</script>

<style lang="scss" scoped>
	.customer {
		margin: 0 auto;
		padding: 0;
		width: 7.5rem;
		padding-bottom: 1.0rem;
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
		&-selsectBtn {
			padding: 0 1.08rem;
			width: 5.34rem;
			height: .8rem;
			line-height: .8rem;
			overflow: hidden;
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid #E5E5E5;
			p {
				float: left;
				width: 1.6rem;
				text-align: center;
			}
			.blueLine {
				color: #208AFF;
				border-bottom: 2px solid #208AFF;
				box-sizing: border-box;
			}
		}
		&-none {
			width: 7.5rem;
			img {
				margin: 3.28rem 2.3rem 0;
				width: 2.9rem;
				height: 2.26rem;
				background-size: 100% 100%;
			}
			>p {
				margin: .5rem 0 .58rem;
				color: #666666;
				text-align: center;
			}
		}
		.borderBottom {
			border-bottom: 1px solid #E5E5E5;
		}
		&-User {
			margin: 0 .3rem;
			width: 6.9rem;
			&-top {
				margin: .54rem 0 .36rem;
				width: 6.9rem;
				overflow: hidden;
				img {
					float: left;
					width: 1.0rem;
					height: 1.0rem;
					background-size: 100% 100%;
					margin-right: .2rem;
				}
				&-p1 {
					margin: .10rem 0 .26rem;
					width: 5.7rem;
					float: left;
				}
				&-p2 {
					float: left;
					width: 5.7rem;
				}
			}
			&-div {
				margin: 0 .06rem .5rem;
				width: 6.78rem;
				display: flex;
				justify-content: space-between;
				p {
					width: 1.76rem;
					height: .64rem;
					line-height: .64rem;
					border: 1px solid #ECECEC;
					border-radius: 4px;
					align-items: center;
					justify-content: center;
					color: #666666;
					a {
						text-decoration: none;
						color: #666666;
					}
					img {
						width: .3rem;
						height: .3rem;
						background-size: 100% 100%;
						margin: 0 .03rem 0 .16rem;
					}
				}
			}
			&-div1 {
				margin: 0 .06rem .5rem;
				width: 6.78rem;
				overflow: hidden;
				&-p1 {
					float: left;
					width: 1.76rem;
					height: .64rem;
					line-height: .64rem;
					border: 1px solid #ECECEC;
					border-radius: 4px;
					align-items: center;
					justify-content: center;
					color: #666666;
					a {
						text-decoration: none;
						color: #666666;
					}
					img {
						width: .3rem;
						height: .3rem;
						background-size: 100% 100%;
						margin: 0 .03rem 0 .16rem;
					}
				}
				&-p2 {
					float: left;
					margin-left: .8rem;
					width: 2.9rem;
					height: .64rem;
					line-height: .64rem;
					border: 1px solid #ECECEC;
					border-radius: 4px;
					align-items: center;
					justify-content: center;
					color: #666666;
					img {
						width: .3rem;
						height: .3rem;
						background-size: 100% 100%;
						margin: 0 .03rem 0 .16rem;
					}
				}
			}
		}
	}
</style>
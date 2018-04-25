<template>
	<div class="mine">

		<div class="mine-top">
			<div class="mine-top-user">
				<img v-if="!isManage" src="../../assets/main/mine/userImg.png" />
				<img v-else src="../../assets/main/mine/lcs.png" />
				<p class="f28 color_font-36 mine-top-user-p1">
					<span v-show="nextBol">{{item.userName | nameDesensitization}}</span>
					<span>{{item.mobile | desensitization}}</span>
				</p>
			</div>
			<div class="mine-top-ewm" @click="$go('/mine/qrcode')">
				<img class="mine-top-ewm-img1" src="../../assets/main/mine/ewm.png" />
				<img class="mine-top-ewm-img2" src="../../assets/main/mine/rightArrow@2x.png" />
			</div>
			<div v-show="isManage" class="mine-top-mes f28 color_font-99">
				<p class="mine-top-mes-p1">团队经理</p>
				<p class="mine-top-mes-p2">{{item.department}}</p>
			</div>

		</div>
		<!--礼物-->
		<div class="mine-gift">
			<p class="mine-title f36 color_font-36">我的礼物<i>待领取(<em>{{giftList.unreceivedCount}}</em>)</i> <span v-show="giftList.couponList!=''" @click="$go('/mine/gift',{rollType:1})" class="f28 color_font-99">更多</span></p>
			<div class="mine-gift-list" v-if="giftList.couponList!=''">
				<div v-for="(i,index) in giftList.couponList" class="mine-gift-list-card">
					<div>
						<p class="f48">{{i.profitRate}}{{i.type==1?'%':'元'}}</p>
						<p class="f24">{{i.couponName}}</p>
					</div>
					<p class="f24" @click="getGift(index,i.couponNo,i.receiveNo)">领取</p>
				</div>
			</div>
			<div class="mine-gift-none" v-else>
				<img src="../../assets/main/mine/zw.png" />
				<p v-if="haveMangeBol" @click="$go('/mine/addUser',{backTitle:'添加理财师',isManage:0})" class="f28">求礼物</p>
				<p v-else class="concatP f28">
					<a :href="`tel:${manageMes.mobile}`">求礼物</a>
				</p>
			</div>
		</div>
		<!--承诺-->
		<div class="mine-gift">
			<p class="mine-title f36 color_font-36">履约承诺<i>待履约(<em>{{promiseList.waitPromiseCount}}</em>)</i><span v-show="promiseList.waitPromiseCount" @click="$go('/mine/my_promise',{rollType:1})" class="f28 color_font-99">更多</span></p>
			<div class="swiper-container">
				<!--swiper-slide-next-->
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for=" (i,index) in promiseInviteList" v-show="index<=2">
						<div class="mine-join">
							<div class="mine-join-div" @click="buyBid(i)">
								<p class="f28">{{i.productName}}</p>
								<p>{{i.annualizedRate}}<i>%</i></p>
								<p class="f28">
									<span class="mine-join-div-span1">履约金额(元)</span>
									<span class="mine-join-div-span2">{{i.inviteAmount|formatNum}}</span>
								</p>
								<p class="f28">
									<span class="mine-join-div-span1">预计收益(元)</span>
									<span class="mine-join-div-span2">{{i.interest}}</span>
								</p>
							</div>
							<p class="mine-join-p f24">
								<span class="color_font-99">邀约时间&nbsp;&nbsp;{{i.createdTime}}</span>
								<span><a  :href="`tel:${i.mobile}`"></a> <img src="../../assets/main/mine/xdh.png"/>联系理财师 </span>
							</p>
						</div>
					</div>
				</div>
				<div class="swiper-pagination gg" style="background-color: #FFFFFF;"></div>
				<!--<div class="swiper-button-next"></div>
   	       		<div class="swiper-button-prev"></div>-->
			</div>
			<div class="mine-gift-none" v-show="!promiseInviteList.length">
				<img src="../../assets/main/mine/zw.png" />
				<p v-if="haveMangeBol" @click="$go('/mine/addUser',{backTitle:'添加理财师',isManage:0})" class="f28">联系理财师</p>
				<p v-else class="concatP f28">
					<a :href="`tel:${manageMes.mobile}`">联系理财师</a>
				</p>
			</div>
		</div>
		<div class="mine-list">
			<p v-for="(j,index) in menu" class="borderB" @click="$go(j.icon==='join' ? (nextBol?j.url:'/reg_bank') : `/mine/${j.url}`)">
				<span class="f28 color_font-36">{{j.name}}</span>
				<img src="../../assets/common/arrow-right.png" />
			</p>
			<p @click="invitateFriend">
				<span class="f28 color_font-36">邀请好友</span>
				<img src="../../assets/common/arrow-right.png" />
			</p>
		</div>

		<!--<div class="head flex" @click="$go('/mine/qrcode')">
      <img :src="item.pic || head" alt="" class="head_icon">
      <div class="msg">
        <h2 class="f44 flex"><span v-if="item.userName">{{item.userName | nameDesensitization}}</span><span v-if="(item.position=='1')||(item.position=='2')" class="status"><img src="../../assets/main/mine/status_yellow.png" alt=""><i class="f16">{{['一般理财师','大区经理'][parseInt(item.position)-1]}}</i></span></h2>
        <p class="f24">{{item.pic}}</p>
        <p class="f24" v-if="item.mobile">手机号 {{item.mobile | desensitization}}</p>
      </div>
      <span class="qrcode flex">
          <img src="../../assets/main/mine/qrcode.png" alt="" class="qrcode_icon">
          <img src="../../assets/common/arrow-transparent-right.png" alt="" class="arrow-transparent">
        </span>
    </div>-->
		<!--菜单栏-->
		<!--<ul class="item" v-for="i in menu" v-if="menu.length">
      <li v-for="j in i" class="flex border-notend-b" @click="$go(j.icon==='join' ? j.url : `/mine/${j.url}`)">
        <img :src="require(`@/assets/main/mine/${j.icon}.png`)" alt="" class="icon">
        <span class="name f32">{{j.name}}</span>
        <span class="f28 color_font-s" v-if="!j.url">敬请期待</span>
        <img src="../../assets/common/arrow-right.png" alt="" class="arrow">
      </li>
    </ul>-->
		<!--<p class="RiskTips">————<i>出借有风险，选择需谨慎</i>————</p>-->
	</div>
</template>

<script>
	import '@/lib/swiper/swiper.css'
	const Swiper = require("@/lib/swiper/swiper").Swiper;
	import {
		mapActions
	} from 'vuex'
	import {
		searchUserInfo,
		searchUserCouponInfo,
		searchCouponReceiveDetails,
		getPromiseInviteList,
		searchMyManagerUserInfo,
		getUserStatus,
		inviteFriend
	} from '@/service'
	export default {
		name: 'mine',
		data() {
			return {
				item: {},
				menu: [],
				haveMangeBol: true,
				manageMes: {},
				nextBol: false,
				isManage: false, //区别理财师，客户
				giftList: [], //我的礼物
				promiseItem: {
					type: 1,
					pageIndex: 1,
				}, //履约参数
				promiseList: {}, //履约数据
				promiseInviteList: [], //履约列表
				userCode: '',
				inviteId: '',
				menu_normal: [{
						icon: 'mine',
						name: '我的理财师',
						url: 'master'
					}, {
						icon: 'join',
						name: '加盟成为理财师',
						url: '/home/joinFinlManager'
					}

				],
				menu_manage: [{
						icon: 'mine',
						name: '我的理财师',
						url: 'master'
					},
					{
						icon: 'have',
						name: '我的客户',
						url: 'customer?rollType=1'
					}, {
						icon: 'customer',
						name: '推广记录',
						url: 'extension'
					}
				],
				statusItem: {},
			}
		},
		created() {
			this.init();
			this.mgGift();
			this.getPromiseInviteList();
			searchMyManagerUserInfo().then(r => {
				this.manageMes = r;
				this.haveMangeBol = !this.haveMangeBol;
			});
			inviteFriend({
				channel: 1
			}).then(r => {
				this.inviteId = r.inviteId;
			});

			getUserStatus().then(res => {

				if(res.code == "100") {
					const info = res.result;
					if(info.openAccountStatus == "3") {
						this.nextBol = true;
					} else {
						this.nextBol = false;
					}
					this.statusItem = res.result;
				} else if(res.code == "1210" || res.code == "1000") {
					this.$go('/login');
				} else {
					this.$toask(res.message);
				}

			});
		},
		mounted() {

			/*banner*/
			var swiper = new Swiper(".swiper-container", {
				spaceBetween: 0,
				centeredSlides: true,
				//				autoplay: {
				//					delay: 2000,
				//					disableOnInteraction: false
				//				},
				pagination: {
					el: ".swiper-pagination",
					clickable: true
				},
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev"
				}
			});

		},
		methods: {
			...mapActions([
				'set_user_info',
			]),
			//履约
			getPromiseInviteList() {
				getPromiseInviteList(this.promiseItem).then(res => {
					this.promiseList = res;
					this.promiseInviteList = this.promiseInviteList.concat(res.promiseInviteList.slice(0, 3));
				});
			},
			invitateFriend() {
				window.location.href = window.location.origin + '/mine/invitation?userCode=' + this.userCode + '&inviteId=' + this.inviteId + '';
			},
			init() {
				searchUserInfo().then(r => {
					this.item = r;
					this.userCode = r.userCode;

					this.menu = r.flag === 1 ? this.menu_manage : this.menu_normal;
					this.isManage = r.flag === 1 ? true : false;
					this.set_user_info(r);

				})
			},
			//我的礼物
			mgGift() {
				searchUserCouponInfo({
					type: 2,
					status: 2,
					pageIndex: 1,
				}).then(res => {
					this.giftList = res;
				})
			},
			//领取礼物
			getGift(index, couponNo, receiveNo) {

				searchCouponReceiveDetails({
					receiveNo,
					couponNo
				}).then(res => {
					this.giftList.unreceivedCount -= 1;
					this.giftList.couponList.splice(index, 1);
				});
			},
			buyBid(item) {
				const i = item;
				const info = this.statusItem;

				if(info.openAccountStatus == "1") {
					//未开户
					this.$go('/reg_bank');
				} else if(info.openAccountStatus == "4") {
					//激活

					userActivate({
						retUrl: location.origin + location.pathname
					}).then(res => {
						axios({
							method: 'post',
							url: location.origin + new URL(res.serviceUrl).pathname,
							data: res.inMap,
							transformRequest: [function(data) {
								let ret = '';
								for(let it in data) {
									ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
								}
								return ret.slice(0, ret.length - 1)
							}],
						}).then(r => {
							if(r.status === 200) {
								if(r.data) {
									document.body.innerHTML = r.data;
									setTimeout(() => {
										document.form.submit()
									}, 0)
								}
							}
						})
					})

				} else {
					//电子签约
					if(info.autoBuyBidGrantFlag == "1") {

						//复投
						if(info.autoBuyBidFlag == "1") {

							//风险测评

							if(info.riskRatingFlag == "1") {

								this.$go('/prod/buyBid', {
									bidNo: i.bidNo,
									promiseInviteId: i.promiseInviteId,
									backTitle: '确认履约',
									inviteAmount: i.inviteAmount
								});

							} else {
								this.$go('/wealth/riskTest');
							}

						} else {
							this.$go('/wealth/autoInvest');
						}

					} else {
						this.$go('/wealth/autoInvest');
					}

				}

			}
			//			deleat(i){
			//				 
			//			}

		},
		watch: {}
	}
</script>

<style lang="scss" scoped>
	.gg {
		bottom: 0;
	}
	
	.mine {
		margin: 0 auto;
		padding: 0;
		width: 7.5rem;
		background-color: #f6f5f5;
		/*padding-bottom: 1.4rem;*/
		&-title {
			margin: .4rem .3rem 0;
			width: 6.9rem;
			line-height: .36rem;
			overflow: hidden;
			i {
				font-style: inherit;
				font-size: .28rem;
				color: #999999;
				margin-left: .16rem;
				em {
					font-style: inherit;
					color: #FF7553;
				}
			}
			span {
				float: right;
			}
		}
		&-top {
			width: 7.5rem;
			/*height: 1.56rem;*/
			background-color: #fff;
			overflow: hidden;
			&-mes {
				float: left;
				margin: 0 .3rem;
				width: 6.9rem;
				background-color: #fff;
				&-p1 {
					margin: 0 0 .3rem 1.2rem;
					text-align: left;
				}
				&-p2 {
					margin: 0 0 .3rem 1.2rem;
					text-align: left;
					width: 4.96rem;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
			&-user {
				float: left;
				margin: .28rem .30rem;
				width: 4.06rem;
				height: 1.0rem;
				background-color: #F5FAFF;
				border-radius: 1.0rem;
				overflow: hidden;
				img {
					float: left;
					width: 1.0rem;
					height: 1.0rem;
					background-size: 100% 100%;
					margin-right: .2rem;
				}
				&-p1 {
					float: left;
					width: 2.8rem;
					/*margin: .14rem 0 .18rem;*/
					text-align: left;
					line-height: 1.0rem;
					span {
						margin-left: .2rem;
					}
				}
				&-p2 {
					float: left;
					width: 2.8rem;
					text-align: left;
					line-height: .28rem;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
			&-ewm {
				float: right;
				text-align: right;
				&-img1 {
					margin: .56rem .44rem .56rem 0;
					width: .44rem;
					height: .44rem;
					background-size: 100% 100%;
				}
				&-img2 {
					margin: .66rem .30rem .66rem 0;
					width: .14rem;
					height: .24rem;
					background-size: 100% 100%;
				}
			}
		}
		&-gift {
			width: 7.5rem;
			background-color: #fff;
			overflow: hidden;
			margin-top: .16rem;
			&-list {
				margin: 0.4rem 0 .4rem 0.3rem;
				display: -webkit-box;
				overflow-x: scroll;
				-webkit-overflow-scrolling: touch;
				&-card {
					width: 3.8rem;
					height: 1.5rem;
					margin-right: .28rem;
					background: url(../../assets/main/mine/myCard.png) no-repeat 0 0;
					background-size: 100%;
					color: #FFFFFF;
					overflow: hidden;
					>p {
						float: right;
						width: 1.04rem;
						height: .48rem;
						background-color: #fff;
						text-align: center;
						color: #FF7553;
						line-height: .48rem;
						border-radius: .48rem;
						margin: .5rem 0.36rem .5rem 0;
					}
					>div {
						float: left;
						p:nth-child(1) {
							padding: .34rem 0 .2rem .32rem;
							width: 2.08rem;
							text-align: left;
						}
						p:nth-child(2) {
							padding: 0 0 0 .64rem;
							width: 1.76rem;
							text-align: left;
						}
					}
				}
			}
			&-none {
				margin: .16rem .3rem;
				width: 6.9rem;
				overflow: hidden;
				img {
					float: left;
					width: 2.02rem;
					height: 1.52rem;
					background-size: 100% 100%;
					margin-left: 1.66rem;
				}
				p {
					float: right;
					margin: .48rem 0;
					width: 1.88rem;
					height: .56rem;
					line-height: .56rem;
					text-align: center;
					border: 1px solid #208AFF;
					color: #208AFF;
					box-sizing: border-box;
					border-radius: .56rem;
				}
				.concatP {
					float: right;
					margin: .48rem 0;
					width: 1.88rem;
					height: .56rem;
					line-height: .56rem;
					text-align: center;
					border: 1px solid #208AFF;
					color: #208AFF;
					box-sizing: border-box;
					border-radius: .56rem;
					a {
						text-decoration: none;
						color: #208AFF;
					}
				}
			}
		}
		&-join {
			margin: .44rem .3rem 1.08rem;
			width: 6.9rem;
			/*height: 3.52rem;*/
			background: url(../../assets/main/mine/lxcn.png) no-repeat 0 0;
			background-size: 100% 100%;
			box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.06);
			&-div {
				margin: 0 .3rem;
				width: 6.3rem;
				height: 2.64rem;
				text-align: left;
				border-bottom: 1px solid #E5E5E5;
				overflow: hidden;
				p:nth-child(1) {
					float: left;
					margin: .3rem 0;
					color: #666666;
					line-height: .28rem;
					width: 100%;
				}
				p:nth-child(2) {
					float: left;
					color: #FF5513;
					margin: 0 0 .28rem 0;
					width: 100%;
					text-align: left;
					font-size: .56rem;
					i {
						font-style: inherit;
						font-size: .36rem;
					}
				}
				p:nth-child(3) {
					float: left;
					width: 3.0rem;
					height: 1.0rem;
					text-align: left;
					line-height: .28rem;
				}
				p:nth-child(4) {
					float: left;
					width: 3.0rem;
					height: 1.0rem;
					text-align: left;
				}
				&-span1 {
					display: inline-block;
					color: #999999;
					margin-bottom: .2rem;
					text-align: left;
				}
				&-span2 {
					display: inline-block;
					width: 3.0rem;
					color: #666;
					text-align: left;
				}
			}
			&-p {
				margin: 0 .3rem;
				height: .87rem;
				line-height: .87rem;
				overflow: hidden;
				span:nth-child(1) {
					float: left;
				}
				span:nth-child(2) {
					margin: .16rem 0;
					float: right;
					width: 1.96rem;
					height: .52rem;
					line-height: .52rem;
					text-align: center;
					color: #208AFF;
					background-color: rgb(222, 237, 255);
					border: 1px solid rgb(187, 218, 253);
					border-radius: .52rem;
					display: flex;
					align-items: center;
					justify-content: center;
					position: relative;
					a {
						position: absolute;
						z-index: 2;
						width: 100%;
						height: 100%;
					}
					img {
						margin: .11rem .12rem;
						width: .3rem;
						height: .3rem;
						background-size: 100% 100%;
					}
				}
			}
		}
		&-list {
			margin-top: .16rem;
			width: 7.5rem;
			background-color: #fff;
			/*margin-bottom: 1.4rem;*/
			.borderB {
				border-bottom: 1px solid #E5E5E5;
			}
			p {
				margin: 0 .3rem;
				width: 6.9rem;
				height: 1.0rem;
				line-height: 1.0rem;
				overflow: hidden;
				span {
					float: left;
				}
				img {
					float: right;
					margin: .38rem 0;
					width: .14rem;
					height: .24rem;
					background-size: 100% 100%;
				}
			}
		}
	}
</style>
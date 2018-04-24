<template>
	<div class="invite">
		<div class="invite-top borderB">
			<div class="invite-top-div1 f28">
				<span class="span1">1</span>
				<span class="span2"></span>
				<span class="span1">2</span>
				<span class="span2"></span>
				<span class="span1">3</span>
			</div>
			<div class="invite-top-div2 f28">
				<span class="span1">选择邀约客户</span>
				<span class="span1">选择邀约客户</span>
				<span class="span2">发起邀约</span>
			</div>
		</div>

		<div class="invite-mes f28 borderB" @click="linkto()">
			<span>邀约客户</span>
			<span v-if="name==''&& phone==''" class="span1 color_font-99" >点击选择邀约客户</span>
			<span v-else class="span1">{{name|nameDesensitization}}&nbsp;&nbsp;{{phone|desensitization}}</span>
			<!--<span></span>-->
			<img src="../../assets/common/arrow-right.png" />
		</div>
		<div class="invite-mes f28 borderB">
			<span>推荐金额</span>
			<input type="tel" v-model.number="item.inviteAmount" maxlength="10" oninput="if( ! /^-?\d+\.?\d{0,2}$/.test(this.value)){ var s = this.value;this.value=s.substring(0,s.length-1);}" :placeholder="`${detail.investMinAmount}元起，${detail.investAscendingAmount}元递增`"/>
		</div>
		<div class="invite-mes f28 borderB">
			<span>推荐描述</span>
			<input type="text" v-model="item.remork" maxlength="20" placeholder="用一句话激励客户去履约 (选填)" />
		</div>
		<p class="invite-mes-p f28 color_font-99">20字以内</p>

		<button class="btn invite-btn" :class="name && phone && item.inviteAmount?'':'dis'"  @click="sumit" >发起邀约</button>
	</div>
</template>

<script>
	import {
		promiseInvite,
		searchProductBidsDetail
	} from '@/service'
	
	import {
		mapActions,
		mapMutations
	} from 'vuex'
	export default {

		name: 'invite',

		data() {
			return {
				item: {
					beUserCode: '',
					inviteAmount: '',
					productName: '',
					productNo: '',
					bidNo: '',
					bidName: '',
					remork:  '',
				},
				detail: '',
				bidItem: {
					bidNo: this.$route.query.bidNo,
				},
				 name:'',
        			 phone:'',
			}
		},
		created() {
				this.RESET('succ_page');
				const {
				data,
				name,
         		phone,
         		userCode,
			} = this.$route.query;
			// 如果有的话重新赋值
			if(data) {
				this.item = JSON.parse(decodeURIComponent(data));
				this.item.beUserCode = userCode;
				this.name= name;
				this.phone=phone;
//				this.tipsBol=!this.tipsBol;
				
			}
			searchProductBidsDetail(this.bidItem).then(res => {
				this.detail = res;
				this.item.productName=res.productName;
				this.item.productNo=res.productNo;
				this.item.bidNo=res.bidNo;
				this.item.bidName=res.bidName;
			});
		},
		methods: {
			...mapMutations([
				'RESET',
				'SET_SUCC_PAGE'
			]),
			linkto() {
				// 把当前的数据传过去，防止写完了点选择银行返回重新填写
				this.$go('/prod/selectUser', {
					backurl: this.$route.path,
					bidNo: this.$route.query.bidNo,
					data: encodeURIComponent(JSON.stringify(this.item))
				})
			},
			
			sumit(){
				promiseInvite(this.item).then(res => {
					
					if(res.code=="100"){
						let params = {
							"title": "恭喜，邀约成功",
							'sub_title': "您已成功邀约了客户"+this.name+" ",
							"btn_text": "继续邀约",
							"backurl": "/product",
							"sub_btn_text": "查看我的邀约",
							"sub_backurl": "/mine"
						};
						this.SET_SUCC_PAGE(params);
						this.$go('/static/succ');
					}
					
				});
			}

		},
		watch: {}

	}
</script>

<style lang="scss" scoped>
	.invite {
		margin: 0 auto;
		padding: 0;
		width: 7.5rem;
		overflow: hidden;
		&-top {
			float: left;
			margin: 0 .3rem;
			width: 6.9rem;
			overflow: hidden;
			&-div1 {
				float: left;
				margin: .6rem 0 0 0;
				padding: 0 .74rem;
				width: 5.42rem;
				color: #FFFFFF;
				.span1 {
					float: left;
					width: .48rem;
					height: .48rem;
					background: #208AFF;
					border-radius: .48rem;
					line-height: .48rem;
					text-align: center;
				}
				.span2 {
					margin: .24rem 0 0 0;
					float: left;
					width: 1.99rem;
					height: 1px;
					background: #208AFF;
				}
			}
			&-div2 {
				float: left;
				margin: .24rem 0 .6rem;
				padding: 0 .2rem;
				width: 6.5rem;
				display: flex;
				justify-content: space-between;
				color: #666666;
				.span1 {
					width: 1.7rem;
					text-align: center;
				}
				.span2 {
					width: 1.15rem;
					text-align: center;
				}
			}
		}
		&-mes {
			margin: 0 .3rem;
			width: 6.9rem;
			height: 1.0rem;
			display: flex;
			align-content: center;
			align-items: center;
			span {
				width: 1.58rem;
				text-align: left;
			}
			input {
				width: 5.18rem;
				font-size: .28rem;
				text-align: left;
			}
			.span1{
				width: 5.18rem;
				font-size: .28rem;
				text-align: left;
			}
			img {
				width: .14rem;
				height: .24rem;
				background-size: 100% 100%;
			}
			&-p {
				margin: .22rem .3rem 0;
				text-align: right;
			}
		}
		&-btn {
			margin: .6rem .3rem 0;
			width: 6.9rem;
		}
		.dis {
			background-color: #E5E5E5;
		}
	}
</style>
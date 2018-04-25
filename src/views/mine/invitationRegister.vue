<template>
	<div class="invitationRegister pageCenter">
		<img class="banner" src="../../assets/main/mine/banneryqhy@2x.png" />

		<div class="invitationRegister-div">

			<div class="invitationRegister-div-input borderB">
				<input type="tel" name="" id="" maxlength="11" v-model.number="item.mobile" placeholder="请输入手机号" />
			</div>
			<div class="invitationRegister-div-input borderB">
				<input type="text" name="" id="" maxlength="4" v-model.trim="item.imageCode" placeholder="请输入图中验证码" />
				<div class="invitationRegister-div-input-span">
					<img class="img1" :src="imageCode" :class="click_code?'':'dis'" @click="changeImgCode">
				</div>
			</div>
			<div class="invitationRegister-div-input borderB">
				<input type="tel" name="" id="" maxlength="6" v-model.trim="item.smsCode" placeholder="请输入短信验证码" />
				<div class="invitationRegister-div-input-span">
					<span class="f28" :class="click_code?'':'dis'" @click="sendCode">{{codeText}}</span>
				</div>
			</div>
			<div class="invitationRegister-div-input borderB">
				<input type="password" name="" id="" maxlength="12" v-model.trim="password" placeholder="请设置6~12位数字和字母组合" />
			</div>

			<div class="invitationRegister-div-input1">

				<img class="img2" v-if="checked" @click="checked=!checked" src="../../assets/common/check_succ.png" />
				<img class="img2" v-else @click="checked=!checked" src="../../assets/common/check_none.png" />
				<p class="color_font-s f24">我已阅读并同意 <span class="color_main" @click="protocol">《平台注册协议》</span></p>
			</div>

		</div>

		<button class="btn" :class="checked?'':'disable'" @click="submit">注册</button>

		<p class="tipsP f24 color_font-99 center">出借有风险，选择需谨慎</p>
		<p class="tipsP2 f24 color_font-99 center">上海中赢金融信息服务有限公司版权所有<br />沪ICP 13037072号-1</p>
	</div>
</template>

<script>
	import Protocol from '@/components/protocol'
	import {
		getValidateImage,
		sendSMS,
		login,
		registerForFriend

	} from '@/service'
	import {
		mapMutations,
		mapActions,
	} from 'vuex'

	export default {
		name: 'invitationRegister',
		data() {
			return {
				mobile: '',
				password: '',
				checked: true, // 同意复选框勾选
				codeText: '获取验证码', // 获取验证码提示
				num: 60, // 验证码倒计时
				click_code: true, // 短信按钮能否点击
				text: '', // 页面标题
				imageCode: '', // 图形验证码url
				item: {
					mobile: '',
					password: '',
					smsCode: '',
					imageCode: '',
					inviteId: this.$route.query.inviteId,
					inviteUserCode: this.$route.query.userCode,
					couponNo: '',
					beCouponNo: '',
					token: '',
				}

			}
		},
		computed: {},
		created() {
			// 开始清楚成功页面的缓存
			this.RESET('succ_page');
			this.changeImgCode();
		},
		mounted() {},
		components: {},
		methods: {
			...mapActions([
				'set_user',
			]),
			...mapMutations([
				'RESET',
				'SET_SUCC_PAGE',
			]),
			protocol() {
				this.$alert({
					type: 'protocol',
					content: Protocol
				})
			},
			/**
			 * 发送验证码
			 */
			sendCode() {
				if(!this.item.mobile) {
					this.$toask('手机号不能为空!');
					return
				}
				if(!(/^1\d{10}$/.test(this.item.mobile))) {
					this.$toask('手机号格式不正确!');
					return
				}
				// 验证图像验证码
				if(!this.item.imageCode) {
					this.$toask('图形验证码不能为空!');
					return
				}
				const params = {
					mobile: this.item.mobile,
					imageCode: this.item.imageCode,
					operationType: 'register'
				};
				sendSMS(params).then(() => {
					// 发送成功倒计时
					this.countdown();
					this.$toask('短信验证码发送成功!');
				})
			},
			/**
			 * 倒计时
			 */
			countdown() {
				this.click_code = !this.click_code;
				let time = setInterval(() => {
					this.num--;
					if(this.num < 0) {
						clearInterval(time);
						this.click_code = !this.click_code;
						this.codeText = '获取验证码';
						this.num = 60;
						return
					}
					this.codeText = `${this.num}s`;
				}, 1000)
			},
			/**
			 * 获取图像验证码
			 */
			changeImgCode() {
				getValidateImage().then(r => {
					console.log(r);
					this.imageCode = r;
				});
				this.item.imageCode = "";
			},
			/**
			 * 提交
			 */
			submit() {
				if(!this.item.imageCode) {
					this.$toask('图形验证码不能为空!');
					return
				}
				if(!this.item.smsCode) {
					this.$toask('短信验证码不能为空!');
					return
				}
				if(!this.password) {
					this.$toask('登录密码不能为空!');
					return
				}
				if(!(/^(?!^\d+$)(?!^[a-zA-Z]+$)(?!^_+$)[\d|a-zA-Z|_]{6,12}$/.test(this.password))) {
					this.$toask('密码格式不正确!');
					return
				}
				if(!this.checked) {
					this.$toask('请阅读并勾选《平台注册协议》!');
					return
				}
				// 加密
				let CryptoJS = require('@/lib/aes');
				this.item.password = CryptoJS.aes(this.password);
				this.item.token = sessionStorage.getItem("token");
				// 注册
				registerForFriend(this.item).then(() => {
					// 注册之后调用登录接口
					login({
						loading: true,
						mobile: this.item.mobile,
						password: this.item.password,
					}).then(res => {
						// 把返回的数据放入状态管理中
						this.set_user(res);
						let params = {
							"title": "恭喜您注册成功",
							"btn_text": "立即开通银行存管账户",
							"backurl": "/reg_bank",
							"sub_btn_text": "暂不",
							"sub_backurl": "/"
						};
						// 跳转成功页面
						this.SET_SUCC_PAGE(params);
						this.$go('/static/succ');
					})
				})
			},

		},
		watch: {}
	}
</script>

<style lang="scss" scoped>
	.disable {
		pointer-events: none;
		background-color: #E5E5E5;
	}
	
	.tipsP {
		margin: .24rem 0 .2rem;
		line-height: .24rem;
	}
	
	.tipsP2 {
		margin-bottom: .2rem;
		line-height: .24rem;
	}
	
	.invitationRegister {
		margin: 0 auto;
		padding: 0;
		width: 7.5rem;
		overflow: hidden;
		padding-bottom: 1.0rem;
		.banner {
			float: left;
			width: 7.5rem;
			height: 3.6rem;
			background-size: 100% 100%;
		}
		&-div {
			float: left;
			margin: 0.2rem .3rem .4rem;
			padding: .1rem 0.4rem;
			width: 6.1rem;
			height: 5.26rem;
			background: #FFFFFF;
			box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.06);
			border-radius: 8px;
			&-input {
				width: 6.1rem;
				height: 1.0rem;
				display: flex;
				align-items: center;
				justify-content: space-between;
				input {
					width: 4.06rem;
					font-size: .28rem;
					color: #666666;
					border: none;
					outline: none;
				}
				&-span {
					width: 2.04rem;
					display: flex;
					align-items: center;
					.img1 {
						width: 1.98rem;
						height: .72rem;
						background-size: 100% 100%;
					}
					.dis {
						pointer-events: none;
					}
					span {
						width: 2.04rem;
						height: .64rem;
						border: 1px solid #097DFF;
						color: #097DFF;
						border-radius: .64rem;
						text-align: center;
						line-height: .64rem;
					}
				}
			}
			&-input1 {
				width: 6.1rem;
				height: 1.0rem;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				.img2 {
					width: .32rem;
					height: .32rem;
					background-size: 100% 100%;
					margin-right: .2rem;
				}
			}
		}
		.btn {
			margin: 0 .3rem;
			padding: 0;
			width: 6.9rem;
		}
	}
</style>
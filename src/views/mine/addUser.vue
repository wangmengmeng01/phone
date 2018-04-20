<template>
	<div class="addUser">

		<div class="addUser-div borderB top">
			<p class="p1 f28 color_font-99">{{isManage?'理财师手机号码':'客户手机号码'}}</p>
			<p class="p2 f32 color_font-36">
				<input type="tel" maxlength="11" name="addMasterPhone" v-model="itemSms.mobile" oninput="if( ! /^-?\d+\.?\d{0,2}$/.test(this.value)){ var s = this.value;this.value=s.substring(0,s.length-1);}" :placeholder="`请输入${isManage?'理财师':'客户'}的手机号码`" />
			</p>
		</div>
		<div class="addUser-div borderB">
			<p class="p1 f28 color_font-99">短信验证码</p>
			<p class="p2 f32 color_font-36">
				<input type="tel" maxlength="6" name="addMasterPhone" v-model="mescode" oninput="if( ! /^-?\d+\.?\d{0,2}$/.test(this.value)){ var s = this.value;this.value=s.substring(0,s.length-1);}" placeholder="请输入短信验证码" />

				<span class="sendMes f28" @click="getToken" :class="click_code?'disableBtn':''">{{codeText}}</span>
			</p>
		</div>

		<button class="btn addUser-btn" @click="submit" :class="(itemSms.mobile && mescode)?'':'dis'">{{isManage?'确认添加理财师':'确认添加客户'}}</button>

		<div class="addUser-tips f28" style="color: #666666;">
			<p class="title f32 color_font-36">温馨提示</p>
			<p>请按一下步骤添加客户：</p>
			<p>1、输入{{isManage?'理财师':'客户'}}手机号</p>
			<p>2、点击发送短信验证码，系统会将验证码发送到{{isManage?'理财师':'客户'}}手机上</p>
			<p>3、从{{isManage?'理财师':'客户'}}处问得验证码并填入，点击添加按钮，即可完成上下线关系建立</p>
		</div>
	</div>
</template>

<script>
	import { getZwToken, sendMessage, updateUserForM, updateManagerUserForM } from '@/service'
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		name: 'addUser',
		data() {
			return {
				isManage: false,
				item: {},
				mescode: '', //短信验证码
				codeText: '获取验证码', // 获取验证码提示
				num: 60, // 验证码倒计时
				click_code: false, // 短信按钮能否点击
				smsSeq: '', //短信校验码
				messageCode: "",
				itemSms: {
					type: '1',
					mobile: "",
					token: "",
				}, //发送短信参数
			}
		},
		computed: {},
		created() {
			if(this.$route.query.isManage) {
				this.isManage = !this.isManage;
			}
		},
		mounted() {},
		components: {},
		methods: {
			...mapMutations([
				'SET_SUCC_PAGE'
			]),
			getToken() {
				if(!this.itemSms.mobile) {
					this.$toask('手机号不能为空!');
					return
				}
				if(!(/^1\d{10}$/.test(this.itemSms.mobile))) {
					this.$toask('手机号格式不正确!');
					return
				}
				getZwToken({
					type: 1
				}).then(res => {
					this.itemSms.token = res.token;
					console.log(this.itemSms.token);
					this.sendMess();
				})
			},

			sendMess() {
				this.smsSeq = '';
				sendMessage(this.itemSms).then(res => {
					if(res.code == "100") {
						this.$toask('短信验证码已发送');
						this.countdown();

					} else if(res.code == "1000") {
						this.$go('/login');
					} else {
						this.$toask(res.message);
					}

				});
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
					this.codeText = `发送(${this.num})`;
				}, 1000)
			},
			submit() {
				if(!this.itemSms.mobile) {
					this.$toask('手机号不能为空!');
					return
				}
				if(!(/^1\d{10}$/.test(this.itemSms.mobile))) {
					this.$toask('手机号格式不正确!');
					return
				}
				if(!this.mescode) {
					this.$toask('短信验证码不能为空!');
					return
				}
				if(this.isManage) {
					updateManagerUserForM({
						messageCode: this.mescode,
						token: this.itemSms.token,
						mobile: this.itemSms.mobile,
					}).then(res => {
						let params = {
							"title": "恭喜，添加成功",
							'sub_title': "你已经成功添加了理财师",
							"btn_text": "返回",
							"backurl": "/mine",
							"sub_btn_text": "",
							"sub_backurl": "/"
						};
						this.SET_SUCC_PAGE(params);
						this.$go('/static/succ');
					});
				} else {
					updateUserForM({
						messageCode: this.mescode,
						token: this.itemSms.token,
						mobile: this.itemSms.mobile,
					}).then(res => {
						let params = {
							"title": "恭喜，添加成功",
							'sub_title': "你已经成功添加了客户",
							"btn_text": "返回",
							"backurl": "/mine",
							"sub_btn_text": "",
							"sub_backurl": "/mine"
						};
						this.SET_SUCC_PAGE(params);
						this.$go('/static/succ');
					});
				}

			}
		},
		watch: {}
	}
</script>

<style lang="scss" scoped>
	.addUser {
		margin: 0 auto;
		padding: 0;
		width: 7.5rem;
		overflow: hidden;
		.top {
			margin-top: .58rem;
		}
		&-tips {
			margin: 0 .3rem 0 .48rem;
			width: 6.72rem;
			.title {
				margin: 0 0 .28rem 0;
				line-height: .32rem;
			}
			p {
				line-height: .44rem;
				text-align: justify;
			}
		}
		&-btn {
			float: left;
			margin: 1.2rem .3rem;
			width: 6.9rem;
		}
		.disableBtn {
			pointer-events: none;
		}
		.dis {
			background-color: #E1E1E1;
			pointer-events: none;
		}
		&-div {
			float: left;
			margin: 0 .3rem;
			width: 6.9rem;
			height: 1.52rem;
			overflow: hidden;
			.p1 {
				float: left;
				width: 6.9rem;
				line-height: .28rem;
				margin-top: .52rem;
			}
			.p2 {
				float: left;
				width: 6.9rem;
				line-height: .32rem;
				margin: .18rem 0 .22rem;
				position: relative;
				input {
					float: left;
					width: 4.0rem;
					border: none;
					line-height: .32rem;
					text-align: left;
					font-size: .32rem;
				}
				.sendMes {
					position: absolute;
					right: 0;
					bottom: .2rem;
					width: 2.04rem;
					height: .64rem;
					border: 1px solid #208AFF;
					color: #208AFF;
					border-radius: .64rem;
					text-align: center;
					line-height: .64rem;
				}
			}
		}
	}
</style>
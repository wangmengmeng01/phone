<template>
	<div class="reg_bank pageCenter" v-show="!$route.query.MerPriv">
		<!--<h2 class="text color-font">填写开户信息</h2>
    <p class="text2 f28 color_font-s">请填写开通银行存管账户所需信息（须绑定储蓄卡）</p>
    <div class="name item flex border-b">
      <span class="f36 color_font">姓名</span>
      <input type="text" placeholder="请输入持卡人姓名" class="f32 color_border color_font">
    </div>
    <div class="idcard item flex phone border-b">
      <span class="f36 color_font">身份证</span>
      <input type="tel" placeholder="请输入18位二代身份证号码" class="f32 color_border color_font" >
    </div>
    <div class="bank item flex phone border-b"">
      <span class="f36 color_font">开户银行</span>
      <div class="flex choose_bank">
        <input type="text" placeholder="请选择开户银行" class="f32 color_border color_font"  readonly>
        <img src="../assets/common/arrow-right.png" alt="" class="arrow">
      </div>
    </div>
    <div class="bankid item flex phone border-b">
      <span class="f36 color_font">银行卡号</span>
      <input type="number" placeholder="请输入本人的银行卡号" class="f32 color_border color_font" >
    </div>
    <div class="phone item flex phone border-b">
      <span class="f36 color_font">银行预留手机号</span>
      <input type="tel" placeholder="请输入银行预留手机号" class="f32 color_border color_font" >
    </div>
    <div class="smscode item flex phone border-b">
      <input type="tel" placeholder="请输入短信验证码" class="f32 color_border color_font" ">
      <span class="f28 color_main">{{codeText}}</span>
    </div>
    <button class="btn">下一步</button>-->

		<div class="reg_bank-tips f28">
			<img src="../assets/wealth/dp.png" /> 您的个人信息受到保护中
		</div>
		<div class="reg_bank-bg">
			<p class="reg_bank-div  f28 color_font-36">
				<span class="reg_bank-div-s1">真实姓名</span>
				<input type="text"  v-model.trim="item.realName" class="reg_bank-div-s2 f28 input" name="" id="" maxlength="15"  placeholder="真实姓名需与身份证一致" />
			</p>
		</div>
		<div class="reg_bank-bg top">
			<p class="reg_bank-div borderB f28 color_font-36">
				<span class="reg_bank-div-s1">身份证号</span>
				<input type="text" class="reg_bank-div-s2 f28 input" name="" id="" v-model.trim="item.idno" maxlength="18" placeholder="请输入您的身份证号" />
			</p>
			<p class="reg_bank-div  f28 color_font-3" :class="tipsBol?'':'borderB'"  @click="linkto">
				<span class="reg_bank-div-s1">开户银行</span>
				<input type="text" class="reg_bank-div-s4 f28 input disableBtn" v-model.trim="bankName" name="" id="" maxlength="10"  placeholder="请选择" />
				<span class="reg_bank-div-s6"><img src="../assets/common/arrow-right.png"/></span>
			</p>
			<p v-show="tipsBol" class="reg_bank-div-tips f28 color_font-99">招商银行 单笔限额<i>5000元</i>，每日限额<i>50000元</i></p>
			<p class="reg_bank-div borderB f28 color_font-36" >
				<span class="reg_bank-div-s1">银行卡号</span>
				<input type="tel" class="reg_bank-div-s2 f28 input" v-model.trim="item.bankCardNo" name="" id="" maxlength="20" placeholder="请输入银行卡号" />
			</p>
			<p class="reg_bank-div borderB f28 color_font-36">
				<span class="reg_bank-div-s1">银行预留手机</span>
				<input type="tel" class="reg_bank-div-s2 f28 input" v-model.trim="item.mobile" maxlength="11" name="" id=""   placeholder="请输入手机号码" />
			</p>
			<p class="reg_bank-div f28 color_font-36">
				<span class="reg_bank-div-s1">验证码</span>
				<input type="tel" class="reg_bank-div-s4 f28 input" oninput="if( ! /^-?\d+\.?\d{0,2}$/.test(this.value)){ var s = this.value;this.value=s.substring(0,s.length-1);}" v-model.trim="item.smsCode" maxlength="6" placeholder="请输入短信验证码">
				<span class="reg_bank-div-s5 f28"  :class="click_code ? 'disableBtn' : ''" @click="sendCode">{{codeText}}</span>
			</p>
		</div>
		<button class="btn reg_bank-btn"   @click="submit" :class="(item.realName && item.idno && item.bankNo && item.bankCardNo && item.mobile && item.smsCode)?'':'dis'">下一步</button>
	</div>
</template>
<script>
	import {
		mapActions,
		mapMutations
	} from 'vuex'
	import {
		sendSmsCode,
		openAccount,
		getUserStatus,
		userActivate
	} from '@/service'
	import axios from 'axios'
	export default {
		name: 'reg_bank',
		data() {
			return {
				tipsBol:false,
				codeText: '获取验证码',
				num: 60,
				click_code: false,
				bankName: '', // 银行卡名
				item: {
					realName: '',
					idno: '',
					bankNo: '',
					bankCardNo: '',
					userType: '2',
					retUrl: '',
					smsSeq: '',
					smsCode: '',
					mobile: ''
				}
			}
		},
		created() {
			// 开始清楚成功页面的缓存
			this.RESET('succ_page');
			// 获取从选择银行卡页面返回的数据
			const {
				data,
				bankName,
				bankNo,
				MerPriv
			} = this.$route.query;
			// 如果有的话重新赋值
			if(data) {
				this.item = JSON.parse(decodeURIComponent(data));
				this.bankName = bankName;
				this.item.bankNo = bankNo;
//				this.tipsBol=!this.tipsBol;
				
			}
			const retUrl = this.item.retUrl = location.origin + location.pathname;
			// 表示从汇付返回的判断是否开户成功
			if(MerPriv) {
				getUserStatus().then(r => {
					r = r.result;
					// 未开户
					if(r.openAccountStatus == '1') {
						this.SET_SUCC_PAGE({
							"title": "开户失败",
							"sub_title": "请检查您所录入的开户信息",
							"btn_text": "重新提交",
							"backurl": "/reg_bank",
							"sub_btn_text": "暂不",
							"sub_backurl": "/"
						});
						this.$go('/static/fail');
					}

					// 已开户
					if(r.openAccountStatus == '3') {
						this.SET_SUCC_PAGE({
							"title": "恭喜，开通银行存管账户成功",
							"btn_text": "立即充值",
							"backurl": "/recharge",
							"sub_btn_text": "暂不",
							"sub_backurl": "/"
						});
						this.$go('/static/succ');
					}

					// 待激活
					if(r.openAccountStatus == '4') {
						userActivate({
							retUrl
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
					}
				})
			}
		},
		methods: {
			...mapMutations([
				'RESET',
				'SET_SUCC_PAGE'
			]),
			/**
			 * 跳转选择银行
			 */
			linkto() {
				// 把当前的数据传过去，防止写完了点选择银行返回重新填写
				this.$go('/bank/choose', {
					backurl: this.$route.path,
					data: encodeURIComponent(JSON.stringify(this.item))
				})
			},
			/**
			 * 发送短信
			 */
			sendCode() {
				if(!this.item.mobile) {
					this.$toask('手机号码不能为空!');
					return
				}
				if(!(/^1\d{10}$/.test(this.item.mobile))) {
					this.$toask('手机号格式不正确!');
					return
				}
				if(!this.item.bankCardNo) {
					this.$toask('银行卡号不能为空!');
					return
				}
				const params = {
					smsTempType: '',
					mobile: this.item.mobile,
					bankCardNo: this.item.bankCardNo,
					busiType: 'user_register'
				};
				sendSmsCode(params).then(r => {
					this.item.smsSeq = r.smsSeq;
					this.item.smsSeq = 'AAAAAAAA';
					// 倒计时
					this.countdown()
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
					this.codeText = `发送(${this.num})`;
				}, 1000)
			},
			/**
			 * 提交
			 */
			submit() {
				if(!this.item.realName) {
					this.$toask('姓名不能为空!');
					return
				}
				if(!this.item.idno) {
					this.$toask('身份证号不能为空!');
					return
				}
				if(!(/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(this.item.idno))) {
					this.$toask('身份证号码格式不正确!');
					return
				}
				if(!this.item.bankNo) {
					this.$toask('请选择开户银行!');
					return
				}
				if(!this.item.bankCardNo) {
					this.$toask('银行卡号不能为空!');
					return
				}
				if(!(/^\d{16,30}$/.test(this.item.bankCardNo))) {
					this.$toask('银行卡号格式不正确!');
					return
				}
				if(!this.item.mobile) {
					this.$toask('银行预留手机号不能为空!');
					return
				}
				if(!(/^1\d{10}$/.test(this.item.mobile))) {
					this.$toask('手机号格式不正确!');
					return
				}
				if(!this.item.smsCode) {
					this.$toask('短信验证码不能为空!');
					return
				}
				this.item.retUrl = location.origin + location.pathname;
				// 开户
				openAccount(this.item).then(res => {
					// 调用汇付先清除地址栏的参数
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
			},
		}
	}
</script>

<style lang="scss" scoped>
	.dis {
		pointer-events: none;
	}
	
	.reg_bank {
		&-tips {
			width: 7.5rem;
			height: .9rem;
			background: #F5FAFF;
			color: #208AFF;
			display: flex;
			justify-content: center;
			align-items: center;
			img {
				width: .28rem;
				height: .32rem;
				background-size: 100% 100%;
				margin-right: .1rem;
			}
		}
		&-bg {
			background-color: #FFFFFF;
		}
		.top {
			margin-top: .16rem;
		}
		&-div {
			margin: 0 .3rem;
			width: 6.9rem;
			height: 1.0rem;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			position: relative;
			&-tips {
				padding: 0 .3rem;
				width: 6.9rem;
				height: .8rem;
				line-height: .8rem;
				text-align: right;
				background-color: #F6F5F5;
				i {
					color: #FB613B;
					font-style: inherit;
				}
			}
			&-s1 {
				width: 2.26rem;
				text-align: left;
			}
			&-s2 {
				width: 4.04rem;
			}
			&-s3 {
				width: .56rem;
				color: #2170FF;
			}
			&-s4 {
				width: 2.50rem;
			}
			&-s5 {
				position: absolute;
	  			top: 0.24rem;
	  			right: 0;
				width: 1.82rem;
				color: #2170FF;
				height: .52rem;
				line-height: .52rem;
				text-align: center;
				border: 1px solid #2170FF;
				border-radius: .52rem;
			}
			&-s6 {
				position: absolute;
	  			top: 0;
	  			right: 0;
				width: 1.82rem;
				height: 1.0rem;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				img {
					width: .12rem;
					height: .2rem;
					background-size: 100% 100%;
				}
			}
			input {
				border: none;
				background-color: #fff;
				text-align: left;
				width: 4.04rem;
			}
		}
		&-btn {
			position: fixed;
			z-index: 100;
			left: 0;
			right: 0;
			bottom: .4rem;
			margin: 0 .3rem;
			width: 6.9rem;
		}
		.dis {
			background-color: #E5E5E5;
			pointer-events: none;
		}
		.disableBtn {
			pointer-events: none;
		}
	}
</style>
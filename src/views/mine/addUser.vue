<template>
  <div class="qrcode">  
    <div class="addMaster">
    	 <p class="addMasterPhone  f48 color-font center"></p>
    	 <div class="addMaster-div">
    	 	<span class="f36 color-font addMaster-div-span">请输入客户手机号码:</span>
    	 	<input type="tel" class="f36 color-font" maxlength="11" name="addMasterPhone"  v-model="itemSms.mobile" placeholder="请输入客户的手机号码" oninput="if( ! /^-?\d+\.?\d{0,2}$/.test(this.value)){ var s = this.value;this.value=s.substring(0,s.length-1);}"/>
    	 </div>
    	 <div class="addMaster-div">
    	 	<input type="tel" class="f36 color-font" maxlength="6" name="addMasterPhone"  v-model="mescode"  placeholder="请输入短信验证码" oninput="if( ! /^-?\d+\.?\d{0,2}$/.test(this.value)){ var s = this.value;this.value=s.substring(0,s.length-1);}" />
    	 	<span class="sendBtn f28 center"   @click="getToken" :class="click_code?'disableBtn':''">{{codeText}}</span>
    	 </div>
    	 <button class="btn f36" @click="submit" :class="(itemSms.mobile && mescode)?'':'disable'">确认添加客户</button>
    	 <div class="f24 color-font wordTips">
	 	 <p>温馨提示：请按以下步骤添加客户</p>
		<p>1、输入客户手机号</p>
		<p>2、点击发送短信验证码，系统会将验证码发到客户手机上</p>
		<p>3、从客户处问得验证码并填入，点击添加按键，即可完成上下线关系建立</p>
    	 </div>
    </div>
  </div>
</template>

<script>
  import { getZwToken , sendMessage, updateUserForM} from '@/service'
   import {
    mapGetters,
    mapMutations
  } from 'vuex'
  export default {
	name: 'addUser',
	data() {
		return {
			item: {},
			mescode: '', //短信验证码
			codeText: '获取短信验证码', // 获取验证码提示
			num: 60, // 验证码倒计时
			click_code: false, // 短信按钮能否点击
			smsSeq: '', //短信校验码
			messageCode:"",
			itemSms: {
				type: '1',
				mobile: "",
				token: "",
			}, //发送短信参数
		}
	},
	created() {
	},
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
					this.codeText = '获取短信验证码';
					this.num = 60;
					return
				}
				this.codeText = `发送(${this.num})`;
			}, 1000)
		},
		submit(){
			if(!this.itemSms.mobile) {
				this.$toask('手机号不能为空!');
				return
			}
			if(!(/^1\d{10}$/.test(this.itemSms.mobile))) {
				this.$toask('手机号格式不正确!');
				return
			}
			if (!this.mescode) {
	          this.$toask('短信验证码不能为空!');
	          return
	        }
			updateUserForM({
				messageCode:this.mescode,
				token:this.itemSms.token,
				mobile:this.itemSms.mobile,
			}).then(res => {
				 let params = {
		            "title": "恭喜，添加成功",
		            'sub_title': "你已经成功添加了客户",
		            "btn_text": "",
		            "backurl": "/",
		            "sub_btn_text": "返回",
		            "sub_backurl": "/mine"
		          };
		          this.SET_SUCC_PAGE(params);
		          this.$go('/static/succ');
			});
		}
	},
	watch: {}
}</script>

<style lang="sass" scoped>
  .qrcode
    height: 100%
    background: #fff
    .wordTips
     margin-top: .5rem
     padding: .2rem .4rem
     p
      line-height: .3rem
      text-align: left
    .addMaster
     padding-top: .2rem
     &-div 
      margin: .5rem .4rem
      overflow: hidden
      border-bottom: 1px solid #8D8D94
      position: relative
      .addMaster-div-span
       float: left
       display: block
       width: 6.7rem 
       text-align: left
       height: 1rem
       line-height: 1rem
      input
       float: left
       width: 6.7rem
       height: 1rem
       line-height: 1rem
      .sendBtn
       position: absolute 
       right: 0
       top: 0.24rem
       width: 2.46rem
       color: #3299D1
       height: 0.52rem
       line-height: 0.52rem
       background: rgba(240,240,248,1)
       border-radius: 32px
       
    a
      text-decoration: none
    .code
      text-align: center
      #code
        margin: 1rem auto .4rem
        width: 3.8rem
        height: 3.8rem
    .head
      background: #fff
      padding: .76rem .4rem .6rem
      align-items: flex-start
      .head_icon
        width: 1.16rem
        height: 1.16rem
      .msg
        flex: 1
        padding-left: .4rem
        h2
          justify-content: flex-start
          .status
            left: .1rem
            position: relative
            height: .38rem
            line-height: .38rem
            width: 1.54rem
            display: flex
            align-items: center
            justify-content: center
            i
              padding-left: .2rem
              position: relative
              z-index: 1
              font-style: normal
            img
              height: 100%
              width: 100%
              left: 0
              top: 0
              position: absolute
        p
          margin-top: .1rem
          line-height: .34rem
          &.img
            margin-top: 2.7rem
          &.flex
            justify-content: flex-start
          img
            width: .72rem
            padding-right: .1rem
    .btn
      border-radius: .36rem
      font-size: .36rem
      width: 4.8rem
      height: .72rem
      line-height: .72rem
      text-align: center
      margin: auto
      color: #fff
    .disable
     background: #98cceb 
  .none
    padding-top: 5rem
  .disableBtn
   pointer-events: none
</style>

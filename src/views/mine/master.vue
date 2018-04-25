<template>
<<<<<<< HEAD
  <div class="qrcode">
    <div v-if="item.mobile">
      <div class="head flex">
        <img :src="item.icon" alt="" class="head_icon place-img">
        <div class="msg">
          <h2 class="f36 flex"><span>{{item.realName}}</span><span v-if="(item.position=='1')||(item.position=='2')" class="status color_main"><img src="../../assets/main/mine/status_yellow.png" alt=""><i class="f12">{{['一般理财师','大区经理'][parseInt(item.position)-1]}}</i></span></h2>
          <p class="f24">{{item.department}}</p>
          <p class="f32 color_font-s">{{item.beInviteDate}} 成为我的理财师</p>
          <p class="img flex">
            <a class="color_font-s flex f44" :href="`tel:${item.mobile}`"><img src="../../assets/main/mine/phone.png" alt="">{{item.mobile}}</a>
          </p>
        </div>
      </div>
      <a class="f36 btn" :href="`tel:${item.mobile}`">拨打电话</a>
    </div>
    
    <div  v-if="!item.mobile" class="addMaster">
    	 <p class="addMasterPhone  f48 color-font center"></p>
    	 <div class="addMaster-div">
    	 	<span class="f36 color-font addMaster-div-span">请输入理财师手机号码:</span>
    	 	<input type="tel" class="f36 color-font" maxlength="11" name="addMasterPhone"  v-model="itemSms.mobile" placeholder="请输入理财师的手机号码" oninput="if( ! /^-?\d+\.?\d{0,2}$/.test(this.value)){ var s = this.value;this.value=s.substring(0,s.length-1);}"/>
    	 </div>
    	 <div class="addMaster-div">
    	 	<input type="tel" class="f36 color-font" maxlength="6" name="addMasterPhone"  v-model="mescode"  placeholder="请输入短信验证码" oninput="if( ! /^-?\d+\.?\d{0,2}$/.test(this.value)){ var s = this.value;this.value=s.substring(0,s.length-1);}" />
    	 	<span class="sendBtn f28 center"   @click="getToken" :class="click_code?'disableBtn':''">{{codeText}}</span>
    	 </div>
    	 <button class="btn f36" @click="submit" :class="(itemSms.mobile && mescode)?'':'disable'">确认添加理财师</button>
    	 <div class="f24 color-font wordTips">
	 	 <p>温馨提示：请按以下步骤添加理财师</p>
		<p>1、输入理财师手机号</p>
		<p>2、点击发送短信验证码，系统会将验证码发到理财师手机上</p>
		<p>3、从理财师处问得验证码并填入，点击添加按键，即可完成上下线关系建立</p>
    	 </div>
    </div>
=======
  <div class="master">
    <!--<div v-if="item.mobile">
      <div class="head flex">
        <img :src="item.icon" alt="" class="head_icon place-img">
        <div class="msg">
          <h2 class="f36 flex"><span>{{item.realName}}</span><span v-if="(item.position=='1')||(item.position=='2')" class="status color_main"><img src="../../assets/main/mine/status_yellow.png" alt=""><i class="f12">{{['一般理财师','大区经理'][parseInt(item.position)-1]}}</i></span></h2>
          <p class="f24">{{item.department}}</p>
          <p class="f32 color_font-s">{{item.beInviteDate}} 成为我的理财师</p>
          <p class="img flex">
            <a class="color_font-s flex f44" :href="`tel:${item.mobile}`"><img src="../../assets/main/mine/phone.png" alt="">{{item.mobile}}</a>
          </p>
        </div>
      </div>
      <a class="f36 btn" :href="`tel:${item.mobile}`">拨打电话</a>
    </div>
    
    <div  v-if="!item.mobile" class="addMaster">
    	 <p class="addMasterPhone  f48 color-font center"></p>
    	 <div class="addMaster-div">
    	 	<span class="f36 color-font addMaster-div-span">请输入理财师手机号码:</span>
    	 	<input type="tel" class="f36 color-font" maxlength="11" name="addMasterPhone" value="" placeholder="请输入理财师的手机号码" />
    	 </div>
    	 <div class="addMaster-div">
    	 	<input type="tel" class="f36 color-font" maxlength="6" name="addMasterPhone" value="" placeholder="请输入短信验证码" />
    	 	<span class="sendBtn f28 center">发送短信验证码</span>
    	 </div>
    	 
    	 <button class="btn f36">确认添加理财师</button>
    	 	
    </div>
    -->
    
    <!-- 我的理财师-->
   <div class="master-mess" v-if="item.mobile">
   		<div class="master-mess-top">
   			<img src="../../assets/main/mine/lcs.png"/>
   			<p class="f36 center master-mess-top-p1">{{item.realName}}</p>
   			<p class="f28 center master-mess-top-p2">{{item.beInviteDate}}成为我的理财师</p>
   		</div>
   		<div class="master-mess-mess f30">
   			<p class="color_font-99">公司</p>
   			<p class="color_font-36">{{item.department}}</p>
   		</div>
   		<div class="master-mess-mess f30">
   			<p class="color_font-99">头衔</p>
   			<p class="color_font-36">{{item.position}}</p>
   		</div>
   		<div class="master-mess-mess f30">
   			<p class="color_font-99" id="line">电话</p>
   			<p class="color_font-36" id="line">{{item.mobile|desensitization}}</p>
   			<a :href="`tel:${item.mobile}`"><img src="../../assets/main/mine/call.png"/></a>

   		</div>
   </div>
   <!--暂无理财师-->
   <div class="master-none" v-if="!item.mobile">
   		<img src="../../assets/main/mine/zwkh.png"/>
   		<p class="f28">暂无理财师</p>
   		<div class="btn master-none-btn"  @click="$go('addUser',{backTitle:'添加理财师',isManage:0})">
   			添加理财师
   		</div>
   </div>
   
   
   
>>>>>>> test
  </div>
</template>

<script>
  import { searchMyManagerUserInfo , getZwToken , sendMessage, updateManagerUserForM} from '@/service'
   import {
    mapGetters,
    mapMutations
  } from 'vuex'
  export default {
<<<<<<< HEAD
	name: 'master',
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
		this.init();
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

		init() {
			searchMyManagerUserInfo().then(r => this.item = r);
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
			updateManagerUserForM({
				messageCode:this.mescode,
				token:this.itemSms.token,
				mobile:this.itemSms.mobile,
			}).then(res => {
				 let params = {
		            "title": "恭喜，添加成功",
		            'sub_title': "你已经成功添加了理财师",
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
=======
    name: 'master',
    data() {
      return {
        item: {},
      }
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        searchMyManagerUserInfo().then(r => {
        	this.item = r
        });
      }
    },
    watch: {}
  }
</script>

<style lang="scss" scoped>
 .master{
 	margin: 0 auto;
 	padding: 0;
 	width: 7.5rem;
 	&-mess{
 		width: 7.5rem;
 		&-top{
 			width: 7.5rem;
 			height: 3.9rem;
 			background: #207CFF;
 			img{
 				margin: .88rem 3.15rem .18rem;
 				width: 1.2rem;
 				height: 1.2rem;
 				background-size: 100% 100%;
 			}
 			&-p1{
 				color: #FFFFFF;
 				margin-bottom: .24rem;
 				line-height: .36rem;
 			}
 			&-p2{
 				color: #C6E1FF;
 				line-height: .28rem;
 			}
 		}
 		&-mess{
 			margin: .52rem .3rem 0;
 			width: 6.9rem;
 			overflow: hidden;
 			p:nth-child(1){
 				float: left;
 				width: .84rem;
 				line-height:.44rem ;
 				text-align: left;
 			}
 			p:nth-child(2){
 				float: left;
 				max-width: 6.06rem;
 				line-height: .44rem;
 			}
 			a{
 					float: right;
	 				width: .6rem;
	 				height: .6rem;
 				img{
	 				width: .6rem;
	 				height: .6rem;
	 				background-size: 100% 100%;
 				}	
 			}
 			
 			#line{
 				line-height: .6rem;
 			}
 		}
 	}
 	&-none{
 		width: 7.5rem;
 		img{
 			margin: 3.28rem 2.3rem 0;
 			width: 2.9rem;
 			height: 2.26rem;
 			background-size: 100% 100%;
 		}
 		>p{
 			margin: .5rem 0 .58rem;
 			color: #666666;
 			text-align: center;
 		}
 		&-btn{
 			width: 4.8rem;
 			margin: 0 1.35rem;
 		}
 	}
 }
>>>>>>> test
</style>

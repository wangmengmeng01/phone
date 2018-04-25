<template>
  <div class="login p4" @keyup.enter="submit">
  	<p class="text2 f36 color_font-s">{{text|desensitization}}</p>
    <p class="f28 color_font-99 left">图形验证码</p>
    <div class="item flex phone border-b">
      <div class="flex con">
        <input type="text"   placeholder="请输入图形验证码" class="f32" v-model.trim="item.imageCode" maxlength="4">
        <span class="imgcode" style=""><img :src="imageCode" alt="" @click="changeImgCode"></span>
      </div>
    </div>
    <p class="f28 color_font-99 left">短信验证码</p>
    <div class="item flex phone border-b">
      <div class="flex con">
        <input type="tel"   placeholder="请输入短信验证码" class="f32" v-model.trim="item.smsCode" maxlength="6">
        <span v-show="codeBol" class="f28 color_main smsCode center" @click="sendCode">获取验证码</span>
        <span v-show="!codeBol" class="f30 color_font-99 smsCode1 "> {{codeText}}</span>
      </div>
    </div>
     <p class="f28 color_font-99 left">密码</p>
    <div class="item flex phone border-b">
      <div class="flex con">
        <input type="text" :type="[passwordType?'password':'text']"  placeholder="请设置6~12位数字和字母组合" class="f32" v-model.trim="password" maxlength="12">
         <img :src="require(`@/assets/common/${passwordType?'eyebrow':'eyes'}.png`)" alt="" class="eyes" @click="passwordType=!passwordType">
      </div>
    </div>
    <button class="btn" :class="(item.imageCode.length>0 && item.smsCode.length>0 && password.length>0)?'':'dis'" @click="submit">下一步</button>
    
  </div>
</template>

<script>
 import {
    getValidateImage,
    sendSMS,
    register,
    login,
    forgetPassWord
  } from '@/service'
  import {
    mapMutations,
    mapActions
  } from 'vuex'
  export default {
    name: 'forget_pwd',
    data() {
      return {
        password: '',
        passwordType: true, // 密码显示隐藏
        checked: true, // 同意复选框勾选
        codeText: '', // 获取验证码提示
        codeBol:true,//显示倒计时
        num: 60, // 验证码倒计时
        click_code: false, // 短信按钮能否点击
        text: '', // 页面标题
        imageCode: '', // 图形验证码url
        item: {
          mobile: this.$route.query.mobile,
          password: '',
          smsCode: '',
          imageCode: '',
          inviteCode: ''
        }
      }
    },
    created() {
      // 开始清楚成功页面的缓存
      this.RESET('succ_page');
      // 如果没有手机号跳转到注册页面
      if (!this.item.mobile) {
        this.$go('register');
        return
      }
      // 判断是哪个忘记密码页面进来的还是注册页面进来的
      this.text = `${this.item.mobile}`;
      // 默认显示图片验证码
      this.changeImgCode();
    },
    methods: {
      ...mapActions([
        'set_user',
      ]),
      ...mapMutations([
        'RESET',
        'SET_SUCC_PAGE'
      ]),
      /**
       * 发送验证码
       */
      sendCode() {
        // 验证图像验证码
        if (!this.item.imageCode) {
          this.$toask('图形验证码不能为空!',"","85%","#FFD63D","#FE7C08 ");
          return
        }
        
//      console.log(this.$route.query.view);
        const params = {
          mobile: this.item.mobile,
          imageCode: this.item.imageCode,
          operationType: 'forget' 
        };
        sendSMS(params).then(() => {
          // 发送成功倒计时
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
          if (this.num < 0) {
            clearInterval(time);
            this.click_code = !this.click_code;
            this.codeText = '';
            this.codeBol=true;
            this.num = 60;
            return
          }
          this.codeText = `${this.num}s`;
           this.codeBol=false;
        }, 1000)
      },
      /**
       * 获取图像验证码
       */
      changeImgCode() {
        getValidateImage().then(r => this.imageCode = r);
        this.item.imageCode="";
      },
      /**
       * 提交
       */
      submit() {
        if (!this.item.imageCode) {
          this.$toask('图形验证码不能为空!',"","85%","#FFD63D","#FE7C08 ");
          return
        }
        if (!this.item.smsCode) {
          this.$toask('短信验证码不能为空!',"","85%","#FFD63D","#FE7C08 ");
          return
        }
        if (!this.password) {
          this.$toask('登录密码不能为空!',"","85%","#FFD63D","#FE7C08 ");
          return
        }
        if (!(/^(?!^\d+$)(?!^[a-zA-Z]+$)(?!^_+$)[\d|a-zA-Z|_]{6,12}$/.test(this.password))) {
          this.$toask('密码格式不正确!',"","85%","#FFD63D","#FE7C08 ");
          return
        }
        // 加密
        let CryptoJS = require('@/lib/aes');
        this.item.password = CryptoJS.aes(this.password);
        // 忘记密码
          forgetPassWord(this.item).then(() => {
            const {
              mobile,
              password
            } = this.item;
            // 注册之后调用登录接口
            login({
              mobile,
              password
            }).then(res => {
              // 把返回的数据放入状态管理中
//            this.set_user(res);
              let params = {
                "title": "登录密码修改成功",
                "sub_title": "使用您的新密码登录",
                "btn_text": "登录",
                "backurl": "/login"
              };
              // 跳转成功页面
              this.SET_SUCC_PAGE(params);
              this.$go('/static/succ');
            })
          });
      },
    }
  }
</script>

<style lang="sass" scoped>
.login
  background: #fff
  text-align: center
  height: 100%
  .text2
   padding: .6rem 0 1.0rem
   color: #363636 
  .loginp
   padding-top: 1.1rem
  .logo
    width: 3.84rem
    height: 2.46rem
    margin: 1.52rem 0 0.2rem
  .item
    text-align: left
    height: .72rem
    line-height: .72rem
    .con
      width: 6.5rem
      position: relative
      .imgcode
       position: absolute
       z-index: 5
       width: 1.98rem
       height: .72rem
       right: -0.52rem
      .smsCode
       position: absolute
       z-index: 5
       width: 2.04rem
       height: .64rem
       line-height: .64rem
       background-color: #ffffff
       border: 1px solid #208AFF 
       border-radius: .64rem
       right: 0
       bottom: .2rem
      .smsCode1
        text-align: right
    span
      flex: 1
    .del
      height: .28rem
      opacity: 0
    input
      display: inline-block
      max-width: 6rem
      width: 5rem
      color: #363636
      padding: 0
      &:focus ~ .del
        opacity: 1
    .eyes
      height: .44rem
  .phone
    margin-bottom: .52rem
  .btn
    margin-top: 1.2rem
    margin-bottom: .44rem
  .link
    .reg
      color: #3299D1
  .protocol
     display: flex
     align-items: center
     img
       height: .44rem
       width: .44rem
       margin-right: .2rem    
</style>

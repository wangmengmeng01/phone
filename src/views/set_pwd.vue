<template>
  <div class="register p4">
    <h2 class="text color-font">设置登录密码</h2>
    <p class="text2 f28 color_font-s">{{text}}</p>
    <div class="imgcode item flex phone border-b">
      <input type="text" placeholder="请输入图形验证码" class="f32 color_border" v-model="item.imageCode">
      <span class="f28 color_main"><img :src="imageCode" alt="" @click="changeImgCode"></span>
    </div>
    <div class="smscode item flex phone border-b">
      <input type="text" placeholder="请输入短信验证码" class="f32 color_border" v-model="item.smsCode">
      <span class="f28 color_main" @click="sendCode">获取短信验证码</span>
    </div>
    <div class="smscode item flex phone border-b">
      <input type="password" placeholder="请设置你的登录密码" class="f32 color_border" v-model="item.password">
    </div>
    <p class="tip f12 color_font-s">密码须为6～12位大小写字母、数字至少2</p>
    <button class="btn" @click="submit">注册</button>
  </div>
</template>

<script>
  import { getValidateImage, sendSMS, register } from '@/service'

  export default {
    name: 'register',
    data () {
      return {
        text: '',
        imageCode: '',
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
      if(!this.item.mobile){
        this.$go('register');
        return
      }
      this.text = !this.$route.query.view
        ? '输入正确的图形验证码后，可点击"获取短信验证码"获取验证码'
        : `输入正确的图形验证码后，可点击“获取短信验证码” 系统将向${this.item.mobile}发送短信`;
      this.changeImgCode();
    },
    methods: {
      sendCode(){
        if(!this.item.imageCode){
          this.$toask('图像验证码不能为空!');
          return
        }
        const params = {
          mobile: this.item.mobile,
          imageCode: this.item.imageCode,
          operationType: 'register'
        };
        sendSMS(params)
      },
      changeImgCode(){
        getValidateImage().then(r=>this.imageCode = r);
      },
      submit(){
        if(this.item.password){
          let CryptoJS= require('@/lib/aes');
          this.item.password = CryptoJS.aes(this.item.password);
        }
        register(this.item).then(()=>{
          this.$go('/static/succ', {view: this.$route.query.view})
        })
      },
    }
  }
</script>

<style lang="sass" scoped>
  .register
    .item
      span
        flex: 1
      input
        flex: 1.5
      margin-top: .6rem
      padding-bottom: .3rem
    .text
      margin-top: 1rem
      font-size: .6rem
    .text2
      line-height: .4rem
      margin-top: .26rem
    .btn
      margin-top: 1rem
    .tip
      margin: .2rem auto 1rem
    .imgcode
      span
        text-align: right
    .smscode
      span
        line-height: .52rem
        text-align: center
        background: #F0F0F8
        border-radius: .32rem
</style>

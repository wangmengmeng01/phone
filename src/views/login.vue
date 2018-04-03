<template>
  <div class="login p4" @keyup.enter="submit">
    <img src="../assets/user/logo.png" class="logo">
    <p class="color_main f28 loginp">银行存管账户，为您的资金保驾护航</p>
    
    <p class="f28 color_font-99 left">手机号</p>
    <div class="item flex phone border-b">
      <div class="flex con">
        <input type="tel" placeholder="请输入手机号"  onkeydown="if(value.length==3||value.length==8){value+=' '}" class="f32" v-model.trim="item.mobile" maxlength="13">
        <img src="../assets/common/del.png" alt="" class="del" @click="item.mobile=''">
      </div>
    </div>
    <button class="btn" :class="item.mobile.length>0?'':'dis'" @click="submit">{{text}}</button>
    
    <!--<div class="item flex password border-b">
      <span class="name f44 color-font">密码</span>
      <div class="flex con">
        <input :type="[checked?'password':'text']" placeholder="请输入登录密码" class="f44" v-model.trim="passWord">
        <img :src="require(`@/assets/common/${checked?'eyes':'eyebrow'}.png`)" alt="" class="eyes" @click="checked=!checked">
      </div>
    </div>
    
    
   
    <p class="link flex f32 color_font-s">
      <span class="forgetpwd" @click="$go('forget_pwd',{mobile: item.mobile})">忘记密码？</span>
      <span class="reg" @click="$go('register')">快速注册</span>
    </p>-->
  </div>
</template>

<script>
  import {
    mapActions,
    mapMutations
  } from 'vuex'
  import {
    login
  } from '@/service'
  export default {
    name: 'login',
    data() {
      return {
        checked: true, // 密码框的类型显示隐藏
        text: '登录', // 登录按钮文字提示
        item: {
          mobile: this.$route.query.mobile || '',
          password: '', //加密密码
        },
        passWord: '', //未加密密码
      }
    },
    created() {
      // 登录清除全部缓存数据
      this.RESET();
    },
    methods: {
      ...mapMutations([
        'RESET',
      ]),
      ...mapActions([
        'set_user',
      ]),
      /**
       * 提交
       */
      submit() {
        if (!this.item.mobile) {
          this.$toask('手机号不能为空!',"","90%","red");
          return
        }
        if (!this.passWord) {
          this.$toask('登录密码不能为空!');
          return
        }
        if (!(/^1\d{10}$/.test(this.item.mobile))) {
          this.$toask('手机号格式不正确!');
          return
        }
        if (!(/\w{6,12}$/.test(this.passWord))) {
          this.$toask('密码格式不正确!');
          return
        }
        this.text = '登录中...';
        let CryptoJS = require('@/lib/aes');
        this.item.password = CryptoJS.aes(this.passWord);
        // 登录
        login(this.item).then(res => {
          // 成功的话把返回的数据放到缓存中
          this.set_user(res);
          this.$go('/')
        }).catch(() => {
          //失败的话提示
          this.passWord = '';
          this.text = '重新登录';
        })
      },
    }
  }
</script>

<style lang="sass" scoped>
.login
  background: #fff
  text-align: center
  height: 100%
  .loginp
   margin-bottom: 0.86rem
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
    span
      flex: 1
    .del
      height: .28rem
      opacity: 0
    input
      display: inline-block
      max-width: 4rem
      color: #363636
      &:focus ~ .del
        opacity: 1
    .eyes
      height: .18rem
  .phone
    margin-bottom: .6rem
  .btn
    margin-top: 1rem
    margin-bottom: .4rem
  .link
    .reg
      color: #3299D1
</style>

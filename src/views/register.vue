<template>
  <div class="register p4">
    <h2 class="text color-font">快速注册</h2>
    <p class="text2 f28 color_font-s">录入手机号码将作为您的登录账号</p>
    <div class="item phone border-b">
      <span class="name f44 color_font">手机号</span>
      <input type="tel" placeholder="请输入手机号" class="f44" v-model.trim="mobile" maxlength="11">
      <img src="../assets/common/del.png" alt="" class="del" @click="mobile=''">
    </div>
    <button class="btn" @click="submit">下一步</button>
    <p class="gologin f32 color_main" @click="$go('login',{mobile})">已有账号，去登录</p>
  </div>
</template>

<script>
  export default {
    name: 'register',
    data () {
      return {
        mobile: sessionStorage.mobile || ''
      }
    },
    methods: {
      submit(){
        if(!this.mobile) {
          this.$toask('手机号不能为空!');
          return
        }
        if(!(/^1\d{10}$/.test(this.mobile))) {
          this.$toask('手机号格式不正确!');
          return
        }
        sessionStorage.mobile = this.mobile;
        this.$go('set_pwd',{mobile:this.mobile,view:'register'});
      },
    }
  }
</script>

<style lang="sass" scoped>
  .register
    height: 100%
    background: #fff
    .item
      overflow: hidden
      .name
        line-height: .4rem
        height: .4rem
        display: inline-block
        width: 2rem
        float: left
      .del
        line-height: .4rem
        height: .4rem
        float: right
        opacity: 0
      input
        line-height: .4rem
        height: .4rem
        width: 3rem
        display: inline-block
        float: left
        &:focus ~ .del
          opacity: 1
      margin-top: 1.4rem
      padding-bottom: .3rem
    .text
      padding-top: 1rem
      font-size: .6rem
    .text2
      margin-top: .26rem
    .btn
      margin-top: 1rem
    .gologin
      text-align: center
      margin-top: .4rem
</style>

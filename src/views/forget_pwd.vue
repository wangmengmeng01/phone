<template>
  <div class="forget_pwd p4">
    <h2 class="text color-font">修改登录密码</h2>
    <p class="text2 f28 color_font-s">请填写需要修改登录密码的手机号码</p>
    <div class="item flex phone border-b">
      <input type="tel" placeholder="请输入手机号" class="f44" v-model="mobile" maxlength="11">
    </div>
    <button class="btn" @click="submit">下一步</button>
  </div>
</template>

<script>
  export default {
    name: 'forget_pwd',
    data () {
      return {
        mobile: this.$route.query.mobile || ''
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
        this.$go('set_pwd',{mobile:this.mobile,view:'forget_pwd'});
      },
    }
  }
</script>

<style lang="sass" scoped>
  .forget_pwd
    height: 100%
    background: #fff
    .item
      span
        flex: 1
      input
        flex: 1.5
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

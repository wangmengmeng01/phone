<template>
  <div class="login p4" @keyup.enter="submit">
    <img src="../assets/user/logo.png" class="logo">
    <div class="item flex phone border-b">
      <span class="name f44 color-font">手机号</span>
      <input type="number" placeholder="请输入手机号" class="f44" v-model="item.mobile">
    </div>
    <div class="item flex password border-b">
      <span class="name f44 color-font">密码</span>
      <input type="password" placeholder="请输入登录密码" class="f44" v-model="item.password">
    </div>
    <button class="btn" @click="submit">登录</button>
    <p class="link flex f32 color_font-s">
      <span class="forgetpwd" @click="$go('forget_pwd')">忘记密码？</span>
      <span class="reg" @click="$go('register')">快速注册</span>
    </p>
    <foot-tip main="true"/>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { login } from '@/service'
  import footTip from '@/components/foot-tip/foot-tip'
  export default {
    name: 'login',
    data () {
      return {
        item: {
          mobile: '18202197847',
          password: 'a123456',
        }
      }
    },
    components: {
      "foot-tip" : footTip
    },
    methods: {
      ...mapActions([
        'deal_header',
      ]),
      submit(){
        if(this.item.password){
          let CryptoJS= require('@/lib/aes');
          this.item.password = CryptoJS.aes(this.item.password);
        }
        login(this.item).then(res=>{
          this.deal_header(res)
          this.$go('/webapp')
        })
      },
    }
  }
</script>

<style lang="sass" scoped>
.login
  text-align: center
  .logo
    width: 1.48rem
    margin: 1.2rem 0
  .item
    text-align: left
    span
      flex: 1
    input
      flex: 1.5
    padding-bottom: .3rem
  .phone
    margin-bottom: .6rem
  .btn
    margin-top: 1rem
    margin-bottom: .4rem
  .link
    .reg
      color: #3299D1
</style>

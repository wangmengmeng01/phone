<template>
  <div class="login p4" @keyup.enter="submit">
    <img src="../assets/user/logo.png" class="logo">
    <div class="item flex phone border-b">
      <span class="name f44 color-font">手机号</span>
      <input type="tel" placeholder="请输入手机号" class="f44" v-model="item.mobile" maxlength="11">
      <img src="../assets/common/del.png" alt="" class="del" @click="del">
    </div>
    <div class="item flex password border-b">
      <span class="name f44 color-font">密码</span>
      <input :type="[checked?'password':'text']" placeholder="请输入登录密码" class="f44" v-model="item.password">
      <img :src="require(`@/assets/common/${checked?'eyes':'eyebrow'}.png`)" alt="" class="eyes" @click="checked=!checked">
    </div>
    <button class="btn" @click="submit">{{text}}</button>
    <p class="link flex f32 color_font-s">
      <span class="forgetpwd" @click="$go('forget_pwd',{mobile: item.mobile})">忘记密码？</span>
      <span class="reg" @click="$go('register')">快速注册</span>
    </p>
  </div>
</template>

<script>
  import { mapActions, mapMutations } from 'vuex'
  import { login } from '@/service'
  export default {
    name: 'login',
    data () {
      return {
        checked: true,
        text: '登录',
        item: {
          mobile: this.$route.query.mobile || '18030003016',
          password: 'a123456',
        }
      }
    },
    created() {
      this.RESET();
    },
    methods: {
      ...mapMutations([
        'RESET',
      ]),
      ...mapActions([
        'set_user',
      ]),
      del(){
        this.item.mobile = '';
      },
      submit(){
        if(!this.item.mobile) {
          this.$toask('手机号不能为空!');
          return
        }
        if(!this.item.password) {
          this.$toask('登录密码不能为空!');
          return
        }
        if(!(/^1\d{10}$/.test(this.item.mobile))) {
          this.$toask('手机号格式不正确!');
          return
        }
        if(!(/^(?!^\d+$)(?!^[a-zA-Z]+$)(?!^_+$)[\d|a-zA-Z|_]{6,12}$/.test(this.item.password))) {
          this.$toask('密码格式不正确!');
          return
        }
        this.text = '登录中...';
        if(this.item.password){
          let CryptoJS= require('@/lib/aes');
          this.item.password = CryptoJS.aes(this.item.password);
        }
        login(this.item).then(res=>{
          this.set_user(res);
          this.$go('/')
        }).catch(()=>{
            this.item.password = '';
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
  .logo
    width: 1.48rem
    margin: 1.2rem 0
  .item
    text-align: left
    span
      width: 2rem
    input
      &:focus

      flex: 1
    padding-bottom: .3rem
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

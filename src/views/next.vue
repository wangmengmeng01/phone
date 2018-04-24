<template>
  <div class="login p4" @keyup.enter="submit">
    <p class="f28 color_font-99 left loginp">密码</p>
    <div class="item flex phone border-b">
      <div class="flex con">
        <input type="text" :type="[checked?'password':'text']"  placeholder="请输入登录密码" class="f32" v-model="passWord" maxlength="13">
        <img src="../assets/common/del.png" alt="" class="del" @click="item.mobile=''">
         <img :src="require(`@/assets/common/${checked?'eyebrow':'eyes'}.png`)" alt="" class="eyes" @click="checked=!checked">
      </div>
    </div>
    <button class="btn" :class="passWord.length>0?'':'dis'" @click="submit">{{text}}</button>
    
    <p class="f28 color_font-99 center" @click="$go('forget_pwd',{backTitle:'找回密码',mobile:item.mobile})">忘记密码?</p>
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
    name: 'next',
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
      this.item.mobile=this.$route.query.mobile;
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
        if (!this.passWord) {
          this.$toask('密码不能为空!',"","85%","#FFD63D","#FE7C08 ");
          return
        }
        if (!(/\w{6,12}$/.test(this.passWord))) {
          this.$toask('密码格式不正确!',"","85%","#FFD63D","#FE7C08 ");
          return
        }
        this.text = '登录中...';
        let CryptoJS = require('@/lib/aes');
        this.item.password = CryptoJS.aes(this.passWord);
        // 登录
        login(this.item).then(res => {
        	  this.$toask('登录成功!',"1500","85%","#49E897 ","#158A4E");
          // 成功的话把返回的数据放到缓存中
          this.set_user(res);
          this.$go('/');
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
   padding-top: 1.86rem
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
      max-width: 6rem
      width: 5rem
      color: #363636
      padding: 0
      &:focus ~ .del
        opacity: 1
    .eyes
      height: .44rem
  .phone
    margin-bottom: .6rem
  .btn
    margin-top: 1.2rem
    margin-bottom: .5rem
  .link
    .reg
      color: #3299D1
</style>

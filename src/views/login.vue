<template>
  <div class="login p4" @keyup.enter="submit">
    <img src="../assets/user/logo.png" class="logo">
    <p class="color_main f28 loginp">银行存管账户，为您的资金保驾护航</p>
    
    <p class="f28 color_font-99 left">手机号</p>
    <div class="item flex phone border-b">
      <div class="flex con">
        <input type="tel" placeholder="请输入手机号"  class="f32" v-model.trim="item.mobile" maxlength="11">
        <img src="../assets/common/del.png" alt="" class="del" @click="item.mobile=''">
      </div>
    </div>
    <button class="btn" :class="item.mobile.length>0?'':'dis'" @click="submit">
	    	<span v-show="nextBol">{{text}}</span>
	    	<span v-show="!nextBol"><img class="loadImg" src="../assets/common/load.png"/></span>
    </button>
  </div>
</template>

<script>
 import alert from '@/components/alert'
  import {
    mapActions,
    mapMutations
  } from 'vuex'
  import {
    isRegister
  } from '@/service'
  export default {
    name: 'login',
    data() {
      return {
        checked: true, // 密码框的类型显示隐藏
        text: '下一步', // 登录按钮文字提示
        item: {
          mobile: this.$route.query.mobile || '',
        },
        nextBol:true,
      }
    },
    created() {
      // 登录清除全部缓存数据
      this.RESET();
//    this.$alert({
//      title:'你四不四傻',
//      content:'密码错误5次',
//      yes:"知道了",
//      no:'立即'
//  }).then(function(b){
//      console.log(b)
// })
      
    },
    methods: {
      ...mapMutations([
        'RESET',
      ]),
      /**
       * 提交
       */
      submit() {
        if (!this.item.mobile) {
          this.$toask('手机号不能为空!',"","85%","#FFD63D","#FE7C08 ");
          return
        }
        if (!(/^1\d{10}$/.test(this.item.mobile))) {
           this.$toask('手机号格式不正确!',"","85%","#FFD63D","#FE7C08 ");
          return
        }
        this.nextBol=!this.nextBol;
        isRegister(this.item).then(res => {
          this.$go('next',{mobile:this.item.mobile});
        }).catch(() => {
        	 this.$go('register',{mobile:this.item.mobile});
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
      overflow: hidden
    span
      flex: 1
    .del
      height: .28rem
      opacity: 0
    input
      float: left
      display: inline-block
      max-width: 4rem
      color: #363636
      padding: 0
      &:focus ~ .del
        opacity: 1
    .eyes
      height: .18rem
  .phone
    margin-bottom: .6rem
  .btn
    margin-top: 1rem
    margin-bottom: .4rem
    span
     .loadImg
      margin-top: 0.27rem
      height: 0.46rem
      animation: roll  1s infinite linear 
  .link
    .reg
      color: #3299D1  
</style>

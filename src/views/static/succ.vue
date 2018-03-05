<template>
  <div class="succ center">
    <img src="../../assets/common/succ.png" class="icon">
    <div v-if="view==='forget_pwd'" class="forget_pwd item">
      <h2 class="f36 color_font">登录密码修改成功</h2>
      <p class="f28 color_font-s">使用您的新密码登录</p>
      <button class="btn" @click="$go('/webapp/login')">登录</button>
    </div>
    <div v-if="view==='register'" class="register item">
      <h2 class="f36 color_font">恭喜您注册成功</h2>
      <button class="btn" @click="$go('/webapp/reg_bank')">立即开通银行存管账户</button>
    </div>
    <div v-if="view==='reg_bank'" class="reg_bank item">
      <h2 class="f36 color_font">恭喜，开通银行存管账户成功</h2>
      <button class="btn">立即充值</button>
    </div>
    <p class="no f28 color_main" @click="no" v-if="view!=='forget_pwd'">暂不</p>
    <foot-tip/>
  </div>
</template>

<script>
  import footTip from '@/components/foot-tip/foot-tip'
  export default {
    name: 'succ',
    data () {
      return {
        view: this.$route.query.view
      }
    },
    created() {
      if(!this.view) this.$go('/webapp/login');
    },
    components: {
      "foot-tip" : footTip
    },
    methods: {
        no(){

        }
    }
  }
</script>

<style lang="sass" scoped>
.succ
  .icon
    margin: 2.2rem auto .6rem
    width: 1.54rem
  .item
    h2
      margin-bottom: .2rem
    .btn
      width: auto
      padding: 0 .5rem
      border-radius: .36rem
      font-size: .36rem
      line-height: .72rem
      display: inline
      margin: 1.2rem auto .6rem
</style>

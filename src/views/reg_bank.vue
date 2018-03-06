<template>
  <div class="reg_bank p4">
    <h2 class="text color-font">填写开户信息</h2>
    <p class="text2 f28 color_font-s">请填写开通银行存管账户所需信息（须绑定储蓄卡）</p>
    <div class="name item flex border-b">
      <span class="f36 color_font">姓名</span>
      <input type="text" placeholder="请输入持卡人姓名" class="f32 color_border">
    </div>
    <div class="idcard item flex phone border-b">
      <span class="f36 color_font">身份证</span>
      <input type="number" placeholder="请输入18位二代身份证号码" class="f32 color_border">
    </div>
    <div class="bank item flex phone border-b">
      <span class="f36 color_font">开户银行</span>
      <input type="number" placeholder="请选择开户银行" class="f32 color_border">
    </div>
    <div class="bankid item flex phone border-b">
      <span class="f36 color_font">银行卡号</span>
      <input type="number" placeholder="请输入本人的银行卡号" class="f32 color_border">
    </div>
    <div class="phone item flex phone border-b">
      <span class="f36 color_font">银行预留手机号</span>
      <input type="number" placeholder="请输入银行预留手机号" class="f32 color_border">
    </div>
    <div class="smscode item flex phone border-b">
      <input type="text" placeholder="请输入短信验证码" class="f32 color_border">
      <span class="f28 color_main">获取短信验证码</span>
    </div>
    <foot-tip class="tip" main="'true'"/>
    <button class="btn">下一步</button>
  </div>
</template>

<script>
  import footTip from '@/components/foot-tip/foot-tip'
  export default {
    name: 'reg_bank',
    data () {
      return {
      }
    },
    created() {
    },
    components: {
      "foot-tip" : footTip
    },
    methods: {
      submit(){
      },
    }
  }
</script>

<style lang="sass" scoped>
  .reg_bank
    .item
      span
        flex: 1
      input
        flex: 1.5
      margin-top: .58rem
      padding-bottom: .3rem
    .text
      margin-top: 1rem
      font-size: .6rem
    .text2
      margin-top: .26rem
    .tip
      margin-top: 2.04rem
      margin-bottom: .38rem
    .smscode
      span
        line-height: .52rem
        text-align: center
        background: #F0F0F8
        border-radius: .32rem
</style>

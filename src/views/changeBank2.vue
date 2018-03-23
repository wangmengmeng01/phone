<template>
  <div class="reg_bank p4" v-show="!$route.query.MerPriv">
    <h2 class="text color-font">填写新银行卡信息</h2>
    <p class="text2 f28 color_font-s">请填写开通银行存管账户所需信息（须绑定储蓄卡）</p>
    <div class="name item flex border-b">
      <span class="f36 color_font">姓名</span>
      <input type="text" placeholder="请输入持卡人姓名" class="f32 color_border color_font disable" v-model="userName">
    </div>
    <div class="idcard item flex phone border-b">
      <span class="f36 color_font">身份证</span>
      <input type="tel" placeholder="请输入18位二代身份证号码" class="f32 color_border color_font disable" v-model="cardId">
    </div>
    <div class="bank item flex phone border-b" @click="linkto">
      <span class="f36 color_font">开户银行</span>
      <input type="text" placeholder="请选择开户银行" class="f32 color_border color_font " v-model.trim="bankName" readonly>
      <img src="../assets/common/arrow-right.png" alt="" class="arrow">
    </div>
    <div class="bankid item flex phone border-b">
      <span class="f36 color_font">银行卡号</span>
      <input type="number" placeholder="请输入本人的银行卡号" class="f32 color_border color_font " v-model.trim="item.bindCardNo">
    </div>
    <div class="phone item flex phone border-b">
      <span class="f36 color_font">银行预留手机号</span>
      <input type="tel" placeholder="请输入银行预留手机号" class="f32 color_border color_font" v-model.trim="item.userBindMobile" maxlength="11">
    </div>
    <div class="smscode item flex phone border-b">
      <input type="tel" placeholder="请输入短信验证码" class="f32 color_border color_font" v-model.trim="item.smsCode" maxlength="6">
      <span class="f28 color_main" :class="click_code ? 'dis' : ''" @click="sendCode">{{codeText}}</span>
    </div>
    <button class="btn" @click="submit">下一步</button>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  import {
    sendSmsCode,
    quickBinding,
    getUserStatus,
    userActivate,
    selectBeforeRecharge
  } from '@/service'
  import axios from 'axios'
  export default {
    name: 'reg_bank',
    data() {
      return {
        codeText: '获取短信验证码',
        num: 60,
        click_code: false,
        userName: '',
        cardId: '',
        bankName: '', // 银行卡名
        item: {
          bankId: '',
          bindCardNo: '', //
          userBindMobile: '',
          retUrl: '',
          smsSeq: '',
          smsCode: '',
          orgSmsCode: '', //
          orgSmsSeq: '', //
          bgRetUrl: 'http://www.chinazyjr.com/', //
  
        }
      }
    },
    computed: {
      ...mapGetters([
        'bindCard'
      ])
    },
    created() {
      console.log(this.bindCard);
      this.orgSmsCode = this.bindCard.orgSmsCode;
      this.orgSmsSeq = this.bindCard.orgSmsSeq;
      this.userName = this.bindCard.realName;
      this.cardId = this.bindCard.cardNumber;
  
  
      // 开始清楚成功页面的缓存
      this.RESET('succ_page');
      // 获取从选择银行卡页面返回的数据
      const {
        data,
        bankName,
        bankNo,
        MerPriv
      } = this.$route.query;
      // 如果有的话重新赋值
      if (data) {
        this.item = JSON.parse(decodeURIComponent(data));
        this.bankName = bankName;
        this.item.bankId = bankNo;
      }
      //    const retUrl = this.item.retUrl = location.origin+location.pathname;
      // 表示从汇付返回的判断是否开户成功
      if (MerPriv) {
        getUserStatus().then(r => {})
      }
    },
    methods: {
      ...mapMutations([
        'RESET',
        'SET_SUCC_PAGE'
      ]),
      /**
       * 跳转选择银行
       */
      linkto() {
        // 把当前的数据传过去，防止写完了点选择银行返回重新填写
        this.$go('/bank/choose', {
          backurl: this.$route.path,
          data: encodeURIComponent(JSON.stringify(this.item))
        })
      },
      /**
       * 发送短信
       */
      sendCode() {
        if (!this.item.userBindMobile) {
          this.$toask('手机号码不能为空!');
          return
        }
        if (!(/^1\d{10}$/.test(this.item.userBindMobile))) {
          this.$toask('手机号格式不正确!');
          return
        }
        if (!this.item.bindCardNo) {
          this.$toask('银行卡号不能为空!');
          return
        }
        const params = {
          smsTempType: 'N',
          mobile: this.item.userBindMobile,
          bankCardNo: this.item.bindCardNo,
          busiType: 'rebind'
        };
        sendSmsCode(params).then(r => {
          this.item.smsSeq = r.smsSeq;
          // 倒计时
          this.countdown();
          this.$toask('短信验证码已发送');
        })
      },
      /**
       * 倒计时
       */
      countdown() {
        this.click_code = !this.click_code;
        let time = setInterval(() => {
          this.num--;
          if (this.num < 0) {
            clearInterval(time);
            this.click_code = !this.click_code;
            this.codeText = '获取短信验证码';
            this.num = 60;
            return
          }
          this.codeText = `发送(${this.num})`;
        }, 1000)
      },
      /**
       * 提交
       */
      submit() {
        if (!this.item.bankId) {
          this.$toask('请选择开户银行!');
          return
        }
        if (!this.item.bindCardNo) {
          this.$toask('银行卡号不能为空!');
          return
        }
        if (!(/^\d{16,30}$/.test(this.item.bindCardNo))) {
          this.$toask('银行卡号格式不正确!');
          return
        }
        if (!this.item.userBindMobile) {
          this.$toask('银行预留手机号不能为空!');
          return
        }
        if (!(/^1\d{10}$/.test(this.item.userBindMobile))) {
          this.$toask('手机号格式不正确!');
          return
        }
        if (!this.item.smsCode) {
          this.$toask('短信验证码不能为空!');
          return
        }
        //      this.item.retUrl = location.origin+location.pathname;
        //		if(process.env.NODE_ENV !== 'production') {
  
        this.item.smsSeq = 'AAAAAAAA';
        this.item.smsCode = '666666';
        this.item.orgSmsCode = '666666';
        this.item.orgSmsSeq = 'AAAAAAAA';
        //		};
  
  
  
  
        // 开户
        quickBinding(this.item).then(res => {
  
  
          if (res.code == "100") {
            // 开始清楚成功页面的缓存
            this.RESET('succ_page');
            this.SET_SUCC_PAGE({
              "title": "换绑卡成功",
              'sub_title': "您的账户已绑定新银行卡",
              "btn_text": "立即充值",
              "backurl": "/wealth/recharge",
              "sub_btn_text": "暂不",
              "sub_backurl": "/"
            });
            this.$go('/static/succ');
  
  
  
          } else if (res.code == "1210" || res.code == "1000") {
            this.$go('/login');
          } else {
            this.$toask(res.message);
          }
          console.log(res);
        })
      },
    }
  
  
  }
</script>

<style lang="sass" scoped>
  
  .reg_bank
    height: auto
    background: #fff
    .disable
      pointer-events: none
    .item
      span
        flex: 1
      input
        flex: 1.5
      .arrow
        height: .34rem
      margin-top: .58rem
      padding-bottom: .3rem
    .text
      padding-top: 1rem
      font-size: .6rem
    .text2
      margin-top: .26rem
    .tip
      margin-top: 2.04rem
      margin-bottom: .38rem
    .btn
      position: fixed
      bottom: 0
      right: 0
      left: 0
      border-radius: 0
    .smscode
      span
        &.dis
          pointer-events: none
        line-height: .52rem
        text-align: center
        background: #F0F0F8
        border-radius: .32rem

</style>

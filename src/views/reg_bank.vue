<template>
  <div class="reg_bank p4" v-hide="$route.query.isfromhuifu">
    <h2 class="text color-font">填写开户信息</h2>
    <p class="text2 f28 color_font-s">请填写开通银行存管账户所需信息（须绑定储蓄卡）</p>
    <div class="name item flex border-b">
      <span class="f36 color_font">姓名</span>
      <input type="text" placeholder="请输入持卡人姓名" class="f32 color_border color_font" v-model="item.realName">
    </div>
    <div class="idcard item flex phone border-b">
      <span class="f36 color_font">身份证</span>
      <input type="tel" placeholder="请输入18位二代身份证号码" class="f32 color_border color_font" v-model="item.idno" maxlength="18">
    </div>
    <div class="bank item flex phone border-b" @click="linkto">
      <span class="f36 color_font">开户银行</span>
      <input type="text" placeholder="请选择开户银行" class="f32 color_border color_font" v-model="bankName" readonly>
      <img src="../assets/common/arrow-right.png" alt="" class="arrow">
    </div>
    <div class="bankid item flex phone border-b">
      <span class="f36 color_font">银行卡号</span>
      <input type="number" placeholder="请输入本人的银行卡号" class="f32 color_border color_font" v-model="item.bankCardNo">
    </div>
    <div class="phone item flex phone border-b">
      <span class="f36 color_font">银行预留手机号</span>
      <input type="tel" placeholder="请输入银行预留手机号" class="f32 color_border color_font" v-model="item.mobile" maxlength="11">
    </div>
    <div class="smscode item flex phone border-b">
      <input type="tel" placeholder="请输入短信验证码" class="f32 color_border color_font" v-model="item.smsCode" maxlength="6">
      <span class="f28 color_main" :class="click_code ? 'dis' : ''" @click="sendCode">{{codeText}}</span>
    </div>
    <button class="btn" @click="submit">下一步</button>
  </div>
</template>

<script>
  import { mapActions, mapMutations } from 'vuex'
  import { sendSmsCode, openAccount, getUserStatus, userActivate } from '@/service'
  import axios from 'axios'
  export default {
    name: 'reg_bank',
    data () {
      return {
        codeText: '获取短信验证码',
        num: 60,
        click_code: false,
        bankName: '',                       // 银行卡名
        item: {
          realName: '',
          idno: '',
          bankNo: '',
          bankCardNo: '',
          userType: '2',
          retUrl: '',
          smsSeq: '',
          smsCode: '',
          mobile: ''
        }
      }
    },
    created() {
      // 开始清楚成功页面的缓存
      this.RESET('succ_page');
      // 获取从选择银行卡页面返回的数据
      const {data, bankName, bankNo, isfromhuifu} = this.$route.query;
      // 如果有的话重新赋值
      if(data){
        this.item = JSON.parse(decodeURIComponent(data));
        this.bankName = bankName;
        this.item.bankNo = bankNo;
        this.item.retUrl = this.$route.path+'?isfromhuifu=1';
      }
      // 表示从汇付返回的判断是否开户成功
      if(isfromhuifu){
        window.history.replaceState(null, null, this.$route.path);
        getUserStatus().then(r=>{
          r.openAccountStatus='1'
          // 未开户
          if(r.openAccountStatus=='1'){
            this.SET_SUCC_PAGE({
              "title": "开户失败",
              "sub_title": "请检查您所录入的开户信息",
              "btn_text": "重新提交",
              "backurl": "/reg_bank",
              "sub_btn_text": "暂无",
              "sub_backurl": "/"
            });
            this.$go('/static/fail','',false);
          }
          // 已开户
          if(r.openAccountStatus=='3'){
            this.SET_SUCC_PAGE({
              "title": "恭喜，开通银行存管账户成功",
              "btn_text": "立即充值",
              "backurl": "/recharge",
              "sub_btn_text": "暂无",
              "sub_backurl": "/"
            });
            this.$go('/static/succ','',false);
          }
          // 待激活
          if(r.openAccountStatus=='4'){
            userActivate({
              retUrl: this.$route.path+'?isfromhuifu=1'
              }).then(res=>{
              // 调用汇付先清除地址栏的参数
              window.history.replaceState(null, null, this.$route.path);
              axios({
                method: 'post',
                url: res.serviceUrl,
                data: res.inMap,
                transformRequest: [function (data) {
                  let ret = '';
                  for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                  }
                  return ret.slice(0,ret.length-1)
                }],
              }).then(r=>{
                if(r.status === 200){
                  if(r.data){
                    document.body.innerHTML = r.data;
                    setTimeout(()=>{document.form.submit()},0)
                  }
                }
              })
            })
          }
        })
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
      linkto(){
        // 把当前的数据传过去，防止写完了点选择银行返回重新填写
        this.$go('/bank/choose',{backurl:this.$route.path,data: encodeURIComponent(JSON.stringify(this.item))}, false)
      },
      /**
       * 发送短信
       */
      sendCode(){
        if(!this.item.mobile){
          this.$toask('手机号码不能为空!');
          return
        }
        if(!(/^1\d{10}$/.test(this.item.mobile))) {
          this.$toask('手机号格式不正确!');
          return
        }
        if(!this.item.bankCardNo){
          this.$toask('银行卡号不能为空!');
          return
        }
        const params = {
          smsTempType: '',
          mobile: this.item.mobile,
          bankCardNo: this.item.bankCardNo,
          busiType: 'user_register'
        };
        sendSmsCode(params).then(r=>{
          this.item.smsSeq = r.smsSeq = 'AAAAAAAA';
          // 倒计时
          this.countdown()
        })
      },
      /**
       * 倒计时
       */
      countdown(){
        this.click_code = !this.click_code;
        let time = setInterval(()=>{
          this.num--;
          if(this.num<0){
            clearInterval(time);
            this.click_code = !this.click_code;
            this.codeText = '获取短信验证码';
            this.num = 60;
            return
          }
          this.codeText = `发送(${this.num})`;
        },1000)
      },
      /**
       * 提交
       */
      submit(){
        if(!this.item.realName){
          this.$toask('姓名不能为空!');
          return
        }
        if(!this.item.idno){
          this.$toask('身份证号不能为空!');
          return
        }
        if(!(/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(this.item.idno))) {
          this.$toask('身份证号码格式不正确!');
          return
        }
        if(!this.item.bankNo){
          this.$toask('请选择开户银行!');
          return
        }
        if(!this.item.bankCardNo){
          this.$toask('银行卡号不能为空!');
          return
        }
        if(!(/^\d{16,30}$/.test(this.item.bankCardNo))) {
          this.$toask('银行卡号格式不正确!');
          return
        }
        if(!this.item.mobile){
          this.$toask('银行预留手机号不能为空!');
          return
        }
        if(!(/^1\d{10}$/.test(this.item.mobile))) {
          this.$toask('手机号格式不正确!');
          return
        }
        if(!this.item.smsCode){
          this.$toask('短信验证码不能为空!');
          return
        }
        // 开户
        openAccount(this.item).then(res=>{
          // 调用汇付先清除地址栏的参数
          window.history.replaceState(null, null, this.$route.path);
          axios({
            method: 'post',
            url: res.serviceUrl,
            data: res.inMap,
            transformRequest: [function (data) {
              let ret = '';
              for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret.slice(0,ret.length-1)
            }],
          }).then(r=>{
            if(r.status === 200){
              if(r.data){
                document.body.innerHTML = r.data;
                setTimeout(()=>{document.form.submit()},0)
              }
            }
          })

        })
      },
    }
  }
</script>

<style lang="sass" scoped>
  .reg_bank
    height: auto
    background: #fff
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

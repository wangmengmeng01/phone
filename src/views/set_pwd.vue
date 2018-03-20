<template>
  <div class="set_pwd p4">
    <h2 class="text color-font">设置登录密码</h2>
    <p class="text2 f28 color_font-s">{{text}}</p>
    <div class="imgcode item flex phone border-b">
      <input type="text" placeholder="请输入图形验证码" class="f32 color_font color_border" v-model.trim="item.imageCode" maxlength="4">
      <span class="f28 color_main"><img :src="imageCode" alt="" @click="changeImgCode"></span>
    </div>
    <div class="smscode item flex phone border-b">
      <input type="tel" placeholder="请输入短信验证码" class="f32 color_font color_border" v-model.trim="item.smsCode" maxlength="6">
      <span class="f28 color_main" @click="sendCode" :class="click_code ? 'dis' : ''">{{codeText}}</span>
    </div>
    <div class="smscode item flex phone border-b">
      <input :type="[passwordType?'password':'text']" placeholder="请设置你的登录密码" class="f32 color_font color_border" v-model.trim="password" minlength="6" maxlength="12">
      <img :src="require(`@/assets/common/${passwordType?'eyes':'eyebrow'}.png`)" alt="" class="eyes" @click="passwordType=!passwordType">
    </div>
    <p class="tip f12 color_font-s">密码须为6～12位大小写字母、数字至少2种组合</p>
    <button class="btn" @click="submit">{{$route.query.view === 'forget_pwd' ? '修改' : '注册'}}</button>
    <div class="protocol mt4" v-if="$route.query.view !== 'forget_pwd'">
      <img :src="require(`../assets/common/check_${checked?'succ':'none'}.png`)" alt="" @click="checked=!checked">
      <p class="color_font-s f24">注册即表示您已阅读并同意<span class="color_main" @click="protocol">《平台注册协议》</span></p>
    </div>
  </div>
</template>

<script>
  import Protocol from '@/components/protocol'
  import { getValidateImage, sendSMS, register, login, forgetPassWord } from '@/service'
  import { mapMutations, mapActions } from 'vuex'
  export default {
    name: 'set_pwd',
    data () {
      return {
        password: '',
        passwordType: true,                       // 密码显示隐藏
        checked: true,                           // 同意复选框勾选
        codeText: '获取短信验证码',                 // 获取验证码提示
        num: 60,                                  // 验证码倒计时
        click_code: false,                        // 短信按钮能否点击
        text: '',                                 // 页面标题
        imageCode: '',                            // 图形验证码url
        item: {
          mobile: this.$route.query.mobile,
          password: '',
          smsCode: '',
          imageCode: '',
          inviteCode: ''
        }
      }
    },
    created() {
      document.title = this.$route.query.view === 'forget_pwd' ? '修改' : '注册';
      // 开始清楚成功页面的缓存
      this.RESET('succ_page');
      // 如果没有手机号跳转到注册页面
      if(!this.item.mobile){
        this.$go('register');
        return
      }
      // 判断是哪个忘记密码页面进来的还是注册页面进来的
      this.text = this.$route.query.view === 'forget_pwd'
        ? '输入正确的图形验证码后，可点击"获取短信验证码"获取验证码'
        : `输入正确的图形验证码后，可点击“获取短信验证码” 系统将向${this.item.mobile}发送短信`;
      // 默认显示图片验证码
      this.changeImgCode();
    },
    methods: {
      ...mapActions([
        'set_user',
      ]),
      ...mapMutations([
        'RESET',
        'SET_SUCC_PAGE'
      ]),
      protocol(){
        this.$alert({type: 'protocol', content: Protocol})
      },
      /**
       * 发送验证码
       */
      sendCode(){
       // 验证图像验证码
        if(!this.item.imageCode){
          this.$toask('图像验证码不能为空!');
          return
        }
        const params = {
          mobile: this.item.mobile,
          imageCode: this.item.imageCode,
          operationType: this.$route.query.view === 'forget_pwd' ? 'forget' : 'register'
        };
        sendSMS(params).then(()=>{
        // 发送成功倒计时
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
       * 获取图像验证码
       */
      changeImgCode(){
        getValidateImage().then(r=>this.imageCode = r);
      },
      /**
       * 提交
       */
      submit(){
        if(!this.item.imageCode){
            this.$toask('图形验证码不能为空!');
          return
        }
        if(!this.item.smsCode){
          this.$toask('短信验证码不能为空!');
          return
        }
        if(!this.password){
          this.$toask('登录密码不能为空!');
          return
        }
        if(!(/^(?!^\d+$)(?!^[a-zA-Z]+$)(?!^_+$)[\d|a-zA-Z|_]{6,12}$/.test(this.password))) {
          this.$toask('密码格式不正确!');
          return
        }
        if(!this.checked && this.$route.query.view !== 'forget_pwd'){
          this.$toask('请阅读并勾选《平台注册协议》!');
          return
        }
        // 加密
        let CryptoJS= require('@/lib/aes');
        this.item.password = CryptoJS.aes(this.password);
        // 忘记密码
        if(this.$route.query.view === 'forget_pwd'){
          forgetPassWord(this.item).then(()=>{
            const {mobile, password} = this.item;
            // 注册之后调用登录接口
            login({
              mobile,
              password
            }).then(res=>{
              // 把返回的数据放入状态管理中
              this.set_user(res);
              let params = {
                  "title": "登录密码修改成功",
                  "sub_title": "使用您的新密码登录",
                  "btn_text": "登录",
                  "backurl": "/login"
                };
              // 跳转成功页面
              this.SET_SUCC_PAGE(params);
              this.$go('/static/succ');
            })
          });
          return
        }
        // 注册
        register(this.item).then(()=>{
          const {mobile, password} = this.item;
        // 注册之后调用登录接口
          login({
            mobile,
            password
          }).then(res=>{
          // 把返回的数据放入状态管理中
            this.set_user(res);
            let params = {
                "title": "恭喜您注册成功",
                "btn_text": "立即开通银行存管账户",
                "backurl": "/reg_bank",
                "sub_btn_text": "暂无",
                "sub_backurl": "/"
              };
            // 跳转成功页面
            this.SET_SUCC_PAGE(params);
            this.$go('/static/succ');
          })
        })
      },
    }
  }
</script>

<style lang="sass" scoped>
  .set_pwd
    height: 100%
    background: #fff
    .item
      span
        flex: 1
      input
        flex: 1.5
      margin-top: .6rem
      padding-bottom: .3rem
    .text
      padding-top: 1rem
      font-size: .6rem
    .text2
      line-height: .4rem
      margin-top: .26rem
    .btn
      margin-top: 1rem
    .tip
      margin: .2rem auto 1rem
    .imgcode
      img
        display: inline-block
        height: .6rem
        width: 1.8rem
        background: #f1f1f1
      span
        text-align: right
    .smscode
      .eyes
        height: .18rem
      span
        &.dis
          pointer-events: none
        line-height: .52rem
        text-align: center
        background: #F0F0F8
        border-radius: .32rem
    .protocol
      display: flex
      align-items: center
      img
        height: .32rem
        width: .32rem
        margin-right: .2rem
</style>

<template>
  <div class="succ center">
    <img src="../../assets/common/succ.png" class="icon">
    <div class="forget_pwd item">
      <h2 class="f36 color_font-36">{{succ_page.title}}</h2>
      <p class="f28 color_font-s" style="line-height: .44rem;" v-html="succ_page.sub_title"></p>
      <button class="btn" @click="backurl">{{succ_page.btn_text}}</button>
      <p class="f32 color_main" @click="sub_backurl">{{succ_page.sub_btn_text}}</p>
    </div>
    <!--<div v-if="view==='register'" class="register item">-->
    <!--<h2 class="f36 color_font">恭喜您注册成功</h2>-->
    <!--<button class="btn" @click="$go('/reg_bank')">立即开通银行存管账户</button>-->
    <!--</div>-->
    <!--<div v-if="view==='reg_bank'" class="reg_bank item">-->
    <!--<h2 class="f36 color_font">恭喜，开通银行存管账户成功</h2>-->
    <!--<button class="btn">立即充值</button>-->
    <!--</div>-->
    <!--<p class="no f28 color_main" @click="no" v-if="view!=='forget_pwd'">暂不</p>-->
  </div>
</template>

<script>
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  export default {
    name: 'succ',
    	data() {
			return {
				userToken:'',
				submitBol: true,
			}
		},
    computed: {
      fail() {
        return this.$route.query.fail
      },
      ...mapGetters([
        'succ_page'
      ])
    },
    /**
     * 跳转之前状态里面没有title，直接跳转首页
     * @param to
     * @param from
     * @param next
     */
    beforeRouteEnter(to, from, next) {
      next(vm => {
        !vm.succ_page.title && vm.$go('/');
      })
    },
    created() {
      document.title = this.succ_page.title;
      	if(this.$route.query.forNative) {
			this.userToken = this.$route.query.userToken;
			this.submitBol = !this.submitBol;
		}
    },
    methods: {
      ...mapMutations([
        'RESET',
      ]),
      backurl() {
        const backurl = this.succ_page.backurl;
        this.RESET('succ_page');
        if(this.submitBol){
        		 this.$go(backurl, '', true);
        }else{
        		 this.$go(backurl,{client:"4",userToken: this.userToken,forNative:"1"}, true);
        }
        
       
      },
      sub_backurl() {
        const sub_backurl = this.succ_page.sub_backurl;
        this.RESET('succ_page');
        this.$go(sub_backurl, '', true);
      }
    },
  }
</script>

<style lang="sass" scoped>
.succ
  background: #fff
  height: 100vh
  .icon
    margin: 1.8rem auto .4rem
    width: 1.20rem
  .item
    h2
      margin-bottom: .2rem
    .btn
      width: 4.8rem
      text-align: center
      border-radius: .08rem
      font-size: .32rem
      line-height: 1rem
      display: inline
      margin: 1.2rem auto .66rem
</style>

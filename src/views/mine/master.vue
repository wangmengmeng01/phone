<template>
  <div class="qrcode">
    <div v-if="item.mobile">
      <div class="head flex">
        <img :src="item.icon" alt="" class="head_icon place-img">
        <div class="msg">
          <h2 class="f36 flex"><span>{{item.realName}}</span><span v-if="(item.position=='1')||(item.position=='2')" class="status color_main"><img src="../../assets/main/mine/status_yellow.png" alt=""><i class="f12">{{['一般理财师','大区经理'][parseInt(item.position)-1]}}</i></span></h2>
          <p class="f24">{{item.department}}</p>
          <p class="f32 color_font-s">{{item.beInviteDate}} 成为我的理财师</p>
          <p class="img flex">
            <a class="color_font-s flex f44" :href="`tel:${item.mobile}`"><img src="../../assets/main/mine/phone.png" alt="">{{item.mobile}}</a>
          </p>
        </div>
      </div>
      <a class="f36 btn" :href="`tel:${item.mobile}`">拨打电话</a>
    </div>
    
    <div  v-if="!item.mobile" class="addMaster">
    	 <p class="addMasterPhone  f48 color-font center"></p>
    	 <div class="addMaster-div">
    	 	<span class="f36 color-font addMaster-div-span">请输入理财师手机号码:</span>
    	 	<input type="tel" class="f36 color-font" maxlength="11" name="addMasterPhone" value="" placeholder="请输入理财师的手机号码" />
    	 </div>
    	 <div class="addMaster-div">
    	 	<input type="tel" class="f36 color-font" maxlength="6" name="addMasterPhone" value="" placeholder="请输入短信验证码" />
    	 	<span class="sendBtn f28 center">发送短信验证码</span>
    	 </div>
    	 
    	 <button class="btn f36">确认添加理财师</button>
    	 	
    </div>
    
   
  </div>
</template>

<script>
  import {
    searchMyManagerUserInfo
  } from '@/service'
  export default {
    name: 'master',
    data() {
      return {
        item: {},
      }
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        searchMyManagerUserInfo().then(r => this.item = r);
      }
    },
    watch: {}
  }
</script>

<style lang="sass" scoped>
  .qrcode
    height: 100%
    background: #fff
    .addMaster
     padding-top: .2rem
     &-div 
      margin: .5rem .4rem
      overflow: hidden
      border-bottom: 1px solid #8D8D94
      position: relative
      .addMaster-div-span
       float: left
       display: block
       width: 6.7rem 
       text-align: left
       height: 1rem
       line-height: 1rem
      input
       float: left
       width: 6.7rem
       height: 1rem
       line-height: 1rem
      .sendBtn
       position: absolute 
       right: 0
       top: 0.24rem
       width: 2.46rem
       color: #3299D1
       height: 0.52rem
       line-height: 0.52rem
       background: rgba(240,240,248,1)
       border-radius: 32px
       
    a
      text-decoration: none
    .code
      text-align: center
      #code
        margin: 1rem auto .4rem
        width: 3.8rem
        height: 3.8rem
    .head
      background: #fff
      padding: .76rem .4rem .6rem
      align-items: flex-start
      .head_icon
        width: 1.16rem
        height: 1.16rem
      .msg
        flex: 1
        padding-left: .4rem
        h2
          justify-content: flex-start
          .status
            left: .1rem
            position: relative
            height: .38rem
            line-height: .38rem
            width: 1.54rem
            display: flex
            align-items: center
            justify-content: center
            i
              padding-left: .2rem
              position: relative
              z-index: 1
              font-style: normal
            img
              height: 100%
              width: 100%
              left: 0
              top: 0
              position: absolute
        p
          margin-top: .1rem
          line-height: .34rem
          &.img
            margin-top: 2.7rem
          &.flex
            justify-content: flex-start
          img
            width: .72rem
            padding-right: .1rem
    .btn
      border-radius: .36rem
      font-size: .36rem
      width: 4.8rem
      height: .72rem
      line-height: .72rem
      text-align: center
      margin: auto
      color: #fff
  .none
    padding-top: 5rem
</style>

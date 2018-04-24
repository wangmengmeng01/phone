<template>
  <div class="master">
    <!--<div v-if="item.mobile">
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
    -->
    
    <!-- 我的理财师-->
   <div class="master-mess" v-if="item.mobile">
   		<div class="master-mess-top">
   			<img src="../../assets/main/mine/lcs.png"/>
   			<p class="f36 center master-mess-top-p1">{{item.realName}}</p>
   			<p class="f28 center master-mess-top-p2">{{item.beInviteDate}}成为我的理财师</p>
   		</div>
   		<div class="master-mess-mess f30">
   			<p class="color_font-99">公司</p>
   			<p class="color_font-36">{{item.department}}</p>
   		</div>
   		<div class="master-mess-mess f30">
   			<p class="color_font-99">头衔</p>
   			<p class="color_font-36">{{item.position}}</p>
   		</div>
   		<div class="master-mess-mess f30">
   			<p class="color_font-99" id="line">电话</p>
   			<p class="color_font-36" id="line">{{item.mobile|desensitization}}</p>
   			<a :href="`tel:${item.mobile}`"><img src="../../assets/main/mine/call.png"/></a>

   		</div>
   </div>
   <!--暂无理财师-->
   <div class="master-none" v-if="!item.mobile">
   		<img src="../../assets/main/mine/zwkh.png"/>
   		<p class="f28">暂无理财师</p>
   		<div class="btn master-none-btn"  @click="$go('addUser',{backTitle:'添加理财师',isManage:0})">
   			添加理财师
   		</div>
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
        searchMyManagerUserInfo().then(r => {
        	this.item = r
        });
      }
    },
    watch: {}
  }
</script>

<style lang="scss" scoped>
 .master{
 	margin: 0 auto;
 	padding: 0;
 	width: 7.5rem;
 	&-mess{
 		width: 7.5rem;
 		&-top{
 			width: 7.5rem;
 			height: 3.9rem;
 			background: #207CFF;
 			img{
 				margin: .88rem 3.15rem .18rem;
 				width: 1.2rem;
 				height: 1.2rem;
 				background-size: 100% 100%;
 			}
 			&-p1{
 				color: #FFFFFF;
 				margin-bottom: .24rem;
 				line-height: .36rem;
 			}
 			&-p2{
 				color: #C6E1FF;
 				line-height: .28rem;
 			}
 		}
 		&-mess{
 			margin: .52rem .3rem 0;
 			width: 6.9rem;
 			overflow: hidden;
 			p:nth-child(1){
 				float: left;
 				width: .84rem;
 				line-height:.44rem ;
 				text-align: left;
 			}
 			p:nth-child(2){
 				float: left;
 				max-width: 6.06rem;
 				line-height: .44rem;
 			}
 			a{
 					float: right;
	 				width: .6rem;
	 				height: .6rem;
 				img{
	 				width: .6rem;
	 				height: .6rem;
	 				background-size: 100% 100%;
 				}	
 			}
 			
 			#line{
 				line-height: .6rem;
 			}
 		}
 	}
 	&-none{
 		width: 7.5rem;
 		img{
 			margin: 3.28rem 2.3rem 0;
 			width: 2.9rem;
 			height: 2.26rem;
 			background-size: 100% 100%;
 		}
 		>p{
 			margin: .5rem 0 .58rem;
 			color: #666666;
 			text-align: center;
 		}
 		&-btn{
 			width: 4.8rem;
 			margin: 0 1.35rem;
 		}
 	}
 }
</style>

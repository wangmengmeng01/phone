<template>
 <div class="selectUser">
 <div v-if="list.length">
 	<div   v-for="(i,index) in list" class="selectUser-div borderB" @click="choose(i,index)">
 		<img class="img" src="../../assets/main/mine/userImg.png"/>
 		<p class="p1">
 			<span class="span1">{{i.name|nameDesensitization}}&nbsp;&nbsp;{{i.sex==1?'男':'女'}}&nbsp;&nbsp; {{i.age}}岁</span>
 			<span class="span2">{{i.phone |desensitization}}</span>
 		</p>
 		<img class="img2" src="../../assets/main/prod/selectGray.png"/>
 	</div>
  </div>
 	 <div class="selectUser-none" v-else>
   		<img src="../../assets/main/mine/zwkh.png"/>
   		<p class="f28">暂无客户</p>
   		<!--<div class="btn selectUser-none-btn"  @click="$go('addUser',{backTitle:'添加理财师',isManage:0})">
   			添加理财师
   		</div>-->
   </div>
 	
 	
 	
 </div>
</template>

<script>
	import {
		getCustomer
	} from '@/service'
  export default {
  
    name: 'selectUser',
  
    data() {
      return {
  			list:'',
      }
    },
    created() {
      getCustomer({
        cusType: 1
      }).then(r => {
        this.list = r.customerList
      })
    },
    methods: {
      choose(item,index) {
        const {
          name,
          phone,
          userCode
        } = item;
        const backurl = this.$route.query.backurl;
        const data = this.$route.query.data;
        this.$go(backurl, {
          name,
          phone,
          userCode,
          data,
          bidNo: this.$route.query.bidNo	
        }, true)
      }
    },
    watch: {}
    
  }
</script>

<style lang="scss" scoped>
.selectUser{
	margin: 0 auto;
	padding: 0;
	width: 7.5rem;
	overflow: hidden;
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
	&-div{
		float: left;
		margin: 0 .3rem;
		width: 6.9rem;
		padding: .4rem 0;
		height: 1.0rem;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		.img{
			width: 1.0rem;
			height: 1.0rem;
			background-size: 100% 100%;
		}
		.img2{
			width: .36rem;
			height: .36rem;
			background-size: 100% 100%;
		}
		.p1{
			width:5.16rem;
			.span1{
				display: block;
				margin: .08rem 0 .28rem;
				font-size: .30rem;
				color: #363636;
				margin-right: .16rem;
			}
			.span2{
				display: block;
				font-size: .28rem;
				color: #666666;
			}
		}
	}
}
</style>

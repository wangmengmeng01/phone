<template>
 <div class="invite">
 	<div class="invite-top borderB">
 		<div class="invite-top-div1 f28">
 			<span class="span1">1</span>
 			<span class="span2"></span>
 			<span class="span1">2</span>
 			<span class="span2"></span>
 			<span class="span1">3</span>
 		</div>
 		<div class="invite-top-div2 f28">
 			<span class="span1">选择邀约客户</span>
 			<span class="span1">选择邀约客户</span>
 			<span class="span2">发起邀约</span>
 		</div>
 	</div>
 	
 	<div class="invite-mes f28 borderB" @click="$go('/prod/selectUser')">
 		<span>邀约客户</span>
 		<input style="pointer-events: none;" type="text"  placeholder="点击选择邀约客户"/>
 		<img src="../../assets/common/arrow-right.png"/>
 	</div>
 	<div class="invite-mes f28 borderB">
 		<span>推荐金额</span>
 		<input type="tel"  placeholder="1000元起投，100元起递增"/>
 	</div>
 	<div class="invite-mes f28 borderB">
 		<span>推荐描述</span>
 		<input type="text" placeholder="用一句话激励客户去履约 (选填)"/>
 	</div>
 	<p class="invite-mes-p f28 color_font-99">20字以内</p>
 	
 	<button class="btn invite-btn dis">发起邀约</button>
 </div>
</template>

<script>
  export default {
  
    name: 'invite',
  
    data() {
      return {
  
      }
    }
  }
</script>

<style lang="scss" scoped>
.invite{
	margin: 0 auto;
	padding: 0;
	width: 7.5rem;
	overflow: hidden;
	&-top{
		float: left;
		margin: 0 .3rem;
		width: 6.9rem;
		overflow: hidden;
		&-div1{
			float: left;
			margin: .6rem 0 0 0;
			padding: 0 .74rem;
			width: 5.42rem;
			color: #FFFFFF;
			.span1{
				float: left;
				width: .48rem;
				height: .48rem;
				background: #208AFF;
				border-radius: .48rem;
				line-height: .48rem;
				text-align: center;
			}
			.span2{
				margin: .24rem 0 0 0;
				float: left;
				width: 1.99rem;
				height: 1px;
				background: #208AFF;
			}
		}
		&-div2{
			float: left;
			margin: .24rem 0 .6rem;
			padding: 0 .2rem;
			width: 6.5rem;
			display: flex;
			justify-content: space-between;
			color: #666666;
			.span1{
				width: 1.7rem;
				text-align: center;
			}
			.span2{
				width: 1.15rem;
				text-align: center;
			}
		}
	}
	&-mes{
		margin: 0 .3rem;
		width: 6.9rem;
		height: 1.0rem;
		display: flex;
		align-content: center;
		align-items: center;
		span{
			width: 1.58rem;
			text-align: left;
		}
		input{
			width: 5.18rem;
			font-size: .28rem;
			text-align: left;
		}
		img{
			width: .14rem;
			height: .24rem;
			background-size: 100% 100%;
		}
		&-p{
			margin: .22rem .3rem 0;
			text-align: right;
		}
	}
	&-btn{
		margin: .6rem .3rem 0;
		width: 6.9rem;
	}
	.dis{
		background-color: #E5E5E5;
	}
}
</style>

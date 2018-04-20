<template>
 <div class="selectUser">
 
 	<div class="selectUser-div borderB">
 		<img src="../../assets/main/mine/userImg.png"/>
 		<p class="p1 f30">张雪倍 女 22岁</p>
 		<p class="p2 f28">18392137777</p>
 		
 		<img src="../../assets/common/check_succ.png"/>
 		
 	</div>
 	
 </div>
</template>

<script>
  export default {
  
    name: 'selectUser',
  
    data() {
      return {
  
      }
    }
  }
</script>

<style lang="scss" scoped>
.selectUser{
	margin: 0 auto;
	padding: 0;
	width: 7.5rem;
	overflow: hidden;
	&-div{
		float: left;
		margin: 0 .3rem;
		width: 6.9rem;
		height: 1.8rem;
		overflow: hidden;
		display: flex;
		align-items: center;
		overflow: hidden;
		img{
			float: left;
			width: 1.0rem;
			height: 1.0rem;
			background-size: 100% 100%;
		}
		.p1{
			float: left;
			width: 4.0rem;
			margin: .48rem 0 0 0;
			color: #363636;
		}
		.p2{
			float: left;
			width: 4.0rem;
			margin: .28rem 0 .56rem;
			color: #999999;
		}
	}
}
</style>

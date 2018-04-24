<template>
	<div class="invitationRegister pageCenter">
		<img class="banner" src="../../assets/main/mine/banneryqhy@2x.png" />
		
		
		<div class="invitationRegister-div">
			
			<div class="invitationRegister-div-input borderB">
				<input type="" name="" id="" value="" />
			</div>
			
			
		</div>
		
		
		
		
		
		
		
		<button class="btn">注册</button>
	</div>
</template>

<script>
	 import {
    registerForFriend,
  } from '@/service'
	
	export default {
		name: 'invitationRegister',
		data() {
			return {}
		},
		computed: {},
		created() {},
		mounted() {},
		components: {},
		methods: {},
		watch: {}
	}
</script>

<style lang="scss" scoped>
	.invitationRegister {
		margin: 0 auto;
		padding: 0;
		width: 7.5rem;
		overflow: hidden;
		padding-bottom: 1.0rem;
		.banner {
			float: left;
			width: 7.5rem;
			height: 3.6rem;
			background-size: 100% 100%;
		}
		&-div{
			float: left;
			margin: 0.2rem  .3rem  .4rem;
			padding: .1rem  0.2rem;
			width: 6.1rem;
			height: 5.26rem;
			background: #FFFFFF;
			box-shadow: 0 0 6px 0 rgba(0,0,0,0.06);
			border-radius: 8px;
			
			&-input{
				width: 6.1rem;
				height: 1.0rem;
			}
		}
		.btn {
			margin: 0 .3rem;
			padding: 0;
			width: 6.9rem;
		}
	}
</style>
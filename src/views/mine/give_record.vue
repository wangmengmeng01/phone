<template>
  <div class="gift">
   	<div class="gift-selsectBtn f28 color_font-99">
   		<p class="blueLine">未领取(8)</p>
   		<p>已领取(1)</p>
   	</div>
   	<div class="gift-list">
   		<p class="f28 color_font-36">
   			<span>类型</span>
   			<span>赠送时间</span>
   		</p>
   		<div class="gift-list-div borderB">
   			<p class="f32">
   				<span class="colorFont">0.50%</span>
   				<span>加息券</span>
   			</p>
   			<p class="f28">
   				<span>2018.09.01</span>
   				<span>12:32:48</span>
   			</p>
   		</div>
   	</div>
  </div>
</template>

<script>
  export default {
  
    name: 'give',
  
    data() {
      return {}
    },
    computed: {},
    created() {},
    methods: {},
    watch: {}
  }
</script>

<style lang="scss" scoped>
  .gift{
  	margin:0 auto;
  	padding: 0;
  	width: 7.5rem;
  	&-selsectBtn{
  		padding: 0 1.08rem;
  		width: 5.34rem;
  		height: .8rem;
  		line-height: .8rem;
  		overflow: hidden;
  		display: flex;
		justify-content:space-between;
		border-bottom:1px solid #E5E5E5;
  		p{
  			float: left;
  			width: 1.6rem;
  			text-align: center;
  		}
  		.blueLine{
  			color: #208AFF;
  			border-bottom: 2px solid #208AFF;
  			box-sizing: border-box;
  		}
  	}
  	&-list{
  		&>p{
  		padding: 0 1.08rem;
  		width: 5.34rem;
  		height: 1.04rem;
  		line-height: 1.04rem;
  		background: #F7F7F7;
  		display: flex;
		justify-content:space-between;
		span:nth-child(1){
			width: 1.6rem;
			text-align: center;
		}
		span:nth-child(2){
			width: 1.6rem;
			text-align: center;
		}
  	
  		}
  		.borderB{
  			border-bottom: 1px solid #E5E5E5;
  		}
  		&-div{
  		margin: 0 .3rem;
  		padding: 0 .78rem;
  		width: 5.34rem;
  		height: 1.6rem;
  		background: #FFFFFF;
  		display: flex;
		justify-content:space-between;
		p:nth-child(1){
			margin: .4rem 0;
			width: 1.6rem;
			text-align: center;
			.colorFont{
				color: #FF5513;
			}
			span{
				display: block;
				width: 1.4rem;
				line-height: .4rem;
			}
		}
		p:nth-child(2){
			margin:.48rem 0 ;
			width: 1.6rem;
			text-align: center;
			color: #666666;
			span{
				line-height: .32rem;
			}
		}
		.dis{
			border: 1px solid #E5E5E5;
			line-height: .54rem;
			box-sizing: border-box;
			color: #666666;
			background-color: #FFFFFF;
		}
		
  		}
  	}
  }
</style>

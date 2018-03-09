<template>
 <div class="jionList">
		<div class="joinListDiv">
			<div class="joinCxt">
			<p>
			<span class="jionName">赵***</span>
			<span class="joinTime">2017-10-11  15:00:00</span>
			</p>
			<p>10,000.00</p>
			</div>
			<div class="joinCxt boderTop">
			<p>
			<span class="jionName">赵***</span>
			<span class="joinTime">2017-10-11  15:00:00</span>
			</p>
			<p>10,000.00</p>
			</div>
			<div class="joinCxt boderTop">
			<p>
			<span class="jionName">赵***</span>
			<span class="joinTime">2017-10-11  15:00:00</span>
			</p>
			<p>10,000.00</p>
			</div>
			<div class="joinCxt boderTop">
			<p>
			<span class="jionName">赵***</span>
			<span class="joinTime">2017-10-11  15:00:00</span>
			</p>
			<p>10,000.00</p>
			</div>
		</div>
 </div>
</template>

<script>
  export default {

    name: 'jionList',

    data () {
      return {

      }
    }
  }
</script>

<style  scoped>
.jionList{
margin: 0 auto;
width:7.5rem;
overflow: hidden;
}
.joinListDiv{
	float: left;
	margin-top: 0.4rem;
	padding: 0 0.4rem 1.0rem 0.4rem;
	width:6.7rem;
	background-color: #FFFFFF;
	overflow: hidden;
}
.joinCxt{
	float: left;
	width: 6.7rem;
	height: 1.18rem;
	overflow: hidden;
}
.joinCxt>p:nth-child(1){
	float: left;
	width:3.7rem;
	height: 1.18rem;
	overflow: hidden;
}
.jionName{
	float: left;
	width: 3.7rem;
	margin:  0.22rem 0 0.08rem 0;
	font-size: 0.28rem;
	text-align: left;
	color: #181818;
	line-height: 0.4rem;
}
.joinTime{
	float: left;
	width: 3.7rem;
	line-height: .28rem;
	font-size: 0.2rem;
	text-align: left;
}
.joinCxt>p:nth-child(2){
	float: right;
	margin: 0.44rem 0;
	word-break: 3.0rem;
	height: 0.4rem;
	font-size: 0.28rem;
	text-align: right;
	line-height: 0.4rem;
}
.boderTop{
	border-top: 2px solid #CDCED3;
}
</style>

<template>
  <div class="bank_choose pageCenter">
    <!--<ul v-if="list.length">
      <liclass="color_font m4">
        <img :src="i.imgUrl" alt="" class="place-img">
        <span></span>
      </li>
    </ul>-->
    
    <div>
    	 	<div  v-for="(i,index) in list"  class="bank_choose-list borderB"  @click="choose(i,index)">
    	 		<img class="logo"   :src="require(`../../assets/wealth/logo/${i.bankNo}.png`)" />
    	 		<span class="f28">{{i.bankName}}</span>
    	 		<img v-show="showBol" class="choose" src="../../assets/wealth/choese.png"/>
    	 	</div>
    </div>
    
    
  </div>
</template>

<script>
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  import {
    getBanks
  } from '@/service'
  export default {
    name: 'bank_choose',
    data() {
      return {
        list: [],
        showBol:false,
      }
    },
    created() {
      getBanks({
        busiType: 1
      }).then(r => {
        this.list = r.list
      })
    },
    methods: {
      choose(item,index) {
        const {
          bankName,
          bankNo
        } = item;
        const backurl = this.$route.query.backurl;
        const data = this.$route.query.data;
        
//      this.showBol=!this.showBol;
        
        this.$go(backurl, {
          bankName,
          bankNo,
          data
        }, true)
      }
    },
    watch: {}
  }
</script>

<style lang="scss" scoped>
 
 .bank_choose{
 	&-list{
 		margin: 0 .3rem;
 		width: 6.9rem;
 		height: 1.2rem;
 		display: flex;
 		justify-content: flex-start;
 		align-items: center;
 		.logo{
 			width: .48rem;
 			height:.48rem;
 			background-size: 100% 100%;
 			margin-right:.3rem ;
 		}
 		.choose{
 			width: .30rem;
 			height:.22rem;
 			background-size: 100% 100%;
 		}
 		span{
 			width: 5.6rem;
 			text-align: left;
 		}
 	}
 }
 
 
</style>

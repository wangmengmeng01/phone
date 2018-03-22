<template>
 <div class="aboutUs">
 	<iframe :src="linkArr[this.$route.query.id]" width="100%" height="100%"></iframe>
 </div>
</template>

<script>
  export default {

    name: 'aboutUs',

    data () {
      return {
      	
      	linkArr:["https://hztm.chinazyjr.com/html/about/aboutUs.html","https://hztm.chinazyjr.com/html/about/securityEnsure.html","https://hztm.chinazyjr.com/html/about/disclosure.html"]

      }
    }
  }
</script>

<style lang="scss" scoped>
.aboutUs{
	width: 100%;
	height: 100%;
}
</style>

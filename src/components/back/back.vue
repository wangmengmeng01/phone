<template>
  <div class="back f36 flex p4" v-if="back !== false" :class="[back && back.background === 'main'?'main':'']">
    <div v-if="back && back.icon !== false" class="flex" @click="backFn">
      <img class="back-icon" v-if="islogin" :src="require(`@/assets/common/close.png`)" alt="">
      <img class="back-icon" v-else :src="require(`@/assets/common/arrow-left.png`)" alt="">
      <span v-if="back.showtip" class="tip">返回</span>
    </div>
    <span v-if="back && back.title !== false">{{backTitle || $route.meta.title}}</span>
  </div>
</template>

<script>
  export default {
    name: 'back',
    computed:{
      back(){
        return this.$route.meta.back
      },
      backTitle(){
        let backTitle = this.$route.query.backTitle;
        return backTitle
      },
      islogin(){
        return this.$route.path.includes('login')
      }
    },
    methods: {
      backFn(){
        if(this.islogin){
          this.$go('/');
          return
        }
        this.$router.go(-1)
      }
    },
  }
</script>
<style lang="sass" scoped>
  .back
    z-index: 100
    height: .88rem
    line-height: .88rem
    position: fixed
    top: 0
    left: 0
    right: 0
    background: #fff
    color: #181818
    .tip
      padding-left: .1rem
    &-icon
      height: .36rem
    span
      text-align: center
      flex: 1
    &.main
      color: #fff
      background: rgb(50,153,209)
</style>

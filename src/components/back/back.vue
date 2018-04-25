<template>
  <div class="back f36 flex p4" v-if="back !== false" :class="[back && back.background === 'main'?'main':'normal']">
    <div v-if="back && back.icon !== false" class="flex" @click="backFn">
      <img class="back-icon" v-if="islogin" :src="require(`@/assets/common/close.png`)" alt="">
      <img class="back-icon" v-else-if="back.background==='main'" :src="require(`@/assets/common/arrow-transparent-left.png`)" alt="">
      <img class="back-icon" v-else="back.background" :src="require(`@/assets/common/arrow-left.png`)" alt="">
      <span v-if="back.showTip" class="tip">返回</span>
    </div>
    <span class="title" v-if="back && back.title !== false">{{backTitle || $route.meta.title}}</span>
  </div>
</template>

<script>
  export default {
    name: 'back',
    computed: {
      back() {
        return this.$route.meta.back
      },
      backTitle() {
        let backTitle = this.$route.query.backTitle;
        backTitle && (document.title = backTitle);
        return backTitle
      },
      islogin() {
        return this.$route.path.includes('login')
      }
    },
    methods: {
      backFn() {
        if (this.islogin) {
          this.$go('/');
          return
        }
        
        this.$router.go(-1);
//      location.reload();
      }
    },
  }
</script>

<style lang="sass" scoped>
  .back
    .title
    z-index: 100
    height: .88rem
    line-height: .88rem
    position: fixed
    top: 0
    left: 0
    right: 0
    background: transparent
    color: #181818
    border-bottom: 1px solid rgba(0,0,0,0.03)
    .tip
      padding-left: .1rem
    &-icon
      height: .36rem
    span
      text-align: center
      flex: 1
      -webkit-flex: 1
    &.main
      color: #fff
      background: #0C80FE
    &.normal
      background: #fff
</style>

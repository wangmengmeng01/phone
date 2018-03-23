<template>
  <div>
    <div id="mask">
      <transition :name="transition">
        <slot v-if="visible"></slot>
      </transition>
    </div>
  </div>
</template>

<style lang="sass" scoped>
    #mask
        position: fixed
        top: 0
        bottom: 0
        left: 0
        right: 0
        width: 100%
        height: 100%
        z-index: 101
        background: rgba(000,000,000,.6)
        max-width: 650px
        margin: auto
</style>

<script>
  export default {
    name: 'fmask',
    data() {
      return {
        visible: false,
      }
    },
    props: {
      transition: {
        type: String,
        default: 'fade' // 默认淡入淡出
      }
    },
    mounted() {
      this.$nextTick(() => {
        document.getElementById('mask').addEventListener('touchmove', (e) => {
          e.stopPropagation();
          //              e.preventDefault();
        });
        this.visible = !this.visible;
      })
    },
  }
</script>

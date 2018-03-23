<template>
    <transition name="mint-toast-pop">
        <div class="dialog toast" v-if='visible'>
            <p>{{message}}</p>
        </div>
    </transition>
</template>

<style lang="sass" scoped>
  .mint-toast-pop-enter, .mint-toast-pop-leave-active
    opacity: 0
  .dialog
    max-width: 650px
    font-size: 18px
    z-index: 101
    width: 100%
    position: fixed
    bottom: 28%
    display: flex
    justify-content: center
    align-items: center
    left: 50%
    transform: translateX(-50%)
    p
      padding: 15px
      border-radius: 5px
      background: rgba(000,000,000,.8)
      color: #fff
</style>

<script>
    export default {
        name: 'toast',
        props: ['message'],
        data() {
            return {
                visible: false
            };
        }
    }
</script>

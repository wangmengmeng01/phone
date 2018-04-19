<template>
    <transition name="mint-toast-pop"  mode="out-in">
        <div class="dialog toast"  :style="{bottom:position}" v-if='visible'>
            <p  :style="{background:bgc,color:wordColor}">{{message}}</p>
        </div>
    </transition>
</template>

<style lang="sass" scoped>
  .mint-toast-pop-enter, .mint-toast-pop-leave-active
    opacity: 0
  .dialog
    max-width: 650px
    height: 70px
    font-size: 12px
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
      padding: 8px 25px
      border-radius: 100px
      background: rgba(000,000,000,.8)
      color: #fff
</style>

<script>
    export default {
        name: 'toast',
        props: ['message','position','bgc','wordColor'],
        data() {
            return {
                visible: false
            };
        }
    }
</script>

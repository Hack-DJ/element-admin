<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!--<keep-alive :include="cachedViews">-->
      <router-view :key="key" />
      <!--</keep-alive>-->
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.fullPath
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log('todo before enter')
    next()
  },
  beforeRouteUpdate(to, from, next) {
    console.log('todo update enter')
    next()
  },
  beforeRouteLeave(to, from, next) {
    console.log('todo leave enter')
    next()
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  position: relative;
  overflow: hidden;
}
</style>

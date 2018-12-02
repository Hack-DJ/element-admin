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
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    // noKeep() {
    //   return ['Redirect']
    // },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  height: calc(100vh - 50px);
  position: relative;
  overflow-y: auto;
}
</style>

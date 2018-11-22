const mixin = {
  beforeRouteLeave(to, from, next) {
    if (from.meta.checkEdit) {
      // console.log('判断当前组件是否验证是否修改', to, from)
    }
    next()
  }
}
export default mixin

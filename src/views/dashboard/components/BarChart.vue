<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'

require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

const animationDuration = 6000

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['安居客', '房天下', '链家', '搜房网'],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: '总价',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [179, 252, 400, 534],
          animationDuration
        }, {
          name: '均价',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [380, 652, 400, 734],
          animationDuration
        }, {
          name: '房型',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [350, 522, 522, 453],
          animationDuration
        }, {
          name: '楼层',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [674, 623, 421, 742],
          animationDuration
        }, {
          name: '朝向',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [320, 352, 400, 523],
          animationDuration
        }, {
          name: '装修',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [320, 552, 420, 334],
          animationDuration
        }, {
          name: '面积',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [300, 452, 290, 534],
          animationDuration
        }]
      })
      this.$nextTick(() => this.chart.resize())
    }
  }
}
</script>

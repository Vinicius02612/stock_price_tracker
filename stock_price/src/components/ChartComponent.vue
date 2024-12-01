<template>
  <div>
    <line-chart :chart-data="chartData" :options="chartOptions"></line-chart>
  </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import { defineComponent } from 'vue'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale,PointElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)


export default defineComponent({
  name: 'ChartComponent',
  components: {
    LineChart: Line
  },
  props: {
    chartData: {
      type: Object,
      required: true
    },
    chartOptions: {
      type: Object,
      required: true,
      default: () => ({})
    }
  }
})
</script>

<style scoped>
/* Adicione seu estilo aqui */
</style>
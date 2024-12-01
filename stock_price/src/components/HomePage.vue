<template>
   <nav>
     <h1>Text Prices</h1>
   </nav>

   <div class="container_buscar">
        <form @submit.prevent="fetchFinam">
            <input class="input" v-model="functionType" placeholder="Digite o tipo de função (e.g., SMA)"  name="functionType" id="functionType">
            <input class="input" v-model="ticker" placeholder="Digite o simbolo" name="ticker" id="ticker">
            <button type="submit">
            Buscar ação
            </button>
        </form>
   </div>
   
   <div id="demo">
        
        <transition class="transitions" name="fade">
            <ChartComponent :chart-data="chartData" />
        </transition>
       
    </div>


</template>
<script>
/* import api from '../services/api.js' */
import { ref, computed, onMounted } from 'vue'
import ChartComponent from './ChartComponent.vue'




export default {
    name: 'HomePage',
    components: {
        ChartComponent
    },
   
    setup() {
        const finance = ref('')
      
        /*
        Este codigo que de fato faz a requisição para a API da Alpha Vantage
        porem como a API é paga, não é possivel fazer a requisição sem a chave de acesso
        
        const functionType = ref('TIME_SERIES_MONTHLY_ADJUSTED')
        const ticker = ref('IBM')
        const show = ref(true) 

        const fetchFinam = async()=>{
            try{
                const response = await api.get('',{
                    params: {
                        function: functionType.value,
                        symbol: ticker.value,
                        apikey: '9RRFTAXAGK6XCRWC',
                        outputsize: 'full'
                    }
                })
                finance.value = response.data
                console.log(finance.value)
            }catch(error){
                console.log(error)
            }
        }*/

        /* 
        Tentiva de fazer a requisição ao um arquivo json na pasta public, porem o mesmo não funciona
        Erros com a biblioteca Charts.js e Vue-chartjs
        */
        onMounted( async()=>{
            try {
                const response = await fetch('/response.json')
                finance.value = await response.json()
                console.log(finance.value)
            } catch (error) {
                console.error('Error loading JSON:', error)
            }
        })
        const chartData = computed(() => {
            if(!finance.value || Object.keys(finance.value).length === 0){
                return {
                    labels: [],
                    datasets: []
                }
            }
            const labels = Object.keys(finance.value)
            const data = Object.values(finance.value).map(item => item['SMA'])

            return {
                labels,
                datasets: [
                    {
                    label: 'SMA',
                    backgroundColor: '#f87979',
                    data
                    }
                ]
            }
        })
        
        return {
            finance,
            chartData,
        }
    }

   
}
</script>

<style scoped>
    nav {
        background-color: #42b983;
        display: flex;
        height: 8vh;

        justify-content: center;
        align-items: center;

        font-family: 'Courier New', Courier, monospace;


    }
    #demo{
        margin-top:100px ;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .container_buscar{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        width: 100%;
    }
    #buscar{
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #42b983;
    }
    button{
        background-color: #42b983;
        color: white;
        border: none;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
    }
    .transitions{
        margin: 20px;
        background-color: #42b983;
        color: white;
        padding: 10px;
        height: 60vh;
        width: 70%;

        display: flex;
        justify-content: center;
        align-items: center;

    }
    .input{
        height: 50px;
        padding: 10px;
        margin: 10px;
        width: 100%;

        border: #42b983 1px solid;
    }
    h1 {
        color: white;
        font-size: 2rem;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity 1s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
        opacity: 0;
    }
</style>

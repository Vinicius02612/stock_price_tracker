<template>
   <nav>
     <h1>Text Prices</h1>
   </nav>

   <div class="container_buscar">
        <input class="input" v-model="functionType" placeholder="Enter function type (e.g., SMA)" name="functionType" id="functionType">
        <input class="input" v-model="ticker" placeholder="Digite o simbolo"  name="buscar" id="buscar">
        <button type="submit" @click="fetchFinam">
            Buscar acão
        </button>
   </div>
   
   <div id="demo">
        
        <transition class="transitions" name="fade">
            <div v-if="show">
                <ul>
                    <li v-for="item in finash" :key="item.date">{{ item.date }}: {{ item.value }}</li>
                </ul>
            </div>
        </transition>
    </div>


</template>
<script>
import api from '../services/api.js'
import { ref } from 'vue'


export default {
    name: 'HomePage',
    $el: '#demo',

    setup() {
        const finance = ref([])
        const ticker = ref('')
        const show = ref(true)

        const fetchFinam = async()=>{
            try{
                const response = await api.get('',{
                    params: {
                        function: 'SMA',
                        symbol: ticker.value,
                        apikey: 'SUK9VPIQXGZWKPS2',
                        outputsize: 'full'
                    }
                })
                finance.value = response.data
                console.log(finance.value)
            }catch(error){
                console.log(error)
            }
        }

        return {
            finance,
            ticker,
            show,
            fetchFinam
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
        margin: 20px;
        width: 50%;
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

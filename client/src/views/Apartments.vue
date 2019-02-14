<template>
    <div class="apartment">
        <v-container>
        <div class="houses">
            <House  v-for="apartment in apartments" :key="apartment.id" :house="apartment"/>            
        </div>
    </v-container>
    </div>
</template>

<script>
import House from '@/components/House'
import axios from 'axios';
const apiUrl = 'http://localhost:3000/api/apartments';

export default {
    data(){
        return{
            apartments: []
        }
    },
    components:{
        House,
    },
    created(){
        axios.get(apiUrl)
        .then((res) => {
            this.apartments = res.data.data;
        })
        .catch((err) => {
            console.log("Opps an error", err)
        })
    }
}
</script>

<style scoped>
.houses{
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start
}

.house{
  width: 30%;
}
</style>

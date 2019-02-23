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

export default {
    data(){
        return{
            
        }
    },
    components:{
        House,
    },
    computed: {
        apartments(){
            return this.$store.state.allApartments;
        }
    },
    created(){
        this.$store.dispatch('getAllApartments')
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

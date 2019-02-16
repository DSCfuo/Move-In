<template>
    <SearchResults page="dashboardSearch" :modify="true" />
</template>


<script>
import SearchResults from '../views/SearchResults.vue'
export default {
    components: {
        SearchResults
    }
}
</script>
<template>
    <div>
        <Header headerTitle="Admin Login" />
        <LogInForm />
    </div>
</template>

<script>
import LogInForm from '@/components/LogInForm.vue'
import Header from '@/components/Header.vue'
export default {
    components: {
        LogInForm,
        Header,
    }
}
</script>

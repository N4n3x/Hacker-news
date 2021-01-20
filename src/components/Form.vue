<template>
    <form @submit.prevent="submitForm">
        <input type="text" name="" id="">
        <button>Send</button>
    </form>
</template>

<script>
export default {
    methods: {
        submitForm(){
            // traitement
            this.$router.push({ name : "app" });
        }
    }
}
</script>
<template>
    <div>
        <slot v-if="token" name="yes">

        </slot>
        <slot v-if="!token" name="no">

        </slot>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    computed:{
        ...mapState("auth", ["token"]),
    }
}
</script>

<style>

</style>
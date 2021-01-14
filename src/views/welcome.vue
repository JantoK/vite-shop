<template>
    <div class="welcome">
        welcome-pages
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'Welcome'
})
</script>

<style lang="scss" scoped>
.welcome {
  @include FontStyle(30px, $success, 800, 32px)
}
</style>
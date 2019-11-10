<template>
  <div class="client">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Landing'
}
</script>

<style scoped>
.client {
  margin: auto;
  overflow-x: hidden;
  height: 100vh;
}
</style>
<template>
  <div class="client">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Landing"
};
</script>
<style scoped>
.client {
  width: 700px;
  border: 1px solid red;
  margin: auto;
  height: 100vh;
}
</style>
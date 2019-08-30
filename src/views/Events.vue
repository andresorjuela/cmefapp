<template>
  <section class="home">
    <div class="row">
      <Icon type="md-arrow-round-back" size="24"  @click="goBack()" />
      <div class="logos--row">
        <img src="@/assets/images/Orantect-logo.png" class="orantect--logo" />
        <img src="@/assets/images/CMEF_logo.jpg" class="cmef--logo" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Events',
  data(){
    return {

    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.home {
  max-width: 600px;
  height: 100%;
  margin: auto;
  border: 1px solid lightgray;
  background-size: 100% 100%;
  display: flex;
  overflow-y: scroll;
  flex-direction: column;
  justify-content: flex-start;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 2% 2%;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 3% 5% 3% 5%;
  border-bottom: 1px solid gray;
}
.logos--row {
  display: flex;
  flex-direction: row;
  margin-left: 5vw;
  justify-content: space-between;
}
.orantect--logo {
  width: 25%;
  height: auto;
}
.cmef--logo {
  width: 30%;
  height: auto;
}
.card {
  width: 95%;
  margin: auto;
}
</style>

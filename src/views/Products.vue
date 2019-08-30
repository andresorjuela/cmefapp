<template>
  <section class="home">
    <div class="row">
      <Icon type="md-arrow-round-back" size="24"  @click="goBack()" />
      <div class="logos--row">
        <img src="@/assets/images/Orantect-logo.png" class="orantect--logo" />
        <img src="@/assets/images/CMEF_logo.jpg" class="cmef--logo" />
      </div>
    </div>
      <Card class="card" style="margin-top: 1vh;">
      <div class="products">
          <div class="product" v-for="i in 16" :key="i" >
          <img src="@/assets/images/ECG.jpg" class="product--logo" />
        <h4>ECG</h4>
        </div>
      </div>
      </Card>
  </section>
</template>

<script>
export default {
  name: 'Products',
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
  align-items: center;
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
.products{
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;

}
.product{
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 48%;
  border: 1px solid gray;
  padding: 2%;
  margin-top: 2vh;
  border-radius: 2px;
}
.product--logo{
  width: 100%;
  border-radius: 5px;
}
</style>

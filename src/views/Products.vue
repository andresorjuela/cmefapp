<template>
  <section class="home">
    <div class="row">
      <Icon type="md-arrow-round-back" size="24" @click="goBack()" />
      <h2 class="pageTitle">Patient Monitor Cables and Sensors</h2>
    </div>
    <a
      href="https://ot-product-image.oss-cn-shenzhen.aliyuncs.com/catalogue/OT_brochure_EN.pdf?nsukey=wWibDeWtqeqdVHm%2F34JXp%2BFSp577KV%2Fh2I94BQ6xAi7JGSgzE85PJUj44YpXDD%2F7WJhSe%2BVQzdNB3XV5XoPf8ClSZl17c66MbN%2FtJzcFCJVOLEkWCginL5c8M4y5sm4ft4lJP8%2B7PsvE6oNGcufwjZ%2FTqJSyklyI2iQ3nwr%2FWs7GIX207D5hcU9juXANYE8sfYbEirr9EptRfQL2CaEeaA%3D%3D"
      target="_blank"
    >
      <Card class="card--top" style="margin-top: 0.5vh">
        <div class="row_SB">
          <h3>PDF Product Brochure</h3>
          <img src="@/assets/images/pdf.png" class="icon" />
        </div>
      </Card>
    </a>
    <Card class="card" style="margin-top: 0.5vh;">
      <div class="products">
        <div v-for="(item , index) in products" :key="index" class="product">
          <img :src="item.pic" class="product--logo" />
          <h4>{{ item.name }}</h4>
        </div>
      </div>
    </Card>
  </section>
</template>

<script>
export default {
  name: 'Products',
  data() {
    return {
      products: [
        {
          name: 'Spo2',
          pic: require('./../assets/images/Spo2.jpg')
        },
        {
          name: 'ECG',
          pic: require('./../assets/images/ECG.jpg')
        },
        {
          name: 'NIBP',
          pic: require('./../assets/images/NIBP.jpg')
        },
        {
          name: 'Temperature',
          pic: require('./../assets/images/Temperature.jpg')
        },
        {
          name: 'EKG',
          pic: require('./../assets/images/EKG.jpg')
        },
        {
          name: 'IBP',
          pic: require('./../assets/images/IBP.jpg')
        },
        {
          name: 'Fetal',
          pic: require('./../assets/images/Fetal.jpg')
        },
        {
          name: 'O2',
          pic: require('./../assets/images/O2.jpg')
        },
        {
          name: 'EtCO2',
          pic: require('./../assets/images/EtCO2.jpg')
        },
        {
          name: 'MPC',
          pic: require('./../assets/images/MPC.jpg')
        },
        {
          name: 'Repair Parts',
          pic: require('./../assets/images/Repair_Parts.jpg')
        },
        {
          name: 'Vet',
          pic: require('./../assets/images/VET.jpg')
        }
      ]
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
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
  padding: 4% 5% 4% 5%;
  border-bottom: 1px solid gray;
}
.row_SB {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.logos--row {
  display: flex;
  flex-direction: row;
  margin-left: 5vw;
  align-items: center;
  justify-content: space-between;
}

.orantect--logo {
  width: 50%;
  height: 35px;
}

.cmef--logo {
  width: 45%;
  height: 46px;
}
.card {
  width: 95%;
  margin: auto;
}

.card--top {
  width: 95%;
  margin: auto;
}

.products {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
}

.product {
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

.product--logo {
  width: 100%;
  border-radius: 5px;
}
.pageTitle {
  width: 100%;
  text-align: center;
}
.icon {
  width: 32px;
  height: 32px;
}
</style>

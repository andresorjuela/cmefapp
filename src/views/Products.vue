<template>
<section class="home">
    <div class="row">
        <Icon type="md-arrow-round-back" size="24" @click="goBack()" />
        <h3 class="pageTitle">兼容性监护电缆与传感器</h3>
    </div>
    <Card class="card" style="margin-top: 1vh;">
        <div class="products">
            <div v-for="(item , index) in products" :key="index" class="product">
                <img :src="item.pic" class="product--logo">
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
            products: [{
                name: '血氧',
                pic: require('./../assets/images/Spo2.jpg'),
            }, {
                name: '监护心电',
                pic: require('./../assets/images/ECG.jpg'),
            }, {
                name: '无创血压',
                pic: require('./../assets/images/NIBP.jpg'),
            }, {
                name: '体温',
                pic: require('./../assets/images/Temperature.jpg'),
            }, {
                name: '诊断心电',
                pic: require('./../assets/images/EKG.jpg'),
            }, {
                name: '有创压',
                pic: require('./../assets/images/IBP.jpg'),
            }, {
                name: '胎监',
                pic: require('./../assets/images/Fetal.jpg'),
            }, {
                name: '氧气',
                pic: require('./../assets/images/O2.jpg'),
            }, {
                name: '二氧化碳',
                pic: require('./../assets/images/EtCO2.jpg'),
            },  {
                name: '多参数',
                pic: require('./../assets/images/MPC.jpg'),
            }, {
                name: '维修部件',
                pic: require('./../assets/images/Repair_Parts.jpg'),
            }, {
                name: '动物',
                pic: require('./../assets/images/VET.jpg'),
            }],
        };
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
    },
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
.pageTitle{
    width: 100%;
    text-align: center;
}
</style>

<template>
    <div>
        <div class="container" style="height: 650px;">
            <section class="articles" style="margin-top: 20px; margin-bottom: 20px;">
                <div class="card-content" style="width: 80%;">
                    <p class="content">
                            Our goal is to help house hunters in Utah determine the correct price of a home based on specifications and location. Simply enter your desired home specifications or your current home specifications (if selling) to get a better idea of the market value
                            of your home. <b style="font-size: 20px;">Our algorithm is proven to be on average 8% more accurate than Zillow's "Zestimates".</b> If you have any more questions about our process head over to our about page.
                    </p>
                </div>
                <div class="columns">
                    <!-- Input -->
                    <div class="column">
                        <div class="card-content">
                            <div class="content">
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input is-large" type="text" placeholder="Square Ft." v-model="Sqft">
                                    <span class="icon is-medium is-left">
                                    <i class="fa fa-search"></i>
                                    </span>
                                    <span class="icon is-medium is-right">
                                        <i class="fa fa-check"></i>
                                    </span>
                                </div>
                                <!-- <div class="control has-icons-left has-icons-right" style="margin-top: 10px;">
                                    <input class="input is-large" type="text" placeholder="Year Built" value="YearBuilt">
                                    <span class="icon is-medium is-left">
                                    <i class="fa fa-search"></i>
                                    </span>
                                    <span class="icon is-medium is-right">
                                        <i class="fa fa-check"></i>
                                    </span>
                                </div> -->
                                <div class="control has-icons-left has-icons-right" style="margin-top: 10px;">
                                    <input class="input is-large" type="text" placeholder="Bedrooms" v-model="Bedrooms">
                                    <span class="icon is-medium is-left">
                                    <i class="fa fa-search"></i>
                                    </span>
                                    <span class="icon is-medium is-right">
                                        <i class="fa fa-check"></i>
                                    </span>
                                </div>
                                <div class="control has-icons-left has-icons-right" style="margin-top: 10px;">
                                    <input class="input is-large" type="text" placeholder="Baths" v-model="Baths">
                                    <span class="icon is-medium is-left">
                                    <i class="fa fa-search"></i>
                                    </span>
                                    <span class="icon is-medium is-right">
                                        <i class="fa fa-check"></i>
                                    </span>
                                </div>
                                <div class="control has-icons-left has-icons-right" style="margin-top: 10px;">
                                    <input class="input is-large" type="text" placeholder="Zip" v-model="Zip">
                                    <span class="icon is-medium is-left">
                                    <i class="fa fa-search"></i>
                                    </span>
                                    <span class="icon is-medium is-right">
                                        <i class="fa fa-check"></i>
                                    </span>
                                </div>
                                <div class="control has-icons-left has-icons-right" style="margin-top: 10px;">
                                    <input class="input is-large" type="text" placeholder="Lot" v-model="Lot">
                                    <span class="icon is-medium is-left">
                                    <i class="fa fa-search"></i>
                                    </span>
                                    <span class="icon is-medium is-right">
                                        <i class="fa fa-check"></i>
                                    </span>
                                </div>
                            </div>
                            <input class="button" @click="getPredictedPriceSold" type="submit" value="Submit Criteria">
                        </div>
                    </div>

                <!-- text -->
                <div class="column">
                    <div class="card-content">
                        <div class="media">
                            <div class="media-content has-text-centered">
                                <!-- <p class="title article-title">Recommendation</p>
                                <p class="subtitle is-6 article-subtitle">
                                    April 17, 2019
                                </p> -->
                                <div v-if="Sold != null">
                                    <h1 class="title">Predicted Value Is:</h1>
                                    <h1 class="title" style="color: #009e6c">${{ Sold }}</h1>
                                </div>
                                <!-- <select style="width: 200px;" class="select is-info" v-model="selectedItem">
                                    <option>Select Product</option>
                                    <option v-for="p in items" :key="p.ItemID + Math.random()" :value="p.ItemID">{{ p.Zip }}</option>
                                </select> -->
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'ZillowAnalytics',
        data() {
            return {
                items: {},
                selectedItem: '',
                Bedrooms: '',
                Sqft: '',
                Lot: '',
                Baths: '',
                Zip: '',
                Sold: null,
            }
        },
        methods: {
            getItems(){
                axios.get('/api/seeAllData').then(res => {
                    this.items = res.data;
                })
            },
            getPredictedPriceSold() {
                console.log('here we go!');
                console.log(this.Sqft, this.Zip);
                axios.post('/api/PredictPriceSold', {
                            "Inputs": {
                                "input1": {
                                "ColumnNames": [
                                    "sold",
                                    "sqft",
                                    "Bath",
                                    "Beds",
                                    "Lot",
                                    "Zip"
                                ],
                                "Values": [
                                    [
                                    "0",
                                    this.Sqft,
                                    this.Baths,
                                    this.Bedrooms,
                                    this.Lot,
                                    this.Zip
                                    ],
                                ]
                                }
                            },
                            "GlobalParameters": {}
                            }).then(res => {
                            console.log(res.data);
                            // res.data.shift();
                            this.Sold = parseInt((JSON.parse(res.data)));
                            console.log(this.Sold);
                            
                        });
            },
        },
        created(){
            this.getItems();
        }
    }
</script>

<style scoped>

</style>


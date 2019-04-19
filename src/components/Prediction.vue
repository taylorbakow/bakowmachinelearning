<template>
    <div>
        <section class="section hero is-info">
            <h1 class="title is-1" style="margin-bottom: 10px;">
                Amazon Recommendations
            </h1>
            <h2 class="subtitle" style="margin-top: 20px;">
                Taylor Bakow
            </h2>
        </section>
        <section class="section hero is-light">
            <div class="columns">
                <div class="column">
                    <h1 class="title">
                        Related Users
                    </h1>
                    <select class="select is-info" v-model="selectedUser">
                        <option>Select User</option>
                        <option v-for="u in users" :key="u.reviewerID + Math.random()" :value="u.reviewerID">{{ u.reviewerName }}</option>
                    </select>
                    <br/>
                    <button class="button is-link" @click="getRelatedUserPrediction">Get Related Users</button>
                    <div class="subtitle is-6" v-if="relatedUsers.length > 0">
                        <ul>
                            <li style="margin-top: 5px; margin-bottom: 5px;" v-for="u in relatedUsers" :key="u.user + Math.random()">{{ u.reviewerName }}</li>
                        </ul>
                    </div>
                </div>
                <div class="column">
                    <h1 class="title">
                        Related Products
                    </h1>
                    <select class="select is-info" v-model="selectedProduct">
                        <option>Select Product</option>
                        <option v-for="p in products" :key="p.asin + Math.random()" :value="p.asin">{{ p.productName }}</option>
                    </select>
                    <br/>
                    <button class="button is-link" @click="getRelatedItemPrediction">Get Related Products</button>
                    <div class="subtitle is-6" v-if="relatedProducts.length > 0">
                        <ul>
                            <li style="margin-top: 5px; margin-bottom: 5px;" v-for="p in relatedProducts" :key="p.products + Math.random()">{{ p.productName }}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
                <div>
                    <h1 class="title">
                        Item Recommender
                    </h1>
                    <select class="select is-info" v-model="selectedUserItemUser">
                        <option>Select User</option>
                        <option v-for="u in useritemsUsers" :key="u.reviewerID + Math.random()" :value="u.reviewerID">{{ u.reviewerName }}</option>
                    </select>
                    <select class="select is-info" v-model="selectedUserItemItem">
                        <option>Select Product</option>
                        <option v-for="p in useritemsItems" :key="p.asin + Math.random()" :value="p.asin">{{ p.productName }}</option>
                    </select>
                    <br/>
                    <button class="button is-link" @click="getRelatedItemFromUserPrediction">Get Related Products</button>
                    <div class="subtitle is-6" v-if="relatedUserItems.length > 0">
                        <ul>
                            <li style="margin-top: 5px; margin-bottom: 5px;" v-for="p in relatedUserItems" :key="p.products + Math.random()">{{ p.productName }}</li>
                        </ul>
                    </div>
                </div>
        </section>
        <section class="section">
            <h3>Built with Vue.js and Azure Machine Learning Studio</h3>
        </section>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'Prediction',
        data() {
            return {
                users: {},
                selectedUser: '',
                relatedUsers: [],
                products: {},
                selectedProduct: '',
                relatedProducts: [],
                useritemsUsers: {},
                useritemsItems: {},
                selectedUserItemUser: '',
                selectedUserItemItem: '',
                relatedUserItems: [],
            }
        },
        methods: {
            getRelatedUserPrediction() {
                axios.post('/api/PredictRelatedUser', {
                        "Inputs": {
                            "input1": {
                            "ColumnNames": [
                                "reviewerID"
                            ],
                            "Values": [
                                [this.selectedUser],
                            ]
                            }
                        },
                        "GlobalParameters": {}
                        }).then(res => {
                            res.data.shift();
                            this.relatedUsers = res.data;
                        });
            },
            getRelatedItemPrediction() {
                axios.post('/api/PredictRelatedProduct', {
                        "Inputs": {
                            "input1": {
                            "ColumnNames": [
                                "asin"
                            ],
                            "Values": [
                                [this.selectedProduct],
                            ]
                            }
                        },
                        "GlobalParameters": {}
                        }).then(res => {
                            res.data.shift();
                            this.relatedProducts = res.data;
                        });
            },
            getRelatedItemFromUserPrediction(){
                axios.post('/api/PredictRelatedUserItem', {
                            "Inputs": {
                                "input1": {
                                "ColumnNames": [
                                    "reviewerID",
                                    "asin"
                                ],
                                "Values": [
                                    [
                                    this.selectedUserItemUser,
                                    this.selectedUserItemItem,
                                    ],
                                ]
                                }
                            },
                            "GlobalParameters": {}
                            },
                        ).then(res => {
                            res.data.shift();
                            this.relatedUserItems = res.data;
                        });
            },
            getUsers(){
                axios.get('/api/getUsers').then(res => {
                    this.users = res.data;
                    this.useritemsUsers = res.data;
                })
            },
            getProducts(){
                axios.get('/api/getProducts').then(res => {
                    this.products = res.data;
                    this.useritemsItems = res.data;
                })
            },
        },
        created(){
            this.getUsers();
            this.getProducts();
        }
    }
</script>

<style scoped>
    select {
        width: 300px;
        margin-bottom: 10px;
    }
</style>
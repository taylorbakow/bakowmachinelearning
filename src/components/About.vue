<template>
    <div>
        <div class="container" style="height: 700px;">
            <section class="articles" style="margin-top: 20px;">
                <div class="columns">
                    <div class="column">
                        <div class="card-content">
                            <div class="content">
                                <h1 class="title">About Us</h1>
                                <h2>Our Algorithm</h2>
                                <h4 class="subtitle">Check Out Our Machine Learning Model by Clicking <a href="https://gallery.cortanaintelligence.com/Experiment/Final-Taco-Beats-Zillow">here!</a></h4>
                                <p class="content">
                                    Our algorithm is fed by a constant stream of housing data coming from sources that our team has scraped from the web. 
                                    This data is updated constantly to keep our algorithm as accurate and relevant as possible. Once the data passes through our 
                                    cleaning and parsing process, it is pushed into our machine learning model containing regressions and other processes to 
                                    provide the most accurate prediction possible. 
                                </p>
                                <h2>How We Beat Zillow</h2>
                                <p class="content">
                                    For every listing on Zillow, Zillow posts a "Zestimate" based on what they believe the listed house should sell for. We have compared the predicted sold value based on our algorithm 
                                    to the Zestimate for sold listings. On average, Zestimate values are off the sold value for a given listing by 18%. Within Utah, our algorithm predicts sold values off of the actual sold value of a home by only <b>10%</b>. 
                                </p>
                                <h2>Who We Are</h2>
                                <div class="media-center">
                                    <img src="../assets/logo.png" style="width: 100px; height: 100px; border-radius:10px;" class="author-image" alt="Placeholder image">
                                </div>
                                <p class="content">
                                    We are Tacohojo consulting (Taylor Bakow, Connor Mcleod, Hoyong Jung, and Jon Facer). A group of Information System students at Brigham Young University trained in data analytics and machine learning
                                    by Professor Mark Keith. 
                                </p>
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
        
    }
</script>

<style scoped>

</style>
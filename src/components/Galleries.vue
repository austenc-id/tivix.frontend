<template>
    <div id="gallery-content">
        <nav>
            <h4 class="link" v-for="gallery in galleries.defaultList" @click="renderGallery(gallery)">{{ gallery.title }}</h4>
        </nav>
    <Gallery v-if="activeGallery" :gallery="activeGallery"/>
    </div>

</template>

<script>
import Gallery from './Gallery'
export default {
    name: 'Galleries',
    components:{
        Gallery
    },
    props: {
        galleries: Object,
    },
    created() {
        // console.log('created  Galleries')
        // console.log(this.galleries)
    },
    mounted() {
        // console.log('mounted Galleries')
        // console.log(this.galleries)
    },
    data() {
        return {
            activeGallery: false,
        }
    },
    methods: {
        renderGallery(gallery) {
            this.sortMovies(gallery)


        },
        sortMovies(gallery) {
            gallery.movies.sort(compareTitles)
            gallery.movies.sort(compareYears)
            this.sleep(0.01)
                .then(this.activeGallery = gallery)
            function compareTitles(a, b) {
                if (a.card.title > b.card.title) { return 1 }
                if (a.card.title < b.card.title) { return -1 }
                return 0
            }
            function compareYears(a, b) {
                if (a.card.year > b.card.year) { return -1 }
                if (a.card.year < b.card.year) { return 1 }
                return 0
            }
        },
        sleep(sec) {
            let ms = sec * 1000
            return new Promise(resolve => setTimeout(resolve, ms));
        },
    }
}
</script>

<style>
</style>
<template>
    <div id="search-form">
        <form onsubmit="event.preventDefault()">
            <label for="query">Movie Title:</label>
            <input type="text" name="query" id="query">
            <button @click="submitSearch()">search</button>
        </form>
    </div>
    <Gallery v-if="activeGallery" :gallery="activeGallery"/>
</template>

<script>
import Gallery from './Gallery';
export default {
    name: 'Search',
    components: {
        Gallery
    },
    props: {
        url: String,
    },
    created() {
        // console.log('created Search')
    },
    mounted() {
        // console.log('mounted  Search')
    },
    data() {
        return {
            activeGallery: false
        }
    },
    methods: {
        async submitSearch() {
            let query = document.getElementById('query').value
            let url = `${this.url}/${query}/10`
            await fetch(url)
                .then(response => response.json())
                .then(response => {
                    let gallery = {
                        title: 'Search Results',
                        description: `from your "${query}" query`,
                        movies: response.movies
                    }
                    this.activeGallery = gallery
                    console.log(this.activeGallery)

                })
        }
    }
}
</script>

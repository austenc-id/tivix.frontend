<template>
    <div>
        <div class="gallery">
            <h2>{{ gallery.title }}</h2>
            <p>{{ gallery.description }}</p>
            <section>
                <div class="card" v-for="movie in gallery.movies" @click="showDetailedCard(movie)" :id="movie.id + '-small'">
                    <h4 class="trunc">{{ movie.card.title }}</h4>
                    <h5>{{ movie.card.year }}</h5>
                    <img :src="movie.card.poster" :alt="movie.card.title + '-poster'" v-if="movie.card.poster != 'N/A'">
                    <span>{{ movie.genres }}</span>
                </div>
            </section>
            <Teleport to="body">
                <!-- use the modal component, pass in the prop -->
                <Details :show="showModal" @close="showModal = false" :movie="modalMovie">
                    <template>
                    </template>
                </Details>
            </Teleport>
        </div>

    </div>

</template>

<script>
import Details from './Details'
export default {
    name: 'Gallery',
    components: {
        Details
    },
    props: {
        gallery: Object
    },
    data() {
        return {
            url: 'http://127.0.0.1:8000/api/productions',
            showModal: false,
            modalMovie: {},
        }
    },
    created() {
        this.fetchMovies()
    },
    methods: {
        showDetailedCard(movie) {
            this.modalMovie = movie
            this.showModal = true
        },
        async fetchMovies() {
            let movies = []
            this.gallery.movies.forEach(movie => {
                fetch(`${this.url}/${movie.id}`)
                    .then(response => response.json())
                    .then(response => {
                        movie = response
                        movies.push(movie)
                        return movies
                    })
            })
        }
    }
}

</script>
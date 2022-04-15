Vue.createApp({
    data() {
        return {
            title: 'Movie Buff',
            subTitle: 'Demo',
            loadTime: 1,
            loading: 'Waking up Heroku Dyno...',
            baseUrl: 'http://127.0.0.1:8000/api',
            galleries: [],
            formActive: false,
            activeGallery: false,

        }
    },
    created() {
        this.fetchGalleries()
    },
    mounted() {
        this.renderApp()
    },
    delimiters: ['--', '--'],
    methods: {
        async fetchGalleries() {
            await fetch(this.baseUrl + '/galleries/')
                .then(response => response.json())
                .then(data => (this.galleries = data))
                .then(data => (this.galleries = this.fillGalleries()))
        },
        fillGalleries(){
            let galleries = []
            this.galleries.forEach(gallery => {
                let movies = []
                gallery.productions.forEach(id => {
                    this.fetchMovie(id)
                        .then(data => (movies.push(data)))
                })
                gallery.productions = movies
                galleries.push(gallery)
            })
            console.log(galleries)
            return galleries
        },
        async fetchMovie(id){
            let movie = await fetch(`${this.baseUrl}/movies/${id}`)
                .then(response => response.json())
                .catch(error => console.log(error))
            return movie
        },
        renderApp(){
            this.loadTime = 0
        },
        toggleForm() {
            if (this.formActive === true) {
                document.getElementById('galleryForm').style.display = 'none'
                this.formActive = !this.formActive
            }
            else {
                document.getElementById('galleryForm').style.display = 'flex'
                this.formActive = !this.formActive
            }
        },
        renderGallery(gallery){
            console.log(gallery)
            this.activeGallery = gallery
        },
        async submitForm(){
            let title = document.getElementById('newGalleryTitle').value
            let description = document.getElementById('newGalleryDescription').value
            await fetch(this.baseUrl + '/galleries/', {
                method: 'POST',
                body: JSON.stringify({
                    title: title,
                    description: description
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => (console.log(response)))
        }
    }
}).mount('#app')

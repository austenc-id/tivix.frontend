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
            allMovies: [],

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
                .then(data => (this.checkGalleries(data)))
                .then(data => (this.galleries = data))
                .then(data => (this.galleries = this.fillGalleries()))
        },
        checkGalleries(data){
            let valid = []
            data.forEach(gallery => {
                if (gallery.title != ''){
                    valid.push(gallery)
                }
            })
            return valid
        },
        fillGalleries() {
            let galleries = []
            this.galleries.forEach(gallery => {
                let movies = []
                gallery.productions.forEach(movie => {
                    this.fetchMovie(movie)
                        .then(data => (movies.push(data)))
                        .then(data => (this.allMovies.push(data)))
                })
                gallery.productions = movies
                galleries.push(gallery)
            })
            return galleries
        },
        async fetchMovie(movie) {
            let details = await fetch(`${movie}details`)
                .then(response => response.json())
                .catch(error => console.log(error))
            return details
        },
        renderApp() {
            this.loadTime = 0
            this.sleep(.01)
                .then(this.hideForms)
            this.sleep(.01)
                .then(execute)
            function execute(){
                document.getElementById('galleryNav').classList.add('hidden')
                document.getElementById('show').classList.add('hidden')
                document.getElementById('gallery').classList.add('hidden')
            }
        },
        toggleGalleryNav(){
            document.getElementById('galleryNav').classList.toggle('hidden')
        },
        toggleForm(form) {
            this.renderApp();
            this.sleep(.01)
                .then(execute)
            function execute() {
                document.getElementById(form).classList.toggle('hidden');
            }
        },
        renderGallery(gallery) {
            this.renderApp();
            this.sleep(.01)
                .then(execute)
            this.activeGallery = gallery;
            this.activeGallery.productions.sort(this.compareYears)
            function execute() {
                document.getElementById('gallery').classList.remove('hidden');
            }
        },
        async submitGalleryForm() {
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
            }).then(response => (console.log(response)))
        },
        async submitMovieForm(gallery) {
            let title = document.getElementById('newMovieTitle').value
            await fetch(`${this.baseUrl}/movies/${title}/query`)
                .then(response => response.json())
                // .then(response => console.log(response))
                .then(data => this.errorCheck(data))
                .catch(error => console.log(error))
                .then(data => this.addMovie(data))
                .then(data => (window.location.reload()))
        },
        async addMovie(movie) {
            console.log(this.activeGallery)
            console.log(movie)
            await fetch(this.activeGallery.url, {
                method: 'PATCH',
                body: JSON.stringify({
                    productions: [movie.id]
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        },
        async removeMovies(form) {
            this.activeGallery.productions.forEach(production => {
                let element = document.getElementById('removeMovie' + production.id)
                let checked = element.checked
                if (checked) {
                    let proceed = confirm(`About to remove ${production.title} (${production.year}) from ${this.activeGallery.title}`)
                    if (proceed) {
                        fetch(this.activeGallery.url, {
                            method: 'PATCH',
                            body: JSON.stringify({
                                remove: [production.id]
                            }),
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        })
                    }
                }
            })
            window.location.reload()
        },
        errorCheck(data) {
            if (data.id == null) {
                throw new Error(data.message)
            }
            else {
                return data
            }
        },
        hideForms() {
            let forms = document.getElementsByTagName('form')
            forms[0].classList.add('hidden')
            forms[1].classList.add('hidden')
            forms[2].classList.add('hidden')
            // ! just refuses to call the loop. no errors. nothing. ????
            for (let i = 0; i > forms.length; i++) {
                let element = forms[i]
                console.log(element)
                element.classList.add('hidden')
                console.log(element.classList)
            }
        },
        toggleGalleryControls(controls) {
            document.getElementById('show').classList.toggle('hidden')
            document.getElementById('hide').classList.toggle('hidden')
            document.getElementById(controls).classList.toggle('hidden')
        },
        compareYears(a, b) {
            if (a.year < b.year) {
                return -1
            }
            if (a.year > b.year) {
                return 1
            }
            return 0
        },
        sleep(sec) {
            let ms = sec * 1000
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    }
}).mount('#app')

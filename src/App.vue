<template>
  <header>
    <h1>{{ title }}</h1>
    <h2>{{ subTitle }}</h2>
  </header>
  <nav>
    <h3 @click="toggleComponent('galleries')" class="link">Galleries</h3>
    <h3 @click="toggleComponent('search')" class="link">Search</h3>
  </nav>
  <main>
    <Search v-if="searchActive" :url="urls.search"/>
    <Galleries v-if="galleriesActive" :galleries="galleries" />
  </main>

</template>

<script>
import Search from './components/Search'
import Galleries from './components/Galleries'

export default {
  name: 'App',
  components: {
    Search,
    Galleries,
  },
  created() {
    // console.log('created')
    this.fetchGalleries()

  },
  mounted() {
    // console.log('mounted')
  },
  data() {
    return {
      title: 'Movie Buff',
      subTitle: 'Demo',
      galleriesActive: false,
      searchActive: false,
      urls: {
        galleries: 'https://acmf-tivix.herokuapp.com/api/galleries',
        search: 'https://acmf-tivix.herokuapp.com/search',
      },
      galleries: false,
    }
  },
  methods: {
    toggleComponent(name) {
      // console.log('toggling')
      if (name === 'search') {
        this.searchActive = !this.searchActive
      }
      if (name === 'galleries') {
        this.galleriesActive = true
      }
    },
    async fetchGalleries() {
      // console.log('fetching galleries')
      await fetch(this.urls.galleries)
        .then(response => response.json())
        .then(response => response.results)
        .then(galleries => {
          this.galleries = {
            defaultList: [],
            createdList: []
          }
          galleries.forEach(gallery => {
            if (gallery.type === 'default') {
              this.galleries.defaultList.push(gallery)
            }
            if (gallery.type === 'created') {
               this.galleries.createdList.push(gallery)
            }
          })
            return this.galleries
        })
        // .then(galleries => console.log(galleries))
        // .then(galleries => (this.galleries = galleries))

    },

  }

}
</script>

<style>
@import './style/style.css';
</style>

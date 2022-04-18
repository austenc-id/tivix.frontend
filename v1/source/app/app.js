Vue.createApp({
    delimiters: ['--', '--'],
    data(){
        return {
            title: 'Movie Buff',
            subTitle: 'Demo'
        }
    },
    methods: {},
    created(){
        console.log('created')
    },
    mounted() {
        console.log('mounted')
    },
}).mount("#app")
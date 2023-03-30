const main = {
    init: function () {
        this.cacheSelectors();
        this.bindEvents();
        this.startTimer();
        this.filmes(this.API_URL)
        this.genresList(this.API_GENRES)
    },

    cacheSelectors: function () {
        this.title = document.querySelector('h1')
        this.button = document.querySelector('.btn')
        this.input = document.querySelector('.input')
        this.search = document.querySelector('.search')
        this.main = document.querySelector('main')
        this.now_playing = document.querySelector('.nowPlaying')
        this.trending = document.querySelector('.trending')
        this.trendingD = document.querySelector('.trendingD')
        this.genres = document.querySelector(`.genres`)
        this.grossing = document.querySelector(`.grossing`)
        this.API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ff23eac1eabd1976281daf44182cd42c&page=1`
        this.API_URL_SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=ff23eac1eabd1976281daf44182cd42c&query="`
        this.API_NOW_PLAYING = `https://api.themoviedb.org/3/movie/now_playing?api_key=ff23eac1eabd1976281daf44182cd42c&language=en-US&page=1`
        this.API_TREDING_WEEK = `https://api.themoviedb.org/3/trending/movie/week?api_key=ff23eac1eabd1976281daf44182cd42c`
        this.API_TREDING_DAY = `https://api.themoviedb.org/3/trending/movie/day?api_key=ff23eac1eabd1976281daf44182cd42c`
        this.API_GENRES = 'https://api.themoviedb.org/3/genre/movie/list?api_key=ff23eac1eabd1976281daf44182cd42c&language=en-US'
        this.API_FILTER_GENRE = `https://api.themoviedb.org/3/discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10&api_key=ff23eac1eabd1976281daf44182cd42c&page=1`
        this.API_GROSSING_MOVIES = `https://api.themoviedb.org/3/discover/movie?sort_by=revenue.desc&api_key=ff23eac1eabd1976281daf44182cd42c&page=1`
        this.closs = document.querySelector(`#toggle`)
        this.header = document.querySelector(`header`)
    },

    bindEvents: function () {
        this.title.addEventListener('click', ()=> location.reload())
        this.closs.addEventListener(`click`, () =>{
            this.header.classList.toggle('active')
            this.closs.classList.toggle('active')
        })
        this.button.addEventListener('click', () => {
            this.input.classList.toggle('open')
            this.input.value = ''
            this.input.focus()
            this.search.classList.toggle('open')
        })
        this.input.addEventListener('blur', () => {
            this.input.classList.remove('open')
            this.input.value = ''
            this.search.classList.remove('open')
        })
        this.input.addEventListener('keypress', (e)=>{
            const search = e.target.value
            if(e.key === 'Enter' && e.target.value !== ''){
                this.filmes(this.API_URL_SEARCH+search)
                console.log(this.API_URL_SEARCH+search)
            }
        })
        this.trendingD.addEventListener('click', (e)=>{
            this.filmes(this.API_TREDING_DAY)
         })
        this.now_playing.addEventListener('click', (e)=>{
            this.filmes(this.API_NOW_PLAYING)
        })
        this.trending.addEventListener('click', (e)=>{
            this.filmes(this.API_TREDING_WEEK)
        })
        this.grossing.addEventListener('click', (e)=>{
            this.filmes(this.API_GROSSING_MOVIES)
        })

    },

    filmes: async function (url) {
        const res = await fetch(url)
        const data = await res.json()
        console.log(data.results)
        this.output(data)
    },

    genresList: async function (url) {
        const res = await fetch(url)
        const data = await res.json()

        data.genres.forEach(x => {
            this.genres.innerHTML += `<li value="${x.id}" class="genre_item">${x.name}</li>`
        })
    },

    output: function (data) {
        const results = data.results
        this.main.innerHTML = ''
        results.forEach(result => {
            this.main.innerHTML += `
<div class="movie">
    <img src="${this.imagePath(result.poster_path)}" alt="">
    <div class="movie-info">
        <h3>${result.title}</h3>
        <span class="rating">${result.vote_average.toFixed(1)}</span>
    </div>
    <div class="overview">
        <h3>${result.original_title}</h3>
        <span>${result.overview}</span>
    </div>

</div>
`
        })
        this.ratingColors()
    },

    ratingColors: function () {
        const rating = document.querySelectorAll('.rating')

        rating.forEach(x => {
            if (x.innerText > 7) {
                x.classList.add('green')
            } else if (x.innerText < 4) {
                x.classList.add('red')
            } else {
                x.classList.add('orange')
            }
        })
    },
    
    imagePath: function(x){
        return `https://image.tmdb.org/t/p/w1280${x}`
    },

    startTimer: function () {
        setTimeout(() => {
            const lis = document.querySelectorAll(`.genre_item`)
            lis.forEach(li => {
                li.addEventListener(`click`, () => {
                    this.filmes(`https://api.themoviedb.org/3/discover/movie?with_genres=${li.value}&sort_by=vote_average.desc&vote_count.gte=10&api_key=ff23eac1eabd1976281daf44182cd42c&page=1`)
                    console.log(li.value)
                })
            })
        }, 1000);
    }
}

main.init();
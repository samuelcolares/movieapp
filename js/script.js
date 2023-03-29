const title = document.querySelector('h1')
const button = document.querySelector('.btn')
const input = document.querySelector('.input')
const search = document.querySelector('.search')
const main = document.querySelector('main')
const now_playing = document.querySelector('.nowPlaying')
const trending = document.querySelector('.trending')
const trendingD = document.querySelector('.trendingD')
const genres = document.querySelector(`.genres`)
const grossing = document.querySelector(`.grossing`)

title.addEventListener('click', ()=> location.reload())

button.addEventListener('click', () => {
    input.classList.toggle('open')
    input.value = ''
    input.focus()
    search.classList.toggle('open')
})

input.addEventListener('blur', () => {
    input.classList.remove('open')
    input.value = ''
    search.classList.remove('open')
})


input.addEventListener('keypress', (e)=>{
    const search = e.target.value
    if(e.key === 'Enter' && e.target.value !== ''){
        filmes(API_URL_SEARCH+search)
        console.log(API_URL_SEARCH+search)
    }
})

trendingD.addEventListener('click', (e)=>{
    filmes(API_TREDING_DAY)
 })

now_playing.addEventListener('click', (e)=>{
    filmes(API_NOW_PLAYING)
})

trending.addEventListener('click', (e)=>{
    filmes(API_TREDING_WEEK)
})

grossing.addEventListener('click', (e)=>{
    filmes(API_GROSSING_MOVIES)
})

const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ff23eac1eabd1976281daf44182cd42c&page=1`
const API_URL_SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=ff23eac1eabd1976281daf44182cd42c&query="`
const API_NOW_PLAYING = `https://api.themoviedb.org/3/movie/now_playing?api_key=ff23eac1eabd1976281daf44182cd42c&language=en-US&page=1`
const API_TREDING_WEEK = `https://api.themoviedb.org/3/trending/movie/week?api_key=ff23eac1eabd1976281daf44182cd42c`
const API_TREDING_DAY = `https://api.themoviedb.org/3/trending/movie/day?api_key=ff23eac1eabd1976281daf44182cd42c`
const API_GENRES = 'https://api.themoviedb.org/3/genre/movie/list?api_key=ff23eac1eabd1976281daf44182cd42c&language=en-US'
const API_FILTER_GENRE = `https://api.themoviedb.org/3/discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10&api_key=ff23eac1eabd1976281daf44182cd42c&page=1`
const API_GROSSING_MOVIES = `https://api.themoviedb.org/3/discover/movie?sort_by=revenue.desc&api_key=ff23eac1eabd1976281daf44182cd42c&page=1`

async function genresList(url){
    const res = await fetch(url)
    const data = await res.json()

  data.genres.forEach(x => {
    genres.innerHTML += `<li value="${x.id}" class="genre_item">${x.name}</li>`
  })
}

genresList(API_GENRES)

async function filmes(url){
    const res = await fetch(url)
    const data = await res.json()
    console.log(data.results)
    output(data)
}

filmes(API_URL)

function output(data){
    const results = data.results
    main.innerHTML = ''
    results.forEach(result => {
        main.innerHTML += `
    <div class="movie">
        <img src="${imagePath(result.poster_path)}" alt="">
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
    wee()
}

function imagePath (x){
    return `https://image.tmdb.org/t/p/w1280${x}`
}
function wee(){
    const rating = document.querySelectorAll('.rating')

    rating.forEach(x => {
        if(x.innerText > 7){
            x.classList.add('green')
        } else if(x.innerText < 4){
            x.classList.add('red')
        } else{
            x.classList.add('orange')
        }
    })
}


setTimeout(() => {
    const lis = document.querySelectorAll(`.genre_item`)
    lis.forEach(li=>{
        li.addEventListener(`click`,()=>{
            filmes(`https://api.themoviedb.org/3/discover/movie?with_genres=${li.value}&sort_by=vote_average.desc&vote_count.gte=10&api_key=ff23eac1eabd1976281daf44182cd42c&page=1`)
            console.log(li.value)
        })
    })
}, 1000);



const closs = document.querySelector(`#toggle`)
const header = document.querySelector(`header`)


closs.addEventListener(`click`, () =>{
    header.classList.toggle('active')
    closs.classList.toggle('active')
})

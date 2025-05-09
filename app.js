

let mainCont = document.querySelector("main-cont")
let searcList = document.querySelector(".searc-list")
// let watchBtn = document.querySelector(".watch")
let watchName = "Avatar"


let filmTitle = document.querySelector(".filmTitle")
let img = document.querySelector(".img")
let genre = document.querySelector(".genreSpan")
let writer = document.querySelector(".writerSpan")
let year = document.querySelector(".yearSpan")
let actors = document.querySelector(".actorSpan")
let plot = document.querySelector(".plotSpan")
let languages = document.querySelector(".languageSpan")
let medal = document.querySelector(".medalSpan")

let input = document.querySelector(".textInput")


async function filmSearch(filmName) {
    let apikey = `15a669ee`
    let url = `https://www.omdbapi.com/?t=${filmName}&apikey=${apikey}`

    let api = await fetch(url)
    let response = await api.json()

    console.log(response);
    filmTitle.textContent = response.Title
    img.src = response.Poster
    genre.textContent = response.Genre
    writer.textContent = response.Writer
    year.innerHTML = `${response.Year} <span class="rated">Ratings ${response.Rated}</span>  ${response.Released}`
    actors.textContent = response.Actors
    plot.textContent = response.Plot
    languages.textContent = response.Language
    medal.textContent = response.Awards == "N/A" ? "Odül yok" : response.Awards
    searcList.innerHTML = ""
    input.value = ""
}


input.addEventListener("input", () => {
    if (input.value.trim() == "") {
        searcList.innerHTML = "Lutfen Film adini yazin"
    } else {
        searcList.innerHTML = ""
        listShow()
    }
})

async function listShow() {
    let apikey = `15a669ee`
    let url = `https://www.omdbapi.com/?t=${input.value.trim()}&apikey=${apikey}`
    let api = await fetch(url)
    let response = await api.json()
    if (response.Response == "False") {
        searcList.innerHTML += "Film Bulunmadi ve ya Filmin adini tam yazin)"
    } else {
        searcList.innerHTML = ""
        searcList.innerHTML += `
        <div class="search-item">
       <img src="${response.Poster}" alt="">
       <div class="item-info">
           <h1 class="name">${response.Title}</h1>
           <h2 class="year">${response.Year}</h2>
       </div>
        </div>
`
    }

    ShowCont()
}

function ShowCont() {
    let items = document.querySelectorAll(".searc-list .search-item")
    items.forEach(item => {
        item.addEventListener("click", () => {
            let filmName = item.querySelector(".name").textContent
            filmSearch(filmName)
            watchName = filmName
        })
    })
}

function watch() {
    watchName = watchName.toLowerCase().replace(/ /g, "-").replace(":", "")
    let url = `https://www.hdfilmcehennemi2.red/${watchName}-izle`
    window.open(url, "_blank")
}



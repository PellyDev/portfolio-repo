// API key has been restricted so it doesn't need to be obfuscated or stored in a .env file
const WATCH_BASE_URL = "https://www.youtube.com/watch?v="
const API_BASE_URL =
    "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=25&playlistId=UUi7SpBeS4FXazpYJOmxGAeg&key="
const API_KEY = "AIzaSyBOMHDByZ065Tq8OUJSL55FOQEqZz2vQZ8"

// amount of yt vids that get returnd from the api call
let length = 0

export function getVids() {
    fetch(API_BASE_URL + API_KEY)
        .then((res) => res.json())
        .then((data) => {
            generateVids(data)
            length = data.items.length
            console.log(length)
        })
}

function generateVids(json) {
    const parent = document.querySelector(".slider")
    const template = document.querySelector(".slider template")
    json.items.forEach((vid) => {
        const { title, description, publishedAt: date } = vid.snippet
        const { url: thumnbnail } = vid.snippet.thumbnails.maxres
        const { videoId } = vid.snippet.resourceId

        const el = template.content.cloneNode(true)
        el.querySelector("img").src = thumnbnail
        el.querySelector("a").href = WATCH_BASE_URL + videoId
        parent.appendChild(el)
    })
}

const leftArrow = document.querySelector(".arrow.left")
const rightArrow = document.querySelector(".arrow.right")

import { youtube } from "./consts"
// API key has been restricted so it doesn't need to be obfuscated or stored in a .env file
const WATCH_BASE_URL = "https://www.youtube.com/watch?v="
const API_BASE_URL =
    "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=25&playlistId=UUi7SpBeS4FXazpYJOmxGAeg&key="
const API_KEY = "AIzaSyBOMHDByZ065Tq8OUJSL55FOQEqZz2vQZ8"
// --stagger-duration; increase duration with each video container
const STAGGER_DURATION = 238.74
let staggerFactor = 3

// amount of yt vids that get returnd from the api call
let length = 0

export function getVids() {
    fetch(API_BASE_URL + API_KEY)
        .then((res) => res.json())
        .then((data) => {
            generateVids(data)
            length = data.items.length
        })
}

export function generateVids(json) {
    const parent = document.querySelector(".slider")
    const template = document.querySelector(".slider template")

    json.items.forEach((vid) => {
        const { title, description, publishedAt: date } = vid.snippet
        const { url: thumnbnail } = vid.snippet.thumbnails.maxres
        const { videoId } = vid.snippet.resourceId
        const dateFormatted = new Intl.DateTimeFormat("de-DE").format(
            new Date(date.substring(0, 10))
        )
        const el = template.content.cloneNode(true)
        const elRoot = el.querySelector(".video-container")
        elRoot.querySelector("img").src = thumnbnail
        elRoot.querySelector("a").href = WATCH_BASE_URL + videoId
        elRoot.querySelector(".title").innerText = title
        elRoot.querySelector(".date").innerText = "Released: " + dateFormatted
        elRoot.classList.add("inactive")
        elRoot.style.setProperty(
            "transition-delay",
            `${staggerFactor * STAGGER_DURATION}ms`
        )
        /* elRoot.style.transitionDelay = `${staggerFactor * STAGGER_DURATION}ms` */
        youtube.children.push(elRoot)
        parent.appendChild(elRoot)
        ++staggerFactor
    })
}
const slider = document.querySelector(".slider")
const leftArrow = document.querySelector(".arrow.left")
const rightArrow = document.querySelector(".arrow.right")

leftArrow.addEventListener("click", () => {
    const style = getComputedStyle(slider)
    let scrollIdx = Number(style.getPropertyValue("--scroll-index"))
    if (scrollIdx === 0) {
        scrollIdx = (length - 2) / 2
    } else {
        // ceil in case we have a .5 max scroll idx
        scrollIdx = Math.ceil(scrollIdx - 1)
    }
    slider.style.setProperty("--scroll-index", `${scrollIdx}`)
})

rightArrow.addEventListener("click", () => {
    const style = getComputedStyle(slider)
    let scrollIdx = Number(style.getPropertyValue("--scroll-index"))
    if (scrollIdx < (length - 2) / 2) {
        ++scrollIdx
        scrollIdx = scrollIdx > (length - 2) / 2 ? (length - 2) / 2 : scrollIdx
    } else {
        scrollIdx = 0
    }
    slider.style.setProperty("--scroll-index", `${scrollIdx}`)
})

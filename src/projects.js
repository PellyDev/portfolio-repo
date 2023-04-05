import { STAGGER_DURATION } from "./consts"

const infoBtn = document.querySelector("button.show-info")
const top = document.querySelector(".top")
const stackGrid = document.querySelector(".top .stack")
const descTemplate = document.querySelector(".top > template")
const animatableEl = document.querySelectorAll(".animatable")

let isInfoShown = false

const temp = descTemplate.content.cloneNode(true)
const desc = temp.querySelector(".desc")

infoBtn.addEventListener("click", () => {
    if (!isInfoShown) {
        stackGrid.addEventListener("transitionend", () => {
            animatableEl.forEach((el) => {
                el.style.setProperty("display", "none")
            })
            top.appendChild(desc)
            setTimeout(() => {
                desc.querySelector("p").classList.remove("inactive")
            }, 10)
        })
        animatableEl.forEach((el) => {
            el.classList.add("inactive")
        })
    } else {
    }
    isInfoShown = !isInfoShown
})

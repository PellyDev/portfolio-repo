import { STAGGER_DURATION } from "./consts"

const descTemplate = document.querySelector(".top > template")
const temp = descTemplate.content.cloneNode(true)
const desc = temp.querySelector(".desc")
const flushForward = document.querySelector(".top > button.flush")
const flushBack = desc.querySelector("button.flush")
const top = document.querySelector(".top")
const stackGrid = document.querySelector(".top .stack")
const animatableOne = document.querySelectorAll(".top > .animatable")
const animatableTwo = desc.querySelectorAll(".animatable")

attachFlushForwardListener()

// handle "show me more" btn
function attachFlushForwardListener() {
    flushForward.addEventListener(
        "click",
        () => {
            stackGrid.addEventListener(
                "transitionend",
                (e) => {
                    if (e.propertyName !== "opacity") return
                    attachFlushBackListener()
                    animatableOne.forEach((el) => {
                        el.style.setProperty("display", "none")
                    })
                    top.appendChild(desc)
                    setTimeout(() => {
                        const children = desc.children
                        for (let child of children) {
                            child.classList.remove("inactive")
                        }
                    }, 10)
                },
                { once: true }
            )
            animatableOne.forEach((el) => {
                el.classList.add("inactive")
            })
        },
        { once: true }
    )
}

// handle "take me back" btn
function attachFlushBackListener() {
    flushBack.addEventListener(
        "click",
        () => {
            desc.querySelector("p").addEventListener(
                "transitionend",
                (e) => {
                    if (e.propertyName !== "opacity") return
                    attachFlushForwardListener()

                    desc.remove()
                    animatableOne.forEach((el) => {
                        el.style.setProperty("display", "var(--display)")
                        setTimeout(() => {
                            el.classList.remove("inactive")
                        }, 10)
                    })
                },
                { once: true }
            )
            animatableTwo.forEach((el) => {
                el.classList.add("inactive")
            })
        },
        { once: true }
    )
}

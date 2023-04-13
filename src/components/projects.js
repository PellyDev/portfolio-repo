import { DURATION_M } from "../consts"

class Project {
    constructor(node) {
        this.node = node
        this.temp = this.node
            .querySelector(".top > template")
            .content.cloneNode(true)
        this.desc = this.temp.querySelector(".desc")
        this.flushForward = this.node.querySelector(".top > button.flush")
        this.flushBack = this.desc.querySelector("button.flush")
        this.top = this.node.querySelector(".top")
        this.stackGrid = this.node.querySelector(".top .stack")
        this.animatableOne = this.node.querySelectorAll(".top > .animatable")
        this.animatableTwo = this.desc.querySelectorAll(".animatable")
        this.mountFlushForwardListener()
    }

    // handle "show me more" btn
    mountFlushForwardListener() {
        this.flushForward.addEventListener(
            "click",
            () => {
                this.stackGrid.addEventListener(
                    "transitionend",
                    (e) => {
                        if (e.propertyName !== "opacity") return
                        this.unmountFlushBackListener()
                        this.animatableOne.forEach((el) => {
                            el.style.setProperty("display", "none")
                        })
                        this.top.appendChild(this.desc)
                        setTimeout(() => {
                            const children = this.desc.children
                            for (let child of children) {
                                child.classList.remove("inactive")
                            }
                        }, 10)
                    },
                    { once: true }
                )
                this.animatableOne.forEach((el) => {
                    el.style.setProperty(
                        "transition-duration",
                        "calc(var(--duration-l) / 2)"
                    )
                    el.classList.add("inactive")
                })
            },
            { once: true }
        )
    }

    // handle "take me back" btn
    unmountFlushBackListener() {
        this.flushBack.addEventListener(
            "click",
            () => {
                this.desc.querySelector("p").addEventListener(
                    "transitionend",
                    (e) => {
                        if (e.propertyName !== "opacity") return
                        this.mountFlushForwardListener()

                        this.desc.remove()
                        this.animatableOne.forEach((el) => {
                            el.style.setProperty("display", "var(--display)")
                            setTimeout(() => {
                                el.classList.remove("inactive")
                            }, 10)
                        })
                    },
                    { once: true }
                )
                this.animatableTwo.forEach((el) => {
                    el.style.setProperty(
                        "transition-duration",
                        "calc(var(--duration-l) / 2)"
                    )
                    el.classList.add("inactive")
                })
            },
            { once: true }
        )
    }
}

const kittify = new Project(
    document.querySelector("#projects .project-container")
)

const dict = new Project(document.querySelector("#project2 .project-container"))

const port = new Project(document.querySelector("#project3 .project-container"))

import { isOnMobile } from "./root"

/* css variables */
export const STAGGER_DURATION = 238.74
export const DURATION_L = isOnMobile ? 610 : 1250
export const DURATION_M = 386.28

/* DOM elements */
export const menuLines = document.querySelectorAll(".cluster")
export const animatedLines = document.querySelectorAll(".animate")
export const letters = document.querySelectorAll(".letter")
export const lettersInner = document.querySelectorAll(".letter-inner")
export const lettersInnerAlt = document.querySelectorAll(".letter-inner-alt")
export const navItems = document.querySelectorAll(".nav-item")
export const navItemsContainer = document.querySelector(".nav-items")
export const scrollCTA = document.querySelector(".scroll-CTA")
export const nav = document.querySelector(".nav")
export const email = document.querySelector(".email")
export const fixedEls = document.querySelectorAll(".fixed")
export const fixedElsLeft = document.querySelectorAll(".fixed.left")
export const fixedElsRight = document.querySelector(".fixed.right")
export const landing = document.querySelector("#landing")
export const landingLogo = document.querySelector("#landing svg")
export const landingTag = document.querySelector("#landing p")
export const navLogo = document.querySelector(".nav svg")

/* panels */

export const main = {
    node: document.querySelector("#main"),
    children: [],
    Ypos: 0,
    hasAnimated: true,
}
export const bio = {
    node: document.querySelector("#bio"),
    children: [
        document.querySelector("#bio .headline"),
        document.querySelector("#bio .text"),
        document.querySelector("#bio .headline img"),
        document.querySelector("#bio .bio-container img"),
    ],
    Ypos: 0,
    hasAnimated: false,
}

export const stack = {
    node: document.querySelector("#stack"),
    children: [
        document.querySelector(".tech-stack [data-index='0']"),
        document.querySelector(".tech-stack [data-index='1']"),
        document.querySelector(".tech-stack [data-index='2']"),
        document.querySelector(".tech-stack [data-index='3']"),
        document.querySelector(".tech-stack [data-index='4']"),
        document.querySelector(".tech-stack [data-index='5']"),
        document.querySelector(".tech-stack [data-index='6']"),
        document.querySelector(".tech-stack [data-index='7']"),
        document.querySelector("#stack .headline"),
    ],
    Ypos: 0,
    hasAnimated: false,
}

export const projects = {
    node: document.querySelector("#projects"),
    children: [
        document.querySelector("#projects .project-container"),
        document.querySelector("#projects .headline"),
        document.querySelector("#projects .project-container .top"),
        document.querySelector("#projects .project-container .bottom"),
        document.querySelector("#projects .top .logo-container"),
        document.querySelector("#projects .top .stack"),
        document.querySelector("#projects .top .flush"),
        document.querySelector(
            "#projects .bottom .icon-container[data-direction='left']"
        ),
        document.querySelector(
            "#projects .bottom .icon-container[data-direction='right']"
        ),
    ],
    cb: function () {
        this.children.forEach((child, idx) => {
            if (idx < 4) {
                child.classList.remove("inactive")
            } else {
                setTimeout(() => {
                    child.style.setProperty("display", "var(--display)")
                    setTimeout(() => {
                        child.classList.remove("inactive")
                    }, 10)
                }, DURATION_L * 1.99)
            }
        })
    },
    Ypos: 0,
    hasAnimated: false,
}

export const project2 = {
    node: document.querySelector("#project2"),
    children: [
        document.querySelector("#project2 .project-container"),
        document.querySelector("#project2 .headline"),
        document.querySelector("#project2 .project-container .top"),
        document.querySelector("#project2 .project-container .bottom"),
        document.querySelector("#project2 .top .logo-container"),
        document.querySelector("#project2 .top .stack"),
        document.querySelector("#project2 .top .flush"),
        document.querySelector(
            "#project2 .bottom .icon-container[data-direction='left']"
        ),
        document.querySelector(
            "#project2 .bottom .icon-container[data-direction='right']"
        ),
    ],
    cb: function () {
        this.children.forEach((child, idx) => {
            if (idx < 4) {
                child.classList.remove("inactive")
            } else {
                setTimeout(() => {
                    child.style.setProperty("display", "var(--display)")
                    setTimeout(() => {
                        child.classList.remove("inactive")
                    }, 10)
                }, DURATION_L * 1.99)
            }
        })
    },
    Ypos: 0,
    hasAnimated: false,
}

export const project3 = {
    node: document.querySelector("#project3"),
    children: [
        document.querySelector("#project3 .project-container"),
        document.querySelector("#project3 .headline"),
        document.querySelector("#project3 .project-container .top"),
        document.querySelector("#project3 .project-container .bottom"),
        document.querySelector("#project3 .top .logo-container"),
        document.querySelector("#project3 .top .stack"),
        document.querySelector("#project3 .top .flush"),
        document.querySelector(
            "#project3 .bottom .icon-container[data-direction='left']"
        ),
    ],
    cb: function () {
        this.children.forEach((child, idx) => {
            if (idx < 4) {
                child.classList.remove("inactive")
            } else {
                setTimeout(() => {
                    child.style.setProperty("display", "var(--display)")
                    setTimeout(() => {
                        child.classList.remove("inactive")
                    }, 10)
                }, DURATION_L * 1.99)
            }
        })
    },
    Ypos: 0,
    hasAnimated: false,
}

export const youtube = {
    node: document.querySelector("#youtube"),
    children: [
        document.querySelector("#youtube .headline"),
        document.querySelector("#youtube .text"),
        document.querySelector("#youtube .yt-container.desktop"),
    ],
    Ypos: 0,
    hasAnimated: false,
}

export const panels = [main, bio, stack, projects, project2, project3, youtube]

export const pageNav = {
    node: document.querySelector(".fixed.page-nav"),
    children: [],
    svg: `<svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <rect
        width="16"
        height="16"
        rx="4"
        transform="matrix(1 0 0 -1 1 17)"
        stroke-width="2"
    />
</svg>`,
}

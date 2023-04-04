export const STAGGER_DURATION = 238.74

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
    children: [document.querySelector("#projects .headline")],
    Ypos: 0,
    hasAnimated: false,
}
export const youtube = {
    node: document.querySelector("#youtube"),
    children: [
        document.querySelector("#youtube .headline"),
        document.querySelector("#youtube .text"),
        document.querySelector("#youtube .yt-container"),
    ],
    Ypos: 0,
    hasAnimated: false,
}

export const panels = [main, bio, stack, projects, youtube]

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

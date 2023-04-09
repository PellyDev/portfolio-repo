import {
    menuLines,
    animatedLines,
    fixedEls,
    fixedElsLeft,
    fixedElsRight,
    landing,
    letters,
    lettersInner,
    lettersInnerAlt,
    landingLogo,
    navLogo,
    nav,
    navItems,
    navItemsContainer,
    scrollCTA,
    panels,
    youtube,
    projects,
    bio,
    main,
    pageNav,
} from "./consts"
import { isOnMobile } from "./root"

// IIFE that immediately returns if not on mobile
;(function () {
    if (!isOnMobile) return

    // ---------- MAIN FUNCTION ----------

    // get the top edge pos of every panel independent of current scroll position
    function getPanelPos(panels) {
        panels.forEach((panel) => {
            if (panel === panels[0]) {
                return
            } else {
                panel.Ypos = panel.node.getClientRects()[0]["top"] + scrollY
            }
        })
    }

    // cb is called upon raching the specified Y scroll position
    function checkScrollState(targetYpos, cb) {
        if (Math.floor(scrollY) === Math.floor(targetYpos)) {
            cb()
        } else {
            requestAnimationFrame(() => checkScrollState(targetYpos, cb))
        }
    }

    // cb is called upon reaching animation state (reads out style value of any given dom node)
    function checkStyleState(DOMnode, styleProp, targetValue, cb) {
        const computedStyle = getComputedStyle(DOMnode)
        if (computedStyle[styleProp] >= targetValue) {
            cb()
        } else {
            requestAnimationFrame(() =>
                checkStyleState(DOMnode, styleProp, targetValue, cb)
            )
        }
    }

    // Removes "inactive" class from all elements in <panel>.children UNLESS <panel>.cb exists, which will be called instead
    function animateIntoView(scrollingP) {
        if (panels[scrollingP].hasAnimated) return
        // start animation once panel has been moved into view
        const panel = panels[scrollingP]
        if (panel.cb) {
            panel.cb()
        } else {
            panel.children.forEach((child) => {
                child.classList.remove("inactive")
            })
        }
        panel.hasAnimated = true
    }

    const VH = window.innerHeight
    let debounce = false
    let prevY = 0

    function scrollHandler() {
        if (debounce) return
        debounce = true
        // hide nav on scroll down, show on scroll up
        const curY = scrollY
        if (curY > prevY) {
            nav.style.opacity = "0"
            nav.style.pointerEvents = "none"
        } else {
            nav.style.opacity = "1"
            nav.style.pointerEvents = "all"
        }
        prevY = curY

        // show each panel when it reached 1/2 of the viewport height
        panels.forEach((panel, idx) => {
            if (scrollY > panel.Ypos - VH * 0.5 && !panel.hasAnimated) {
                animateIntoView(idx)
            }
        })
        // debounce scroll event
        setTimeout(() => {
            debounce = false
        }, 50)
    }

    function mountListeners() {
        window.addEventListener("scroll", scrollHandler)

        window.addEventListener("beforeunload", () => {
            window.removeEventListener("scroll", scrollHandler)
        })
    }

    // initial setup
    window.scrollTo(0, 0)
    getPanelPos(panels)
    checkScrollState(0, () => {
        document.querySelector(".j-left").classList.add("animate")
        document.querySelector(".j-right").classList.add("animate")
        // animation of main page after animation of landing page has finished
        checkStyleState(
            document.querySelector(".j-left"),
            "fill-opacity",
            "1",
            () => {
                setTimeout(() => {
                    // "pull up curtain" and start animating main page content
                    landing.style.setProperty("height", "0%")
                    landingLogo.style.setProperty("opacity", "0%")
                    setTimeout(() => {
                        // stagger the menu lines
                        let lineCounter = 0
                        const intervalId = setInterval(() => {
                            if (lineCounter < 4) {
                                menuLines[lineCounter].style.setProperty(
                                    "translate",
                                    "0 0"
                                )
                                menuLines[lineCounter].style.setProperty(
                                    "opacity",
                                    "100%"
                                )
                                lineCounter++
                            } else {
                                clearInterval(intervalId)
                                // start aditional round of animations once the last line has finished animating
                                checkStyleState(
                                    menuLines[menuLines.length - 1],
                                    "opacity",
                                    "1",
                                    () => {
                                        fixedElsLeft.forEach((el) => {
                                            el.style.setProperty("opacity", "1")
                                            el.style.setProperty(
                                                "translate",
                                                "0 0"
                                            )
                                        })
                                        pageNav.node.style.setProperty(
                                            "opacity",
                                            "1"
                                        )
                                        fixedElsRight.style.setProperty(
                                            "opacity",
                                            "1"
                                        )
                                        fixedElsRight.style.setProperty(
                                            "translate",
                                            "0 0"
                                        )
                                        navItemsContainer.style.setProperty(
                                            "opacity",
                                            "1"
                                        )
                                        navItemsContainer.style.setProperty(
                                            "translate",
                                            "0 0"
                                        )
                                        navLogo.style.setProperty(
                                            "opacity",
                                            "1"
                                        )
                                        navLogo.style.setProperty(
                                            "translate",
                                            "0 0"
                                        )
                                        landing.remove()
                                        // reset animations - MOBILE ONLY
                                        panels.forEach((panel) => {
                                            panel.hasAnimated = false
                                            panel.children.forEach((child) => {
                                                child.classList.add("inactive")
                                            })
                                        })
                                        // enable scrolling and display scroll CTA
                                        setTimeout(() => {
                                            scrollCTA.style.setProperty(
                                                "opacity",
                                                "1"
                                            )
                                            scrollCTA.style.setProperty(
                                                "scale",
                                                "1"
                                            )
                                            // remove invisible overlay that prevents hover effects during intro animation
                                            document
                                                .querySelector(".overlay")
                                                .remove()
                                            // enable scrolling - MOBILE ONLY
                                            document.body.style.setProperty(
                                                "overflow",
                                                "auto"
                                            )
                                            document.body.style.setProperty(
                                                "overflow-x",
                                                "hidden"
                                            )
                                            nav.style.setProperty(
                                                "transition",
                                                "opacity var(--duration-m) ease-in-out"
                                            )
                                            // mount scroll event listener
                                            mountListeners()
                                        }, 1250)
                                    }
                                )
                            }
                        }, 238.74)
                    }, 772.55)
                }, 625)
            }
        )
    })

    console.log(panels.forEach((panel) => console.log(panel.Ypos)))
})()

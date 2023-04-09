import { isOnMobile } from "./root"
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

// IIFE that immediately returns if on mobile
;(function () {
    if (isOnMobile) return

    // ---------- MAIN FUNCTION ----------
    let isScrolling = false,
        scrollingPos = 0

    function getRand(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
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

    // cb is called upon raching the specified Y scroll position
    function checkScrollState(targetYpos, cb) {
        if (Math.floor(scrollY) === Math.floor(targetYpos)) {
            cb()
        } else {
            requestAnimationFrame(() => checkScrollState(targetYpos, cb))
        }
    }

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

    // applies blur class to elements and removes it once target Y has been reached
    function toggleBlur(targetYpos, ...elements) {
        // check if any of the arguments are a node list and flatten them
        elements.forEach((el, idx) => {
            if (NodeList.prototype.isPrototypeOf(el)) {
                el.forEach((node) => elements.push(node))
                elements.splice(idx, 1)
            }
        })
        elements.forEach((el) => {
            el.classList.add("blur")
        })
        checkScrollState(targetYpos, () => {
            elements.forEach((el) => {
                el.classList.remove("blur")
            })
        })
    }

    // Removes "inactive" class from all elements in <panel>.children UNLESS <panel>.cb exists, which will be called instead
    function animateIntoView(scrollingP) {
        if (panels[scrollingP].hasAnimated) return
        // start animation once panel has been moved into view
        checkScrollState(panels[scrollingP].Ypos, () => {
            const panel = panels[scrollingP]
            if (panel.cb) {
                panel.cb()
            } else {
                panel.children.forEach((child) => {
                    child.classList.remove("inactive")
                })
            }
            panel.hasAnimated = true
        })
    }

    function updatePageNav(scrollingP) {
        pageNav.children.forEach((child, idx) => {
            if (idx === scrollingP) {
                child.classList = "active"
            } else {
                child.classList = ""
            }
        })
    }

    function mountListeners() {
        // disable mousewheel and call custom scroll functions instead
        window.addEventListener(
            "wheel",
            (e) => {
                if (e.ctrlKey) return // allow zooming with mouse wheel
                e.preventDefault()
                if (isScrolling) return
                if (e.deltaY > 30) {
                    scrollDown()
                }
                if (e.deltaY < -30) {
                    scrollUp()
                }
            },
            { passive: false, capture: true }
        )

        // disable up/down arrow keys and call custom scroll functions instead
        window.addEventListener("keydown", (e) => {
            if (e.key === "ArrowUp") {
                e.preventDefault()
                if (isScrolling) return
                isScrolling = true
                scrollUp()
            } else if (e.key === "ArrowDown") {
                e.preventDefault()
                if (isScrolling) return
                isScrolling = true
                scrollDown()
            }
        })

        // disable scrolling by touchmove and call custom scroll functions instead

        let ts // touch start position
        let target // target event from touchstart so pointer/click events can fire
        window.addEventListener(
            "touchstart",
            (e) => {
                e.preventDefault()
                if (isScrolling) return
                ts = e.touches[0]["screenY"]
                target = e.touches[0].target
            },
            { passive: false }
        )

        window.addEventListener(
            "touchend",
            (e) => {
                if (isScrolling) return
                const te = e.changedTouches[0]["screenY"]
                if (ts - te > 20) {
                    // add an offset of 20 to make the touchmove scrolling less sensitive
                    isScrolling = true
                    scrollDown()
                } else if (ts - te < -20) {
                    isScrolling = true
                    scrollUp()
                } else if (target instanceof HTMLElement) {
                    // check if HTMLElement is in the prototype chain of target, because only HTMLElements have a click() method
                    target.click()
                }
            },
            { passive: false }
        )
    }

    // custom scroll functions -> scroll up/down to the next panel Y position
    function scrollUp() {
        isScrolling = true
        if (scrollingPos === 0) {
            isScrolling = false
            return
        }
        scrollingPos = scrollingPos - 1
        window.scrollTo(0, panels[scrollingPos].Ypos)
        toggleBlur(panels[scrollingPos].Ypos, nav, fixedElsLeft, fixedElsRight)
        animateIntoView(scrollingPos)
        updatePageNav(scrollingPos)
        checkScrollState(panels[scrollingPos].Ypos, () => {
            isScrolling = false
        })
    }

    // scrollTo argument is passed if a permalink is clicked
    function scrollDown(scrollTo = null) {
        isScrolling = true
        if (scrollTo !== null) {
            if (scrollY !== panels[scrollTo].Ypos) {
                scrollingPos = scrollTo
                window.scrollTo(0, panels[scrollingPos].Ypos)
                toggleBlur(
                    panels[scrollingPos].Ypos,
                    nav,
                    fixedElsLeft,
                    fixedElsRight
                )
                animateIntoView(scrollingPos)
                updatePageNav(scrollingPos)
                checkScrollState(panels[scrollingPos].Ypos, () => {})
            }
            isScrolling = false
            return
        }
        if (scrollingPos === panels.length - 1) {
            scrollingPos = 0
            window.scrollTo(0, panels[scrollingPos].Ypos)
        } else {
            scrollingPos += 1
            window.scrollTo(0, panels[scrollingPos].Ypos)
        }
        toggleBlur(panels[scrollingPos].Ypos, nav, fixedElsLeft, fixedElsRight)
        animateIntoView(scrollingPos)
        updatePageNav(scrollingPos)
        checkScrollState(panels[scrollingPos].Ypos, () => {
            isScrolling = false
        })
    }

    // react style / data-driven rendering of page navigation at the bottom of each panel
    // renders a square for each panel (section) in the panels array
    panels.forEach((panel, idx) => {
        const template = document.createElement("template")
        template.innerHTML = pageNav.svg.trim()
        pageNav.children.push(template.content.firstChild)
        pageNav.node.append(pageNav.children[idx])
        if (idx === 0) pageNav.children[0].classList = "active"
    })

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
                                        // display scroll CTA
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

    // get new panel pos on window resize
    let timeoutId
    window.addEventListener("resize", () => {
        if (timeoutId) clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            getPanelPos(panels)
            // scroll the current panel back into view
            scrollDown(scrollingPos)
        }, 50)
    })

    // apply classes and change styles based on hover state of main menu
    animatedLines.forEach((line) => {
        line.addEventListener("mouseenter", () => {
            // change classes on hover to speed up animation time
            letters.forEach((letter) => {
                letter.className = "letter letter-enter"
            })
            if (!isScrolling) {
                // nav items left
                navItems.forEach((item) => {
                    item.style.setProperty("color", "var(--border-100)")
                    item.style.setProperty("stroke", "var(--border-100)")
                    item.style.setProperty("filter", "blur(0.5rem)")
                })
                // overlay elements on the bottom
                fixedEls.forEach((el) => {
                    el.style.setProperty("filter", "blur(0.5rem)")
                    el.style.setProperty("fill", "var(--border-100)")
                })
                // nav logo right
                navLogo.style.setProperty("filter", "blur(0.5rem)")
                navLogo.style.setProperty("fill", "var(--border-100)")
            }

            // randomize "levitating" animation durations
            lettersInner.forEach((letter) => {
                letter.style.setProperty(
                    "animation-duration",
                    getRand(5000, 10001) + "ms"
                )
            })
            // randomize "levitating" animation durations
            lettersInnerAlt.forEach((letter) => {
                letter.style.setProperty(
                    "animation-duration",
                    getRand(5000, 10001) + "ms"
                )
            })
            scrollCTA.style.setProperty("color", "var(--border-100)")
            scrollCTA.style.setProperty("filter", "blur(0.5rem)")
        })
        // change classes on mouse leave to slow down animation time
        line.addEventListener("mouseleave", () => {
            letters.forEach((letter) => {
                letter.className = "letter letter-leave"
            })
            navItems.forEach((item) => {
                item.style.removeProperty("color")
                item.style.removeProperty("filter")
            })

            fixedEls.forEach((el) => {
                el.style.removeProperty("filter")
                el.style.setProperty("color", "var(--main-clr-1k)")
            })
            navLogo.style.removeProperty("filter")
            navLogo.style.removeProperty("fill")

            scrollCTA.style.setProperty("color", "var(--main-clr-1k)")
            scrollCTA.style.setProperty("color", "var(--main-clr-1k)")
            scrollCTA.style.removeProperty("filter")
        })
    })

    // set initial class so the hover effect occurs when user hovers his mouse over the line immediately after the intro animation finished
    letters.forEach((letter) => {
        letter.className = "letter letter-enter"
    })

    // call custom scroll function when permalinks are clicked
    document.getElementById("nav-bio-link").addEventListener("click", (e) => {
        e.preventDefault()
        scrollDown(panels.indexOf(bio))
    })

    document
        .getElementById("nav-projects-link")
        .addEventListener("click", (e) => {
            e.preventDefault()
            scrollDown(panels.indexOf(projects))
        })

    document
        .getElementById("nav-youtube-link")
        .addEventListener("click", (e) => {
            e.preventDefault()
            scrollDown(panels.indexOf(youtube))
        })

    document.getElementById("projects-link").addEventListener("click", (e) => {
        e.preventDefault()
        scrollDown(panels.indexOf(projects))
    })

    document.getElementById("youtube-link").addEventListener("click", (e) => {
        e.preventDefault()
        scrollDown(panels.indexOf(youtube))
    })

    navLogo.addEventListener("click", (e) => {
        e.preventDefault()
        scrollDown(panels.indexOf(main))
    })
})()

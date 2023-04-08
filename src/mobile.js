import { isOnMobile } from "./root"

// IIFE that immediately returns if not on mobile
;(function () {
    if (!isOnMobile) return

    // ---------- MAIN FUNCTION ----------
    document.body.style.backgroundColor = "red"
})()

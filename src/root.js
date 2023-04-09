import { UAParser } from "ua-parser-js"

// execute different js depending on whether the user is on mobile or not
function getUA() {
    const ua = new UAParser(navigator.userAgent)
    /* getDevice() returns an object with property type that is undefined if user
     is on desktop or laptop and a string in all other cases */
    const { type } = ua.getDevice()
    return !!type
}

export const isOnMobile = getUA()

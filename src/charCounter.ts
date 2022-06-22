// noinspection InfiniteLoopJS
// 文字数カウンター

import {$id, $query, sleep} from "./utils";
import {observePage} from "./observer";


async function showCharCount() {
    if (!($id("editor") && scrapbox.Page.lines)) {
        await sleep(3000)
        await showCharCount()
    }

    const counterWrapper = document.createElement('div')
    $query(".status-bar").appendChild(counterWrapper)

    const updateCounter = () => {
        if (scrapbox.Layout === "page") {
            counterWrapper.style.visibility = "visible"
            let linesText = $query(".lines").innerText.trim()
            const charCount = linesText.split(/s+/).join("").length
            counterWrapper.innerHTML = `<div>${charCount} char(s)</div>`
        } else {
            counterWrapper.style.visibility = "hidden"
        }
    }

    observePage(updateCounter)

    while (true) {
        updateCounter()
        await sleep(3000)
    }
}

showCharCount().catch(console.log)

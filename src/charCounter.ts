// noinspection InfiniteLoopJS
// 文字数カウンター

import {$id, $query, sleep} from "./utils";


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
            const charCount = linesText.split(/s+/).join("").replaceAll("\n", "").length
            counterWrapper.innerHTML = `<div>${charCount} char(s)</div>`
        } else {
            counterWrapper.style.visibility = "hidden"
        }
    }

    const target = document.getElementsByClassName("page-wrapper")[0]
    const observer = new MutationObserver((recs) => {
        // @ts-ignore
        if (!recs[0].target.classList.contains("enter")) {
            updateCounter()
        }
    });
    observer.observe(target, {attributes: true, attributeFilter: ["class"]})

    while (true) {
        updateCounter()
        await sleep(3000)
    }
}

showCharCount().catch(console.log)

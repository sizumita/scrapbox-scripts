import {$id, $query} from "./utils";
import {insertText} from "./dom";
import {observePage} from "./observer";


function scrollToElement(element: Element) {
    const {top, bottom} = element.getBoundingClientRect()
    if (top >= 0 && bottom <= window.innerHeight) return

    if (top < 0) {
        window.scrollBy(0, top)
        return;
    }

    if (bottom > window.innerHeight)
        window.scrollBy(0, bottom - window.innerHeight)
}

function getLineBreakNum(line: Element) {
    const lineHeight = parseInt(getComputedStyle(line).lineHeight)
    const breakNum = Math.floor(line.getBoundingClientRect().height / lineHeight)
    return breakNum < 1 ? 1 : breakNum
}

async function archive() {
    if (document.domain !== "scrapbox.io") return
    if (!scrapbox || scrapbox.Layout !== "page") return
    if (!scrapbox.Project.name.startsWith("sizumita")) return
    const element = $id(`L${scrapbox.Page.lines[0].id}`)!.getElementsByClassName("text")[0]
    scrollToElement(element)
    const {left, top, height} = element.getBoundingClientRect()
    const breakNum = getLineBreakNum(element)

    const mouseOptions = {
        button: 0,
        clientX: left,
        clientY: top + height - height / (2 * breakNum),
        bubbles: true,
        cancelable: true,
        shiftKey: false,
        ctrlKey: false,
        altKey: false,
        view: window
    };

    element.dispatchEvent(new MouseEvent("mousedown", mouseOptions))
    element.dispatchEvent(new MouseEvent("mouseup", mouseOptions))

    await insertText("🗃 ️")
}

if (scrapbox.Project.name.startsWith("sizumita") && !scrapbox.Page.title?.startsWith("🗃")) {
    scrapbox.PageMenu.addMenu({
        title: "archive",
        image: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/325/file-cabinet_1f5c4-fe0f.png",
        onClick: archive
    })
}

function showArchivedButton() {
    if (scrapbox.Layout !== "list") return
    if (!scrapbox.Project.name.startsWith("sizumita")) {
        $id("switch-archive-button")?.remove()
        return;
    }
    const element = $query(".page-sort-menu")
    if ($id("switch-archive-button") !== null) return;

    const archiveSwitch = document.createElement('button')
    archiveSwitch.innerText = "show archived"
    archiveSwitch.id = "switch-archive-button"
    archiveSwitch.classList.add("switch-archive-button")
    archiveSwitch.onclick = () => {
        Array.prototype.forEach.call(
            document.getElementsByClassName("page-list-item"),
            function (element: HTMLElement) {
                if (element.getAttribute("data-page-title")!.startsWith("🗃")) {
                    if (archiveSwitch.innerText === "show archived") {
                        element.classList.add("show-archived")
                    } else {
                        element.classList.remove("show-archived")
                    }
                }
            }
        )
        if (archiveSwitch.innerText === "show archived")
            archiveSwitch.innerText = "hidden archived"
        else
            archiveSwitch.innerText = "show archived"
    }

    element.parentElement!.appendChild(archiveSwitch)
}

observePage(showArchivedButton)

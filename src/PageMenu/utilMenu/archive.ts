/// 一旦無しにする
import {$id, $query, cursorToTitle} from "../../utils";
import {insertText} from "../../dom";


async function archive() {
    if (document.domain !== "scrapbox.io") return
    if (!scrapbox || scrapbox.Layout !== "page") return
    if (!scrapbox.Project.name.startsWith("sizumita")) return
    cursorToTitle("left")

    await insertText("🗃 ")
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


export default function () {
    showArchivedButton()
    if (scrapbox.Project.name.startsWith("sizumita") && !(scrapbox.Page.title?.startsWith("🗃") || scrapbox.Page.title?.startsWith("🚀"))) {
        scrapbox.PageMenu("utils").addSeparator()
        scrapbox.PageMenu("utils").addItem({
            title: "archive",
            image: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/325/file-cabinet_1f5c4-fe0f.png",
            onClick: archive
        })
    }
}

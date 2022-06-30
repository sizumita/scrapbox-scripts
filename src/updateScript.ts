import {observePage} from "./observer";
import {cursorToTitle} from "./utils";

function getClipBoardText(e: ClipboardEvent){
    e.preventDefault();

    const clipboardData = e.clipboardData;

    if(clipboardData != null){

        const text = clipboardData.getData("text/plain");
        console.log(text);
        cursorToTitle("left")
    }
}

export default function () {
    observePage(() => {
        if (scrapbox.Project.name !== "sizumita-public") return
        if (scrapbox.Page.title !== "scripts") return
        document.addEventListener("paste", getClipBoardText)
    })
}

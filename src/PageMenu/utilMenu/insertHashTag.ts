import {cursorToTitle} from "../../utils";
import {insertText} from "../../dom";


async function insertHashTag(tag: string) {
    // タイトルの右側に移動させる
    if (!scrapbox || scrapbox.Layout !== "page") return
    if (!scrapbox.Project.name.startsWith("sizumita")) return
    cursorToTitle("right")

    await insertText(`\n#${tag}`)
}


export default function (title: string, image: string, tag: string) {
    scrapbox.PageMenu("utils").addItem({
        title,
        image,
        onClick: () => insertHashTag(tag)
    })
}

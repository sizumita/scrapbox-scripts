import insertHashTag from "./insertHashTag";
import archive from "./archive";

export default function () {
    if (!scrapbox.Project.name.startsWith("sizumita")) return
    scrapbox.PageMenu.addMenu({
        title: "utils",
        image: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/magic-wand_1fa84.png",
    })

    insertHashTag("ProjectRevive", "", "ProjectRevive")
    insertHashTag("起業", "", "起業")
    archive()
}

import exportPage from "./exportPage";
import insertIcon from "./insertIcon";
import utilMenu from "./utilMenu";

let initialized = false

export function InitializePageMenu() {
    if (!initialized) setPageMenus(null, scrapbox.Project.name)
    initialized = true
}


function setPageMenus(beforeProject: string | null, afterProject: string) {
    // scrapbox.PageMenu().reset()
    // scrapbox.PageMenu().emitChange()
    // console.log("reset PageMenu")

    exportPage()
    insertIcon(beforeProject, afterProject)
    utilMenu()
}

// https://scrapbox.io/tkgshn-extension/ページ転送

/**
 * ページのリンクがおかしくなる問題を修正する
 * @param body
 */
function formatLinks(body: string) {
    const currentProjectName = scrapbox.Project.name
    return body.replace(/\[([^\/\[\]]+)\]/g, `[/${currentProjectName}/$1]`)
}

function exportPage(projectName: string) {
    if (document.domain !== "scrapbox.io") return
    if (!scrapbox || scrapbox.Layout !== "page") return
    if (scrapbox.Project.name === "sizumita") projectName = "sizumita-public"

    const currentProjectName = scrapbox.Project.name
    const pageName = encodeURIComponent(scrapbox.Page.title)

    const body = encodeURIComponent(scrapbox.Page.lines.slice(1).map(l => formatLinks(l.text)).join('\n'))
    const newLine = "%0A"
    let url = `https://scrapbox.io/${projectName}/🚀${pageName}?body=${body}`
    if (projectName !== "sizumita-public")
        url += `${newLine}${newLine}from: [/${currentProjectName}/${pageName}]`
    window.open(url)
}

scrapbox.PageMenu.addMenu({
    title: "export",
    image: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/325/rocket_1f680.png",
    onClick: () => exportPage("sizumita")
})

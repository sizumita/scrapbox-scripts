export const $id = (idx: string) => document.getElementById(idx)

export const $query = (classes: string): HTMLElement => document.querySelector(classes)!

export const sleep = (milliseconds: number) => new Promise(resolve => setTimeout(resolve, milliseconds));

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

export function cursorToTitle(side: "left" | "right") {
    const element = $id(`L${scrapbox.Page.lines![0].id}`)!.getElementsByClassName("text")[0]
    scrollToElement(element)
    const {right, left, top, height} = element.getBoundingClientRect()
    const breakNum = getLineBreakNum(element)

    const mouseOptions = {
        button: 0,
        clientX: side === "left" ? left : right,
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
}

export function pageExists(name: string, prj?: string) {
    if(scrapbox && scrapbox.Project.name === (prj ?? scrapbox.Project.name)) {
        return scrapbox.Project.pages
            .find(page => page.title === name && page.exists) !== undefined;
    }
    return fetch(`/api/pages/${prj}/${name}/text`)
        .then(res => res.ok)
}

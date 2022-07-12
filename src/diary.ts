// noinspection InfiniteLoopJS

import {pageExists, sleep} from "./utils";
import {observePage, observeTextChange} from "./observer";

function setTodayDiaryClass(today: string) {
    Array.prototype.forEach.call(
        document.getElementsByClassName("page-list-item"),
        function (element: HTMLElement) {
            if (element.getAttribute("data-page-title") === today) {
                element.classList.add("today-diary")
            }
        }
    )
}

function setYearToLink() {
    if (scrapbox.Layout !== "page") return

    Array.prototype.forEach.call(
        document.getElementsByClassName("page-link"),
        function (element: HTMLLinkElement) {
            if (!element.href) return;
            if (element.href.startsWith("https://scrapbox.io/sizumita/%E6%97%A5%E8%A8%98-")) {
                const m = element.href.match(/https:\/\/scrapbox.io\/sizumita\/%E6%97%A5%E8%A8%98-(?<year>[0-9]{4})-[0-9]{2}-[0-9]{2}/)
                if (m === null) return
                const year = m.groups!.year as string

                const now = new Date()
                if (now.getFullYear().toString() !== year)
                    element.setAttribute("data-is-not-this-year", year)
            }
            const m = element.href.match(/https:\/\/scrapbox.io\/sizumita\/((?<year>[0-9]{4})%2F)?(?<month>[0-9]{1,2})%2F(?<day>[0-9]{1,2})/)
            if (m !== null) {
                element.setAttribute("href", `https://scrapbox.io/sizumita/%E6%97%A5%E8%A8%98-${m.groups!.year ?? (new Date()).getFullYear()}-${m.groups!.month}-${m.groups!.day}`)
                element.classList.remove("empty-page-link")
            }
        }
    )
}

async function setYearToLinkLoop() {
    setYearToLink()
    observeTextChange(setYearToLink)

    while (true) {
        setYearToLink()
        await sleep(2000)
    }
}

export default async function () {
    setYearToLinkLoop().catch(console.log)
    if (!scrapbox || scrapbox.Project.name !== "sizumita") return

    const date = new Date()
    const toYYYYMMDD = (d: Date) => `日記-${d.toLocaleDateString("ja-JP").split("/").map(x => x.padStart(2, "0")).join("-")}`
    const today = toYYYYMMDD(date)
    observePage(() => {
        setTodayDiaryClass(today)
    })
    if (scrapbox.Page.title === today) return
    if (pageExists(today)) return

    const yesterday = toYYYYMMDD(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1))
    const tomorrow = toYYYYMMDD(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1))
    const lastWeek = toYYYYMMDD(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 6))
    const nextWeek = toYYYYMMDD(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 8))
    const lastYear = toYYYYMMDD(new Date(date.getFullYear() + 1, date.getMonth(), date.getDate()))
    const nextYear = toYYYYMMDD(new Date(date.getFullYear() + 1, date.getMonth(), date.getDate()))
    const template = await (
        await fetch(`${location.origin}/api/code/sizumita/日記/template.txt`)
    ).text()
    const body = encodeURIComponent(
        template
            .replaceAll("{previousDay}", yesterday)
            .replaceAll("{nextDay}", tomorrow)
            .replaceAll("{lastWeek}", lastWeek)
            .replaceAll("{nextWeek}", nextWeek)
            .replaceAll("{lastYear}", lastYear)
            .replaceAll("{nextYear}", nextYear)
    )

    window.open(`${location.origin}/sizumita/${encodeURIComponent(today)}?body=${body}`)
}

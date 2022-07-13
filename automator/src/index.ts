import puppeteer from "puppeteer"

const template = `
#日記
昨年: [{lastYear}]
先週: [{lastWeek}]
前: [{previousDay}]
次: [{nextDay}]
翌週: [{nextWeek}]
来年: [{nextYear}]
`

async function openPage(title: string, content: string) {
    const browser = await puppeteer.launch()

    const page = await browser.newPage();

    await page.setCookie({ name: 'connect.sid', value: process.env.CONNECT_SID as string, domain: 'scrapbox.io' });

    await page.goto(`https://scrapbox.io/sizumita/${encodeURIComponent(title)}?body=${encodeURIComponent(content)}`);
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
    return { browser, page }
}

async function createDiary() {
    const date = new Date()
    const toYYYYMMDD = (d: Date) => `日記-${d.toLocaleDateString("ja-JP").split("/").map(x => x.padStart(2, "0")).join("-")}`
    const today = toYYYYMMDD(date)

    const yesterday = toYYYYMMDD(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1))
    const tomorrow = toYYYYMMDD(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1))
    const lastWeek = toYYYYMMDD(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 6))
    const nextWeek = toYYYYMMDD(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 8))
    const lastYear = toYYYYMMDD(new Date(date.getFullYear() + 1, date.getMonth(), date.getDate()))
    const nextYear = toYYYYMMDD(new Date(date.getFullYear() + 1, date.getMonth(), date.getDate()))
    const body =
        template
            .replaceAll("{previousDay}", yesterday)
            .replaceAll("{nextDay}", tomorrow)
            .replaceAll("{lastWeek}", lastWeek)
            .replaceAll("{nextWeek}", nextWeek)
            .replaceAll("{lastYear}", lastYear)
            .replaceAll("{nextYear}", nextYear)
    await openPage(today, body)
}

createDiary().catch(console.log).finally(() => {
    process.exit(0)
})

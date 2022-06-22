import {insertText} from "./dom";

scrapbox.PageMenu.addMenu({
    title: "Insert Icon",
    image: "https://imagedelivery.net/33e-EDK3_v3lBwvkfKFHLg/769ea02d-73a4-49b3-7f7e-15540564a200/public",
    onClick: async () => {
        await insertText("[sizumita.icon]")
    }
})

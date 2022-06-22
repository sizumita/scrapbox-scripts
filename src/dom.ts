import {$id, sleep} from "./utils";

export const ScrapboxDOM = {
    textInput: $id("text-input"),
}

export async function insertText(text: string, elem?: HTMLTextAreaElement | HTMLInputElement, wait?: number) {
    const cursor = elem ?? ScrapboxDOM.textInput as HTMLTextAreaElement | HTMLInputElement
    cursor.focus()
    console.log(text)
    cursor.value = text

    const uiEvent = new Event("input", {bubbles: true, cancelable: false})
    cursor.dispatchEvent(uiEvent)
    await sleep(wait ?? 1)
}

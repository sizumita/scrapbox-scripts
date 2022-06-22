import {$id, sleep} from "./utils";

export const ScrapboxDOM = {
    editor: $id("editor"),
    lines: $id("lines")?.[0],
    textInput: $id("text-input"),
}

export async function insertText(text: string, wait?: number) {
    const cursor = ScrapboxDOM.textInput as HTMLTextAreaElement
    cursor.focus()
    console.log(text)
    cursor.value = text

    const uiEvent = new Event("input", {bubbles: true, cancelable: false})
    cursor.dispatchEvent(uiEvent)
    await sleep(wait ?? 1)
}

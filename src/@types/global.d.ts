
import * as React from "react";
import {PartialLayout} from "./layout";

export {}

declare global {
    const scrapbox: Scrapbox
}


type Scrapbox = {
    PageMenu: {
        addMenu(init: AddMenuInit): void
        (name?: string): PageMenu
        removeAllItems(): void
    }
    Project: {
        name: string
        pages: PageBrief[]
    }
} & (
    {
        Layout: "page"
        Page: {
            lines: ParsedLine[]
            title: string
            id: string
        }
    } |
    {
        Layout: PartialLayout
        Page: {
            lines: null
            title: null
            id: null
        }
    }
)


interface PageMenu {
    addItem(item: Item)
    addSeparator(): void
    reset(): void
    emitChange(): void
}


interface Item {
    title: string | (() => string)
    image?: string
    onClick: (event: React.MouseEvent<HTMLImageElement>) => void
}


interface AddMenuInit {
    title?: string | (() => string)
    image: string
    onClick?: (event: React.MouseEvent<HTMLImageElement>) => void
}

interface PageBrief {
    exists: boolean
    hasIcon?: boolean
    id: string
    title: string
    titleLc: StringLc
    updated: number
}


// UPPER CASE -> upper_case
type StringLc = string

type ParsedLine = Line & {
    section: {
        number: number
        start: boolean
        end: boolean
    }
}

interface Line {
    created: number
    id: LineId
    text: string
    updated: number
    userId: UserId
}

type LineId = string
type UserId = string

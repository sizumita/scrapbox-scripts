import {layout} from "./layout";
import * as React from "react";

export {}

declare global {
    namespace scrapbox {
        namespace Page {
            // 現在開いているページのタイトル
            const title: string
            // 現在開いているページ本文のJSONデータ
            // TODO: interfaceにする
            const lines: object
            const id: string
        }

        namespace Project {
            // 現在開いているprojectの名前
            const name: string
            // 現在開いているprojectの全ページのJSONデータ
            // TODO: interfaceにする
            const pages: object
        }

        // 現在開かれているページの種類を表す文字列
        const Layout: layout

        namespace PageMenu {
            function addMenu(init: AddMenuInit): void
        }
    }
}


interface AddMenuInit {
    title?: string
    image: string
    onClick?: (event: React.MouseEvent<HTMLImageElement>) => void
}

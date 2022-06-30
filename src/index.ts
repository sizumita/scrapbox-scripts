import charCounter from "./charCounter"
import {InitializePageMenu} from "./PageMenu";


export function all() {
    InitializePageMenu()
    charCounter()
}

export {
    charCounter,
    InitializePageMenu,
}

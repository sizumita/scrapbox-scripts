import charCounter from "./charCounter"
import {InitializePageMenu} from "./PageMenu";
import diary from "./diary";


export function all() {
    InitializePageMenu()
    charCounter()
    diary().catch(alert)
}

export {
    charCounter,
    InitializePageMenu,
    diary
}

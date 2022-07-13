import charCounter from "./charCounter"
import {InitializePageMenu} from "./PageMenu";
import diary, {AutoCreateDiary} from "./diary";


export function all() {
    InitializePageMenu()
    charCounter()
    AutoCreateDiary().catch(alert)
    diary().catch(alert)
}

export {
    charCounter,
    InitializePageMenu,
    diary
}

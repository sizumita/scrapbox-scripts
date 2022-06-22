const target = document.getElementsByClassName("page-wrapper")[0]

export function observePage(func: () => void) {
    const observer = new MutationObserver((recs) => {
        // @ts-ignore
        if (!recs[0].target.classList.contains("enter")) {
            func()
        }
    });
    observer.observe(target, {attributes: true, attributeFilter: ["class"]})
}

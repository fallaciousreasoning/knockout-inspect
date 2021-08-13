// Put all the javascript code here, that you want to execute after page load.
let clickedElement: HTMLElement | null = null;

const logData = (element: HTMLElement) => {
    const ko: KnockoutStatic = (window as any)?.wrappedJSObject?.ko;
    if (typeof ko === "undefined") {
        console.log("Window doesn't appear to have knockout");
        return;
    }
    const data = window.ko.dataFor(element);
    console.log(data);
}

window.addEventListener('contextmenu', e => {
    clickedElement = e.target as HTMLElement;
});

browser.runtime.onMessage.addListener((message) => {
    console.log(message)
    if (!clickedElement) return;
    logData(clickedElement);
});
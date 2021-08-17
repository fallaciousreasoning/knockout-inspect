import popper, { Instance } from '@popperjs/core';

const createInspector = () => {
    const element = document.createElement('div');
    element.outerHTML = `<div role="tooltip">
        Super Useful info
        <div data-popper-arrow></div>
    </div>`
    return element;
}

let hoveringElement: HTMLElement | null = null;
let clickedElement: HTMLElement | null = null;
let inspector: HTMLDivElement = createInspector();
let instance: Instance | null = null;

const logData = (element: HTMLElement, type: 'data' | 'context') => {
    const ko: KnockoutStatic = (window as any)?.wrappedJSObject?.ko;
    if (typeof ko === "undefined") {
        console.log("Window doesn't appear to have knockout");
        return;
    }
    const data = (ko as any)[`${type}For`](element);
    console.log(data);
}

window.addEventListener('contextmenu', e => {
    clickedElement = e.target as HTMLElement;
    instance = popper.createPopper(clickedElement, inspector);
});

window.addEventListener('mousemove', e => {
    if (hoveringElement === e.target) return;
    hoveringElement = e.target as any;

    console.log(hoveringElement);
})

browser.runtime.onMessage.addListener((message) => {
    if (!message.type.startsWith("inspect-")) return;

    if (!clickedElement) return;
    logData(clickedElement, message.type.slice(8));
});
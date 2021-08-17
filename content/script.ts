import { createPopper, Instance as Popper } from '@popperjs/core';
import { toHtml } from '../util/html';

const createInspector = () => {
    const element = document.createElement('div');
    element.setAttribute("style", "background: white; padding: 10px; border-radius: 8px; box-shadow: 10px 10px solid black");
    element.innerHTML = `Super Useful info`;
    document.body.appendChild(element);
    console.log(element)
    return element;
}

let hoveringElement: HTMLElement | null = null;
let clickedElement: HTMLElement | null = null;
let inspector: HTMLDivElement = createInspector();
let instance: Popper | null = null;

const getData = (element: HTMLElement, type: 'data' | 'context') => {
    const ko: KnockoutStatic = (window as any)?.wrappedJSObject?.ko;
    if (typeof ko === "undefined") {
        console.log("Window doesn't appear to have knockout");
        return;
    }
    const data = (ko as any)[`${type}For`](element);
    return data;
}

const logData = (element: HTMLElement, type: 'data' | 'context') => {
    console.log(getData(element, type));
}

window.addEventListener('contextmenu', e => {
    clickedElement = e.target as HTMLElement;
});

window.addEventListener('mousemove', e => {
    if (hoveringElement === e.target) return;
    const data = getData(e.target as any, 'data');
    if (!data) return;
    console.log(data);

    if (hoveringElement) hoveringElement.setAttribute("style", "");
    hoveringElement = e.target as any;

    if (!hoveringElement) return;
    hoveringElement.setAttribute("style", "outline: 1px solid red")
    

    if (instance) {
        instance.destroy();
    }

    try {
    const html = toHtml(data);
    console.log(html)
    inspector.innerHTML = html;
    } catch (err) {
        console.trace(err)
    }
    instance = createPopper(hoveringElement, inspector);
})

browser.runtime.onMessage.addListener((message) => {
    if (!message.type.startsWith("inspect-")) return;

    if (!clickedElement) return;
    logData(clickedElement, message.type.slice(8));
});
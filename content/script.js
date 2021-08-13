"use strict";
// Put all the javascript code here, that you want to execute after page load.
let clickedElement = null;
const logData = (element) => {
    var _a, _b;
    const ko = (_b = (_a = window) === null || _a === void 0 ? void 0 : _a.wrappedJSObject) === null || _b === void 0 ? void 0 : _b.ko;
    if (typeof ko === "undefined") {
        console.log("Window doesn't appear to have knockout");
        return;
    }
    const data = window.ko.dataFor(element);
    console.log(data);
};
window.addEventListener('contextmenu', e => {
    clickedElement = e.target;
});
browser.runtime.onMessage.addListener((message) => {
    console.log(message);
    if (!clickedElement)
        return;
    logData(clickedElement);
});

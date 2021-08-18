// Placeholder. This isn't actually used because we serialize the function to a string.
let $0: HTMLElement | null;
const setExpression = function() {
    let selectedElement = $0;
    if (!selectedElement) return "No element selected";

    const data = window.ko.dataFor(selectedElement);
    if (!data) return "No data for element";
    return window.ko.toJS(data);
};

(async () => {
    /**
    Create the panel, and add listeners for panel show/hide events.
    */
    let knockout: KnockoutStatic = (await browser.devtools.inspectedWindow.eval("window.ko") as any);
    if (!knockout) return;

    const sidebar = await browser.devtools.panels.elements.createSidebarPane("Knockout Inspect");
    sidebar.setExpression(`(${setExpression.toString()})()`);
})();


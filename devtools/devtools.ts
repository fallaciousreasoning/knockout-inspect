// Placeholder. This isn't actually used because we serialize the function to a string.
let $0: HTMLElement | null;
const setExpression = function() {
    let selectedElement = $0;
    if (!selectedElement) return "No element selected";

    const context = window.ko.contextFor(selectedElement);
    if (!context) return "No knockout context for element";

    (window as any)['$context'] = context;
    (window as any)['$data'] = window.ko.dataFor(selectedElement);
    window.foo = 7

    return context;
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


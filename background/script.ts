browser.contextMenus.create({
    id: "inspect-context",
    title: "Context",
    contexts: ["page", "link"]
});

browser.contextMenus.create({
    id: "inspect-data",
    title: "Data",
    contexts: ["page", "link"]
});

browser.contextMenus.onClicked.addListener(function (info, tab) {
    if (!tab || !tab.id) return;

    switch (info.menuItemId) {
        case "inspect-context":
        case "inspect-data":
            browser.tabs.sendMessage(tab.id, {
                type: info.menuItemId
            });
            break;
    }
})
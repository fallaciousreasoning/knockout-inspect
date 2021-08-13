browser.contextMenus.create({
    id: "inspect-context",
    title: "Inspect Knockout Context",
    contexts: ["page", "link"]
});

browser.contextMenus.onClicked.addListener(function (info, tab) {
    if (!tab || !tab.id) return;

    switch (info.menuItemId) {
        case "inspect-context":
            browser.tabs.sendMessage(tab.id, {
                type: 'log-data'
            });
            break;
    }
})
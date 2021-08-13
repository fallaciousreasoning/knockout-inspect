browser.contextMenus.create({
    id: "inspect-context",
    title: "Inspect Knockout Context",
    contexts: ["page", "link"]
});

browser.contextMenus.create({
    id: "inspect-data",
    title: "Inspect Knockout Data",
    contexts: ["page", "link"]
});

browser.contextMenus.onClicked.addListener(function (info, tab) {
    switch (info.menuItemId) {
        case "inspect-context":
            console.log(info);
            break;
    }
})
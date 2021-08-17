type Convertable = Object | string | number | Function;

export const toHtml = (obj: Convertable | Convertable[]): string => {
    const type = typeof obj;

    if (Array.isArray(obj)) {
        return `[ ] <i>${obj.length}</i>`
    }

    if (type == "function") {
        const str = obj.toString();
        return str.substr(0, str.indexOf(')'));
    }

    if (type === "object") {
        return `{
            ${Object.entries(obj).map(([key, value]) => `<p><b>${key}:</b>${value}</p>`).join('\n')}
        }`
    }

    return "" + obj;
}
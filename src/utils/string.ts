export function replacePlaceholders(
    template: string,
    values: { [key: string]: string }
): string {
    return Object.keys(values).reduce((result, key) => {
        const regex = new RegExp(`\\{${key}\\}`, "g");
        return result.replace(regex, values[key]);
    }, template);
}

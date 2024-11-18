/* eslint-disable @typescript-eslint/no-explicit-any */

export function removeDuplicates<T = any>(array: T[]): T[] {
    return array.filter(
        (item, index, self) =>
            index ===
            self.findIndex(
                (other) => JSON.stringify(other) === JSON.stringify(item)
            )
    );
}

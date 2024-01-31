export const sortByDate = <T extends Record<string, any>>(array: T[], field: keyof T): T[] => {
    return array.slice().sort((a, b) => {
        const dateA = new Date(a[field]);
        const dateB = new Date(b[field]);

        return dateA.getTime() - dateB.getTime();
    });
};
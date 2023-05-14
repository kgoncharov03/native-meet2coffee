export const unique = (array: Array<Record<string, any>>, key: string) => {
    const keys: Record<string, any> = {};
    return array.filter((el) => {
        if (!el) {
            return false;
        }
        if (keys[el[key]]) {
            return false;
        }
        keys[el[key]] = true;
        return true;
    });
};

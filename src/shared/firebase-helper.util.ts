export const generateKeywords = (displayName) => {
    const name = displayName.split(' ').filter((word) => word) as string[];

    let flagArray: boolean[] = [];
    let result: any[] = [];
    let strArray: string[] = [];

    for (let i = 0; i < name.length; i++) {
        flagArray[i] = false;
    }

    const createKeywords = (name) => {
        const arrName: string[] = [];
        let currentName = '';
        name.split('').forEach((c) => {
            currentName += c;
            arrName.push(currentName);
        });
        return arrName;
    }

    function findPermutation(k) {
        for (let i = 0; i < name.length; i++) {
            if (!flagArray[i]) {
                flagArray[i] = true;
                result[k] = name[i];

                if (k === name.length - 1) {
                    strArray.push(result.join(' '));
                }

                findPermutation(k + 1);
                flagArray[i] = false;
            }
        }
    }

    findPermutation(0);

    let keywords = strArray.reduce((acc, cur): any => {
        const words = createKeywords(cur);
        return [...acc, ...words];
    }, []);

    return keywords;
}
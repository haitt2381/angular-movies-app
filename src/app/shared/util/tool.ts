export function roundDecimalNumber(input: number): number {
    const decimalPart = input - Math.floor(input);

    if (decimalPart >= 0.6) {
        return Math.ceil(input);
    } else if (decimalPart >= 0.4) {
        return Math.floor(input) + 0.5;
    } else {
        return Math.floor(input);
    }
}

export function checkEnum(enumEntity: any, value: any, defaultEnumReturn?: any) {
    if(!Object.values(enumEntity).includes(value)) {
        return defaultEnumReturn || null;
    }
    
    return value;
}
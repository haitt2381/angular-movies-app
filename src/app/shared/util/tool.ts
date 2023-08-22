import {Router} from "@angular/router";

export function navigate(router: Router, value: any, isMerge: boolean = true) {
    router.navigate([], {
        queryParams: {value},
        queryParamsHandling: 'merge',
    }).then();
}

export function isEmpty(value: any) {
    let valueTrim;
    if(typeof value === 'string') {
        valueTrim = value.trim();
    }
    return value === null || value === undefined || valueTrim === '';
}

export function checkEnum(enumEntity: any, value: any, defaultEnumReturn?: any) {
    if(!Object.values(enumEntity).includes(value)) {
        return defaultEnumReturn || null;
    }
    
    return value;
}

export function getRandomEl(array: any[]) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

export function getEnumValue(enumEntity: any, key: string): string {
    return enumEntity[key as keyof typeof enumEntity] || '';
}

export function capitalizeFirstLetter(value: string): string {
    value = value.toLowerCase();
    return value.charAt(0).toUpperCase() + value.slice(1);
}
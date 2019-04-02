interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
}

interface ArrayConstructor {
    empty(a: any[]): boolean;
    equals(a: any[], b: any[]): boolean;
}

interface ObjectConstructor {
    equals(a: object, b: object): boolean;
    empty(a: object): boolean;
}

declare module '*.svg';
declare module '*.png';
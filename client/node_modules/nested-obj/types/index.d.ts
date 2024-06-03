declare const _default: {
    get<T>(obj: Record<string, any>, path: string): T | undefined;
    set(obj: Record<string, any>, path: string, value: any): void;
    has(obj: Record<string, any>, path: string): boolean;
};
export default _default;

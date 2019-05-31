import 'reflect-metadata';

export interface IJsonMetaData<T> {
    name?: string;
    clazz?: { new (...args: any[]): T };
}
export const JSON_METADATA_KEY: string = 'jsonProperty';

export function JsonProperty<T>(metadata?: IJsonMetaData<T> | string): any {
    if (metadata instanceof String || typeof metadata === 'string') {
        return Reflect.metadata(JSON_METADATA_KEY, {
            name: metadata,
            clazz: undefined,
        });
    } else {
        const metadataObj: IJsonMetaData<T> = <IJsonMetaData<T>>metadata;
        return Reflect.metadata(JSON_METADATA_KEY, {
            name: metadataObj ? metadataObj.name : undefined,
            clazz: metadataObj ? metadataObj.clazz : undefined,
        });
    }
}

export function getClazz(target: any, propertyKey: string): any {
    return Reflect.getMetadata('design:type', target, propertyKey);
}

export function getJsonProperty<T>(
    target: any,
    propertyKey: string
): IJsonMetaData<T> {
    return Reflect.getMetadata(JSON_METADATA_KEY, target, propertyKey);
}

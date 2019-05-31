import { Injectable } from '@angular/core';
import { getClazz, getJsonProperty } from './json-metadata.service';
import { Link } from '../hateoas/link.model';
@Injectable({
    providedIn: 'root',
})
// tslint:disable: typedef
export class ObjectMapperService {
    constructor() {}

    // tslint:disable-next-line: typedef
    public deserialize<T>(
        clazz: { new (...args: any[]): T },
        jsonObject: any
    ): any {
        if (clazz === undefined || jsonObject === undefined) {
            return undefined;
        }
        const obj: any = new clazz();
        Object.keys(obj).forEach(key => {
            const propertyMetadataFn: (IJsonMetaData: any) => any = propMd => {
                const propertyName = propMd.name || key;
                const innerJson = jsonObject
                    ? jsonObject[propertyName]
                    : undefined;
                const clazzInner = getClazz(obj, key);
                if (this.isArray(clazzInner)) {
                    const metadata = getJsonProperty(obj, key);
                    if (metadata.clazz || this.isPrimitive(clazzInner)) {
                        if (innerJson && this.isArray(innerJson)) {
                            return innerJson.map((item: any) =>
                                this.deserialize(metadata.clazz, item)
                            );
                        } else {
                            return undefined;
                        }
                    } else {
                        return innerJson;
                    }
                } else if (!this.isPrimitive(clazzInner)) {
                    return this.deserialize(clazzInner, innerJson);
                } else {
                    return jsonObject ? jsonObject[propertyName] : undefined;
                }
            };

            const propertyMetadata = getJsonProperty(obj, key);
            if (propertyMetadata) {
                obj[key] = propertyMetadataFn(propertyMetadata);
            } else {
                if (jsonObject && jsonObject[key] !== undefined) {
                    switch (key) {
                        case 'links':
                            jsonObject[key].forEach((element: any) => {
                                obj[key].push(this.deserialize(Link, element));
                            });
                            break;
                        default:
                            obj[key] = jsonObject[key];
                            break;
                    }
                }
            }
        });
        return obj;
    }

    private isPrimitive(obj: any): boolean {
        switch (typeof obj) {
            case 'string':
            case 'number':
            case 'boolean':
                return true;
        }
        return !!(
            obj instanceof String ||
            obj === String ||
            obj instanceof Number ||
            obj === Number ||
            obj instanceof Boolean ||
            obj === Boolean
        );
    }

    private isArray(object: any): boolean {
        if (object === Array) {
            return true;
        } else if (typeof Array.isArray === 'function') {
            return Array.isArray(object);
        } else {
            return !!(object instanceof Array);
        }
    }
}

import { Injectable } from '@angular/core';
import { ObjectMapperService } from '../model-serializer/object-mapper.service';
import { User } from 'shared/models/user.model';

@Injectable({
    providedIn: 'root',
})
export class JwtTokenService {
    constructor(private objectMapper: ObjectMapperService) {}

    /**
     * decode the token
     * @return object decoded token
     */
    public convertTokenToUser(token: string): User {
        try {
            if (typeof token !== 'undefined' && token !== null) {
                const encodedData: string = token.split('.')[1];
                const decoded: string = this.urlBase64Decode(encodedData);
                const decodedObj: User = this.objectMapper.deserialize(
                    User,
                    JSON.parse(decoded)
                );
                return decodedObj;
            }
            throw new Error('No token available');
        } catch (e) {
            // throw ex
        }
    }

    /**
     * decodes base64 encoded user auth token
     * @param  string str the token string
     * @return string
     */
    private urlBase64Decode(str: string): string {
        let output: string = str.replace('-', '+').replace('_', '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                throw new Error('No token available');
        }
        return window.atob(output);
    }
}

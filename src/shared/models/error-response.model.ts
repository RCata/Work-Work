import { HttpErrorResponse } from '@angular/common/http';

export class ApiError {
    id?: string;
    message: string;
    status: string;
    userTranslatedMessage: string;
    errorFields: Array<{
        key: {
            value: string;
        };
        value: string;
    }>;
    subErrors: string[];
}
export interface ApiErrorResponse extends HttpErrorResponse {
    error: ApiError;
}

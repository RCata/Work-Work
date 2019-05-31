import { Injectable } from '@angular/core';
import { ApiErrorResponse } from 'shared/models/error-response.model';

@Injectable({
    providedIn: 'root',
})
export class AbstractNotificationService {
    // toast service or something here

    protected successActions(item: string, action: string): void {
        // add success toast here
    }
    protected errorActions(
        item: string,
        action: string,
        data: ApiErrorResponse
    ): void {
        // add error toast here
    }
}

/**
 * Wrapper to provide momentJS instance.
 * sample usage: this.momentService.getInstance().format();
 * @see http://momentjs.com/
 * @author mbenzenhoefer
 */
import { Injectable } from '@angular/core';
import * as Moment from 'moment';

@Injectable()
export class MomentService {
    public static weekISOFormat: string = 'GGGG-[W]WW';
    public static weekDisplayFormat: string = 'WW (GGGG)';

    constructor() {}

    getInstance(...params: any[]): Moment.Moment {
        if (params) {
            const [dateValue, format]: any = params;
            return Moment(dateValue, format);
        } else {
            return Moment();
        }
    }
}

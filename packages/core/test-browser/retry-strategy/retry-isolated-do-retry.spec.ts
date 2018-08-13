import { of, throwError } from 'rxjs';
import { catchError, retryWhen, switchMap } from 'rxjs/operators';

import { retryStrategy } from '../../lib';

describe('Retry - isolated - retry', () => {
    const retryAttempts = 3;
    const MAX_SAFE_TIMEOUT = Math.pow(2, 31) - 1;

    jasmine.DEFAULT_TIMEOUT_INTERVAL = MAX_SAFE_TIMEOUT;

    beforeAll((done) => {
        spyOn(retryStrategy, 'debugLogAttempt').and.callThrough();

        // fake error
        const error: any = {
            originalError: {
                response: {
                    status: 500
                }
            }
        };

        of(true)
            .pipe(
                switchMap(() => {
                    return throwError(error);
                }),
                retryWhen(retryStrategy.strategy({
                    maxRetryAttempts: retryAttempts,
                    useRetryForResponseCodes: [500]
                })),
                catchError((err, t) => {
                    return of(true);
                }),
        )
            .subscribe(() => done());

    });

    it(`Warning for retry attempt should have been called '${retryAttempts}'`, () => {
        expect(retryStrategy.debugLogAttempt).toHaveBeenCalledTimes(retryAttempts);
    });
});


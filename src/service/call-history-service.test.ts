import {CallHistoryService} from './call-history-service';

describe('CallHistoryService', () => {
    describe('increment', () => {
        const subject: CallHistoryService = new CallHistoryService();

        it('increments and returns the call number for method and path passed', () => {
            expect(subject.increment('GET', '/content')).toEqual(0);
            expect(subject.increment('GET', '/content')).toEqual(1);
            expect(subject.increment('GET', '/content')).toEqual(2);
        });

    });
});

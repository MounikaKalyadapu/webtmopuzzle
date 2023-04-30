import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpTestingController } from '@angular/common/http/testing';

import { SharedTestingModule } from '@tmo/shared/testing';
import { ReadingListEffects } from './reading-list.effects';
import * as ReadingListActions from './reading-list.actions';
import { ReadingListItem } from '@tmo/shared/models';

describe('ToReadEffects', () => {
  let actions: ReplaySubject<any>;
  let effects: ReadingListEffects;
  let httpMock: HttpTestingController;
  let itemObj:ReadingListItem;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      providers: [
        ReadingListEffects,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(ReadingListEffects);
    httpMock = TestBed.inject(HttpTestingController);
    itemObj = {
      bookId:'1',
      title:'ab',
      authors:['a'],
      description:'asda'
    }
  });

  describe('loadReadingList$', () => {
    it('should work', done => {
      actions = new ReplaySubject();
      actions.next(ReadingListActions.init());

      effects.loadReadingList$.subscribe(action => {
        expect(action).toEqual(
          ReadingListActions.loadReadingListSuccess({ list: [] })
        );
        done();
      });

      httpMock.expectOne('/api/reading-list').flush([]);
    });
  });
  describe('markAsRead$', () => {
    it('should work', done => {
      actions = new ReplaySubject();
      actions.next(ReadingListActions.markBookAsReadFromReadingList({item:itemObj}));

      effects.markAsRead$.subscribe(action => {
        expect(action).toEqual(
          ReadingListActions.confirmedMarkAsFinished({ item:{...itemObj,finished:true,finishedDate:'2023-04-30T04:38:52.343Z'}})
        );
        done();
      });

      httpMock.expectOne('/api/reading-list/1/finished').flush({...itemObj,finished:true,finishedDate:'2023-04-30T04:38:52.343Z'});
    });
  });
});

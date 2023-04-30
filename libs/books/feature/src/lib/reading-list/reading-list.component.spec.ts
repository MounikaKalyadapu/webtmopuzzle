import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from '@tmo/shared/testing';

import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';
import { removeFromReadingList,markBookAsReadFromReadingList  } from '@tmo/books/data-access';

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;
  let itemObj;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, SharedTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    itemObj = {
      bookId: 'A',
      title: 'ab',
      authors: ['a'],
      description: 'asdw',
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should mark book as read and dispatch markBookAsReadFromReadingList', () => {
    const spy = spyOn(component['store'], 'dispatch');
    component.markBookasRead(itemObj);
    expect(spy).toHaveBeenCalledWith(
      markBookAsReadFromReadingList({
        item: itemObj,
      })
    );
  });
  it('should remove Book and dispatch removeFromReadingList', () => {
    const spy = spyOn(component['store'], 'dispatch');
    component.removeFromReadingList(itemObj);
    expect(spy).toHaveBeenCalledWith(
      removeFromReadingList({
        item: itemObj,
      })
    );
  });
});

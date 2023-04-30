import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from '@tmo/shared/testing';

import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';
import { ReadingListItem } from '@tmo/shared/models';
import { addToReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;
  let itemObj:ReadingListItem;
  const mockMatSnackBar = {
    open:()=>{
      return {
        onAction: () => of({})
      }
    }

  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, SharedTestingModule],
      providers:[{provide:MatSnackBar,useValue:mockMatSnackBar}]
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
  it('should dispatch addToReadingList on addBookToReadingList call',()=>{
    const spy = spyOn(component['store'], 'dispatch');
    component.removeFromReadingList(itemObj);
    expect(spy).toHaveBeenCalledWith(
      removeFromReadingList({
        item: itemObj,
      })
    );
  });
});

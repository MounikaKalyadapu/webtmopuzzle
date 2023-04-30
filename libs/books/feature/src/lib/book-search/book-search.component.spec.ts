import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedTestingModule } from '@tmo/shared/testing';

import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';
import {
  addToReadingList, clearSearch, searchBooks,
} from '@tmo/books/data-access';
import { Book } from '@tmo/shared/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let bookObj:Book;
  const mockMatSnackBar = {
    open:()=>{
      return {
        onAction: () => of({})
      }
    }
  
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, NoopAnimationsModule, SharedTestingModule],
      providers:[{provide:MatSnackBar,useValue:mockMatSnackBar}]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    bookObj = {
      id: 'A',
      title: 'ab',
      authors: ['a'],
      description: 'asdw',
    }
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
  it('should dispatch addToReadingList on addBookToReadingList call',()=>{
    const spy = spyOn(component['store'], 'dispatch');
    component.addBookToReadingList(bookObj);
    expect(spy).toHaveBeenCalledWith(
      addToReadingList({
        book: bookObj,
      })
    );
  });
});

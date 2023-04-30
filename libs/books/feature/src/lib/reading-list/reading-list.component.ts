import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { addToReadingList,getReadingList, removeFromReadingList } from '@tmo/books/data-access';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store,private snackBar: MatSnackBar) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
    const snack= this.snackBar.open("Removed From List - "+item.title,"Add to List?",{duration:2000,horizontalPosition: "left"});
    snack.onAction().subscribe(() => {
     const bookData = {...item,id:item.bookId};
      return this.store.dispatch(addToReadingList({ book:bookData }))
  })
  }
}

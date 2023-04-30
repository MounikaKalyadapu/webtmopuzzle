import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedTestingModule } from '@tmo/shared/testing';
import { clearSearch, searchBooks } from '@tmo/books/data-access';
import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, BooksFeatureModule, NoopAnimationsModule, SharedTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(()=>{
    fixture.destroy();
  })

  it('should create', () => {
    expect(component).toBeDefined();
  });
  it('should call searchBooks',()=>{
    const el = fixture.nativeElement.querySelector('input');
    el.value = 'BlueJay';
    el.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.searchBooks).toHaveBeenCalled();
    });
  });
  it('should call searchBooks on formSubmit',()=>{
    component.searchForm.controls.term.setValue('BlueJay');
    const spy = spyOn(component['store'], 'dispatch')
    component.searchBooks();
    expect(spy).toHaveBeenCalledWith(
      searchBooks({ term: 'BlueJay' })
    );
  });
  it('should unsubscribe serachTermSubscription on onDestroy',()=>{
    component.serachTermSubscription = of('1').subscribe(val=>val);
    spyOn(component.serachTermSubscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.serachTermSubscription.unsubscribe).toHaveBeenCalled();
  });
  it('should dispatch clearSearch on form Submit',()=>{
    component.searchForm.value.term = "";
    const storeSpy=spyOn(component['store'],'dispatch')
      component.searchBooks();
      expect(storeSpy).toHaveBeenCalledWith(clearSearch())

    })
});

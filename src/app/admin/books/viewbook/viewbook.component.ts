import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Book} from '../../../model/book';
import {HttpClientService} from '../../../service/http-client.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-viewbook',
  templateUrl: './viewbook.component.html',
  styleUrls: ['./viewbook.component.css']
})
export class ViewbookComponent implements OnInit {

  @Input()
  book: Book;

  @Output()
  bookDeletedEmitter = new EventEmitter();

  constructor(private httpClientService: HttpClientService, private router: Router) { }

  ngOnInit(): void {
  }

  deleteBook(): void {
    this.httpClientService.deleteBook(this.book.id).subscribe(
      (book) => {
        this.bookDeletedEmitter.emit();
        this.router.navigate(['admin', 'books']);
      }
    );
  }

  editBook(): void {
    this.router.navigate(['admin', 'books'], { queryParams: { action: 'edit', id: this.book.id } });
  }

}

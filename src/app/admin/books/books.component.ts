import { Component, OnInit } from '@angular/core';
import {Book} from '../../model/book';
import {HttpClientService} from '../../service/http-client.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Array<Book>;
  booksReceived: Array<Book>;
  selectedBook: Book;
  action: string;

  constructor(private httpClientService: HttpClientService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.httpClientService.getBooks().subscribe(
      response => this.handleSuccessfulResponse(response)
    );
    this.activatedRoute.queryParams.subscribe(
      (params) => {
        this.action = params.action;
        const id = params.id;
        if (id) {
          this.selectedBook = this.books.find(book => {
            return book.id === +id;
          });
        }
      }
    );
  }

  handleSuccessfulResponse(response): void {
    this.books = new Array<Book>();
    this.booksReceived = response;

    for (const book of this.booksReceived) {
      const bookWithRetrievedImageField = new Book();
      bookWithRetrievedImageField.id = book.id;
      bookWithRetrievedImageField.name = book.name;
      bookWithRetrievedImageField.retrievedImage = 'data:image/jpeg;base64,' + book.picByte;
      bookWithRetrievedImageField.author = book.author;
      bookWithRetrievedImageField.price = book.price;
      bookWithRetrievedImageField.picByte = book.picByte;
      this.books.push(bookWithRetrievedImageField);
    }
  }

  refreshData(): void {
    this.httpClientService.getBooks().subscribe(
      response => this.handleSuccessfulResponse(response)
    );
    this.activatedRoute.queryParams.subscribe(
      (params) => {
        this.action = params.action;
      }
    );
  }

  addBook(): void {
    this.selectedBook = new Book();
    this.router.navigate(['admin', 'books'], { queryParams: { action: 'add' } });
  }

  viewBook(id: number): void {
    this.router.navigate(['admin', 'books'], { queryParams: { id, action: 'view' } });
  }
}

import { Component, OnInit } from '@angular/core';
import {Book} from '../model/book';
import {Router} from '@angular/router';
import {HttpClientService} from '../service/http-client.service';

@Component({
  selector: 'app-shopbook',
  templateUrl: './shopbook.component.html',
  styleUrls: ['./shopbook.component.css']
})
export class ShopbookComponent implements OnInit {

  books: Array<Book>;
  booksReceived: Array<Book>;
  cartBooks: any;

  constructor(private router: Router, private httpClientService: HttpClientService) { }

  ngOnInit(): void {
    this.httpClientService.getBooks().subscribe(
      response => this.handleSuccessfulResponse(response),
    );

    this.cartBooks = this.getLocalStorageData('cart');
  }

  getLocalStorageData(key: string): any {
    const data = localStorage.getItem(key);
    if (data !== null) {
      return JSON.parse(data);
    } else {
      return [];
    }
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

  addToCart(bookId): void {
    const book = this.books.find(bookFound => {
      return bookFound.id === bookId;
    });
    const cartData = this.getLocalStorageData('cart');

    cartData.push(book);

    this.updateCartData(cartData);

    localStorage.setItem('cart', JSON.stringify(cartData));
    book.isAdded = true;
  }

  updateCartData(cartData): void {
    this.cartBooks = cartData;
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  emptyCart(): void {
    this.cartBooks = [];
    localStorage.clear();
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import {Book} from '../model/book';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getUsers(): Observable<any> {
    return this.httpClient.get<User[]>('http://localhost:8080/users/get');
  }

  addUser(newUser: User): Observable<any> {
    return this.httpClient.post<User>('http://localhost:8080/users/add', newUser);
  }

  deleteUser(id: number): Observable<any> {
    return this.httpClient.delete<User>('http://localhost:8080/users/' + id);
  }

  getBooks(): Observable<any> {
    return this.httpClient.get<Book[]>('http://localhost:8080/books/get');
  }

  addBook(newBook: Book): Observable<any> {
    return this.httpClient.post<Book>('http://localhost:8080/books/add', newBook);
  }

  deleteBook(id): Observable<any> {
    return this.httpClient.delete<Book>('http://localhost:8080/books/' + id);
  }

  updateBook(updatedBook: Book): Observable<any> {
    return this.httpClient.put<Book>('http://localhost:8080/books/update', updatedBook);
  }
}

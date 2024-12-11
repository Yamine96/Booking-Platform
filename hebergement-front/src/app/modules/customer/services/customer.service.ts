import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

const BASIC_URL = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }


  getAllHosts(): Observable<any> {
    return this.http.get(BASIC_URL + "/api/customer/hosts", {
      headers: this.createAuthorizationHeader()
    });
  }

  searchHostByType(type:any): Observable<any> {
    return this.http.get(BASIC_URL + '/api/customer/search/'+ type, {
      headers: this.createAuthorizationHeader()
    });
  }

  getHostById(hostId : number): Observable<any> {
    return this.http.get(BASIC_URL + '/api/customer/host/'+ hostId, {
      headers: this.createAuthorizationHeader()
    });
  }

  bookAHost(bookAHostDto: any): Observable<any> {
    return this.http.post(BASIC_URL + '/api/customer/host/book', bookAHostDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  getBookingsByUserId(): Observable<any> {
    return this.http.get(BASIC_URL + '/api/customer/host/bookings/' + StorageService.getUserId(), {
      headers: this.createAuthorizationHeader()
    });
  }

  giveReview(reviewDto: any): Observable<any> {
    return this.http.post(BASIC_URL + '/api/customer/review', reviewDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  getReviewByHostId(hostId : number): Observable<any> {
    return this.http.get(BASIC_URL + '/api/customer/review/'+ hostId, {
      headers: this.createAuthorizationHeader()
    });
  }

  getContactByUserId(): Observable<any> {
    return this.http.get(BASIC_URL + '/api/customer/contact/messages/' + StorageService.getUserId(), {
      headers: this.createAuthorizationHeader()
    });
  }

  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + StorageService.getToken()
    );
  }

  contactAdmin(contactDto: any): Observable<any> {
    return this.http.post(BASIC_URL + '/api/customer/host/contact', contactDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  deleteMessages(id: number): Observable<any> {
    return this.http.delete(BASIC_URL + "/api/customer/messages/" + id, {
      headers: this.createAuthorizationHeader()
    });
  }

  updateUser(id: number, userDto: any): Observable<any> {
    return this.http.put(BASIC_URL + "/api/customer/user/" + id, userDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  getProfileByUserId(): Observable<any> {
    return this.http.get(BASIC_URL + '/api/customer/user/profile/' + StorageService.getUserId(), {
      headers: this.createAuthorizationHeader()
    });
  }

  getByUserId(id: number): Observable<any> {
    return this.http.get(BASIC_URL + '/api/customer/profile/' + id, {
      headers: this.createAuthorizationHeader()
    });
  }


  getBookById(bookId : number): Observable<any> {
    return this.http.get(BASIC_URL + '/api/customer/book/'+ bookId, {
      headers: this.createAuthorizationHeader()
    });
  }

  addMoney(moneyDto: any): Observable<any> {
    return this.http.post(BASIC_URL + '/api/customer/host/money', moneyDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  addPayment(paymentDto: any): Observable<any> {
    return this.http.post(BASIC_URL + '/api/customer/host/payment', paymentDto, {
      headers: this.createAuthorizationHeader()
    });
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

const BASIC_URL = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  postHost(hostDto: any): Observable<any> {
    return this.http.post(BASIC_URL + "/api/admin/host", hostDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  getAllHosts(): Observable<any> {
    return this.http.get(BASIC_URL + "/api/admin/hosts", {
      headers: this.createAuthorizationHeader()
    });
  }

  deleteHost(id: number): Observable<any> {
    return this.http.delete(BASIC_URL + "/api/admin/host/" + id, {
      headers: this.createAuthorizationHeader()
    });
  }

  getHostById(id: number): Observable<any> {
    return this.http.get(BASIC_URL + "/api/admin/host/" + id, {
      headers: this.createAuthorizationHeader()
    });
  }

  updateHost(hostId: number, hostDto: any): Observable<any> {
    return this.http.put(BASIC_URL + "/api/admin/host/" + hostId, hostDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  getHostBookings(): Observable<any> {
    return this.http.get(BASIC_URL + "/api/admin/host/bookings", {
      headers: this.createAuthorizationHeader()
    });
  }

  changeBookingStatus(bookingId: number, status: string): Observable<any> {
    return this.http.get(`${BASIC_URL}/api/admin/host/booking/${bookingId}/${status}`, {
      headers: this.createAuthorizationHeader()
    });
}

getAllUsers(): Observable<any> {
  return this.http.get(BASIC_URL + "/api/admin/host/users", {
    headers: this.createAuthorizationHeader()
  });
}

getAllReview(): Observable<any> {
  return this.http.get(BASIC_URL + "/api/admin/host/review", {
    headers: this.createAuthorizationHeader()
  });
}

deleteUser(id: number): Observable<any> {
  return this.http.delete(BASIC_URL + "/api/admin/user/" + id, {
    headers: this.createAuthorizationHeader()
  });
}

deleteReview(id: number): Observable<any> {
  return this.http.delete(BASIC_URL + "/api/admin/review/" + id, {
    headers: this.createAuthorizationHeader()
  });
}

getAllContact(): Observable<any> {
  return this.http.get(BASIC_URL + "/api/admin/host/contacts", {
    headers: this.createAuthorizationHeader()
  });
}

deleteContact(id: number): Observable<any> {
  return this.http.delete(BASIC_URL + "/api/admin/contacts/" + id, {
    headers: this.createAuthorizationHeader()
  });
}


getContactById(contactId : number): Observable<any> {
  return this.http.get(BASIC_URL + '/api/admin/contact/'+ contactId, {
    headers: this.createAuthorizationHeader()
  });
}

AddResponse(responseContactDto: any): Observable<any> {
  return this.http.post(BASIC_URL + '/api/admin/contact/response', responseContactDto, {
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

}

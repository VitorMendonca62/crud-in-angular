import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmitEventService {
  private eventSubject = new Subject<any>();

  emitEvent(data: any) {
    console.log("oi3")
    this.eventSubject.next(data);
    }

    get events$() {
      return this.eventSubject.asObservable();
      }
      }
      @Injectable({
  providedIn: 'root',
  })
  export class SearchEmitEventService {
    private eventSubject = new Subject<any>();

    emitEvent(data: any) {
    console.log("oi4")
    this.eventSubject.next(data);
    }

    get events$() {
      return this.eventSubject.asObservable();
      }
      }
      @Injectable({
  providedIn: 'root',
  })
  export class FilterEmitEventService {
    private eventSubject = new Subject<any>();

    emitEvent(data: any) {
      console.log("oi5")
    this.eventSubject.next(data);
  }

  get events$() {
    return this.eventSubject.asObservable();
  }
}

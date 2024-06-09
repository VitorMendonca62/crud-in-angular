import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmitEventService {
  private eventSubject = new Subject<any>();

  emitEvent(data: any) {
    this.eventSubject.next(data);
  }

  get events$() {
    return this.eventSubject.asObservable();
  }
}

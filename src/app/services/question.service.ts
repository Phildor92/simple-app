import {Injectable} from '@angular/core';
import {Question} from "../models/question";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, delay} from "rxjs";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  #questionSubject = new BehaviorSubject<Question[]>([]);
  public question$ = this.#questionSubject.asObservable();

  constructor(private http: HttpClient) {
    this.load();
  }

  createQuestion({id, ...questionData}: Question) {
    this.http.post<Question>(`${environment.apiUrl}/questions`, questionData).subscribe(() => this.load());
  }

  private load() {
    this.http.get<Question[]>(`${environment.apiUrl}/questions`).pipe(delay(1000)).subscribe(data => this.#questionSubject.next(data));
  }

}

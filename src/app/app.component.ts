import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {QuestionFormComponent} from "./question-form/question-form.component";
import {Question} from "./models/question";
import {QuestionService} from "./services/question.service";
import {LoadingComponent} from "./loading/loading.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, QuestionFormComponent, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'simple-app';
  questions: Question[] = [];

  constructor(public questionService: QuestionService) {
    this.questionService.question$.subscribe(data => this.questions = data);
  }

  addQuestion(question: Question) {
    this.questionService.createQuestion(question);
  }
}

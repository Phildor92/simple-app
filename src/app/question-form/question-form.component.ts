import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {Question} from "../models/question";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-question-form',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
  ],
  templateUrl: './question-form.component.html',
  styleUrl: './question-form.component.css'
})
export class QuestionFormComponent implements OnInit {
  @Output() add = new EventEmitter<Question>();

  newQuestion: Question = {
    id: 0,
    questionText: '',
    answers: [''],
    correctAnswer: 0
  }

  questionForm!: FormGroup;

  constructor(private nnfb : NonNullableFormBuilder) {  }

  ngOnInit(): void {
    this.questionForm = this.nnfb.group({
      id: this.nnfb.control(0),
      questionText: this.nnfb.control('', [Validators.required]),
      answers: this.nnfb.array([]),
      correctAnswer: this.nnfb.control(0, [Validators.required])
    });
  }

  onSubmit(questionForm: NgForm) {
    this.add.emit({...this.newQuestion})
    questionForm.reset();
    this.newQuestion.answers = [''];
  }

  addAnswer() {
    const answerForm = this.nnfb.group({
      answerText: ['', [Validators.required]],
    });

    this.answers.push(answerForm);
    console.log(this.answers)
    console.log(this.questionForm.value)
  }

  removeAnswer(index: number) {
    this.answers.removeAt(index);
  }

  get answers(){
    return this.questionForm.controls['answers'] as FormArray;
  }
}

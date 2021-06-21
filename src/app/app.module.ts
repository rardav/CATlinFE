import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavComponent } from './nav/nav.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ExamListComponent } from './catalogue/exam-list/exam-list.component';
import { ExamDetailComponent } from './catalogue/exam-detail/exam-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SharedModule } from './_modules/shared.module';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { ExamCardComponent } from './catalogue/exam-card/exam-card.component';
import { ExamInProgressComponent } from './catalogue/exam-in-progress/exam-in-progress.component';
import { QuestionComponent } from './catalogue/exam/question/question.component';
import { AnswerComponent } from './catalogue/exam/answer/answer.component';
import { ResultsComponent } from './catalogue/results/results.component';
import { ChartsModule } from 'ng2-charts';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CountdownModule } from 'ngx-countdown';
import { NG_SCROLLBAR_OPTIONS } from 'ngx-scrollbar';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    FooterComponent,
    AboutComponent,
    ExamListComponent,
    ExamDetailComponent,
    ProfileComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    ExamCardComponent,
    ExamInProgressComponent,
    QuestionComponent,
    AnswerComponent,
    ResultsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ChartsModule,
    CountdownModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxSpinnerModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: NG_SCROLLBAR_OPTIONS,
      useValue: {

      }}
    //{provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

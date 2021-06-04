import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ExamDetailComponent } from './catalogue/exam-detail/exam-detail.component';
import { ExamInProgressComponent } from './catalogue/exam-in-progress/exam-in-progress.component';
import { ExamListComponent } from './catalogue/exam-list/exam-list.component';
import { ResultsComponent } from './catalogue/results/results.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'catalogue', component: ExamListComponent},
  { path: 'catalogue/:title', component: ExamDetailComponent},
  { path: 'catalogue/:title/in-progress', component: ExamInProgressComponent},
  { path: 'about', component: AboutComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'users/:id', component: ProfileComponent},
  { path: 'errors', component: TestErrorsComponent},
  { path: 'not-found', component: NotFoundComponent},
  { path: 'server-error', component: ServerErrorComponent},  
  { path: 'catalogue/:title/in-progress/results', component: ResultsComponent}, 
  { path: '**', component: NotFoundComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

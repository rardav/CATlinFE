import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ExamInProgressComponent } from '../catalogue/exam-in-progress/exam-in-progress.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: ExamInProgressComponent): boolean {
    if(component.finishedExamination === false) {
      return confirm('Are you sure you want to quit the examination? Your progress will be lost.');
    }
    return true;
  }
  
}

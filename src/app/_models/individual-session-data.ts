import { ExamCardComponent } from "../catalogue/exam-card/exam-card.component";
import { Exam } from "./exam";
import { IndividualSession } from "./individual-session";
import { Session } from "./session";

export interface IndividualSessionData {
    individualSession: IndividualSession;
    session: Session;
    exam: Exam;
}
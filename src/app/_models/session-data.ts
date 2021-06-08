import { Exam } from "./exam";
import { Session } from "./session";

export interface SessionData {
    sessions: Session[];
    exams: Exam[];
    ids: number[];
}
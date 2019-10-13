
export class Student {
    // konstruktorimetodi joka rakentaa student-olion
    constructor(
        public _id: string, // mongon lisäämä _id
        public student_code: string,
        public name: string,
        public email: string,
        public study_points: number,
        public grades: Array<{}>) { }
}

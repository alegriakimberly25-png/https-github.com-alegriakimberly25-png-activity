let students = ["Kimberly", "JL", "Dailyn"];
let subjects = ["Math", "English", "Science"];
let grades = [90, 85, 92];


// Object Literal 1
const school = {
    name: "XYZ College",

    location: "Manila",
    studentsCount: 30
};

// Object Literal 2
const schoolInfo = {
    type: "Private School",
    yearEstablished: 2005,
    open: true
};

class Person {

    // Constructor 1
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    // Method 1
    introduce() {
        console.log("Hello! My name is " + this.name);
        console.log("I am " + this.age + " years old.");
    }
}

class Student extends Person {

    constructor(name, age, studentID, grade) {
        super(name, age);

        // Encapsulation 1
        this._studentID = studentID;

        this.grade = grade;
    }

    // Method 2
    displayStudent() {
        console.log(
            "Student: " + this.name +
            " | ID: " + this._studentID +
            " | Grade: " + this.grade
        );

    }

    // Encapsulation using getter
    getStudentID() {
        return this._studentID;
    }

    // Encapsulation using setter
    setStudentID(newID) {
        this._studentID = newID;
    }
}


class Teacher extends Person {

    constructor(name, age, subject) {
        super(name, age);

        // Encapsulation 2
        this._salary = 25000;

        this.subject = subject;
    }

    // Method 3
    teach() {
        console.log(
            this.name + " is teaching " + this.subject
        );
    }

    // Encapsulation getter
    getSalary() {
        return this._salary;

    }

    // Encapsulation setter
    setSalary(newSalary) {
        if (newSalary > 0) {
            this._salary = newSalary;
        }
    }
}

class School {

    constructor(name) {
        this.name = name;
        this.students = [];
    }

    // Method 4
    addStudent(student) {
        this.students.push(student);
    }

    // Method 5
    showStudents() {
        console.log("\nStudents in " + this.name + ":");

        for (let i = 0; i < this.students.length; i++) {
            console.log(this.students[i].name);
        }
    }

    // Method 6
    checkGrade(student) {

        if (student.grade >= 90) {
            console.log(student.name + " has an excellent grade.");
        }
        else if (student.grade >= 75) {
            console.log(student.name + " passed.");
        }
        else {
            console.log(student.name + " failed.");
        }
    }

    processStudents() {
        for (let student of this.students) {
            this.checkGrade(student);
        }
    }
}

// Object 1

const student1 = new Student(
    "Kimberly",
    21,
    "S001",
    95
);

// Object 2
const student2 = new Student(
    "JL",
    23,
    "S002",
    82
);

// Object 3
const teacher1 = new Teacher(
    "Mr. Cruz",
    35,
    "Mathematics"
);

const school1 = new School(
    "XYZ College"
);

student1.introduce();
student1.displayStudent();
student2.displayStudent();
teacher1.teach();

console.log("\nStudent ID:");
console.log(student1.getStudentID());

student1.setStudentID("S100");
console.log("New ID:", student1.getStudentID());

console.log("\nTeacher Salary:");
console.log(teacher1.getSalary());

teacher1.setSalary(30000);
console.log("New Salary:", teacher1.getSalary());

school1.addStudent(student1);
school1.addStudent(student2);
school1.showStudents();
school1.processStudents();

console.log("\nSubjects:");


subjects.forEach(function(subject) {
    console.log(subject);
});

console.log("\nGrades:");
grades.forEach(function(grade) {
    console.log(grade);
});

console.log("\nStudent Names:");

students.forEach(function(student) {
    console.log(student);
});
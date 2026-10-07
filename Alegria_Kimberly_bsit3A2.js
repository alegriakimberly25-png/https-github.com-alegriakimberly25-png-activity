
let studentName = "Kimberly";
let studentAge = 21;
let studentCourse = "Information Technology";
let studentYear = 3;
let studentCity = "Calbayog";
let studentStatus = "Active";
let studentScore = 92;
let studentSection = "IT-3A";
let studentHobby = "Programming";
let studentEmail = "alegriakimberly@25gmail.com";

const schoolName = "NWSSU";
const schoolYear = "2026-2027";
const passingScore = 75;
const maxScore = 97;
const department = "CCIS";
const subject = "JavaScript Programming";
const teacher = "Ms. Santos";
const semester = "First Semester";
const schoolLocation = "Calbayog, Philippines";
const programTitle = "Student Management System";

const subjects = ["JavaScript", "Networking", "Database", "Mathematics"];
const grades = [92, 88, 95, 90];
const classmates = ["Dailyn", "JL", "Raven", "Jonuel"];

const [firstSubject, secondSubject] = subjects;

const [firstGrade, secondGrade, thirdGrade] = grades;

const [firstClassmate, secondClassmate] = classmates;

const student = {
    name: studentName,
    age: studentAge,
    course: studentCourse,
    year: studentYear,
    city: studentCity,
    contact: {
        email: studentEmail,
        phone: "09488428068"
    }
};

const school = {
    name: schoolName,
    location: schoolLocation,
    department: department,
    teacher: teacher
};

const academic = {
    subject: subject,
    semester: semester,
    schoolYear: schoolYear,
    score: studentScore
};


const { name: fullName, age: ageValue } = student;

const { course, year } = student;

const { teacher: teacherName, department: schoolDepartment } = school;


const greetStudent = (name) => {
    return `Hello, ${name}! Welcome to ${schoolName}.`;
};

const calculateAverage = (scores) => {
    let total = 0;

    for (let score of scores) {
        total += score;
    }

    return total / scores.length;
};

const checkStatus = (score) => {
    if (score >= passingScore) {
        return "Passed";
    } else {
        return "Failed";
    }
};

const getFullCourse = (course, year) => {
    return `${course} - Year ${year}`;
};

const displayStudent = (studentObject) => {
    return `Student: ${studentObject.name}, Age: ${studentObject.age}`;
};

console.log(`===== ${programTitle} =====`);
console.log(`School: ${schoolName}`);
console.log(`School Year: ${schoolYear}`);
console.log(`Student Name: ${fullName}`);
console.log(`Student Age: ${ageValue}`);
console.log(`Course: ${course}`);
console.log(`Year Level: ${year}`);
console.log(`First Subject: ${firstSubject}`);
console.log(`Second Subject: ${secondSubject}`);
console.log(`First Grade: ${firstGrade}`);
console.log(`Second Grade: ${secondGrade}`);
console.log(`Student City: ${studentCity}`);
console.log(`Student Status: ${studentStatus}`);
console.log(`Student Hobby: ${studentHobby}`);
console.log(`Email Address: ${studentEmail}`);

const additionalSubjects = ["SPI", "Physical Education"];

const allSubjects = [...subjects, ...additionalSubjects];

const newGrades = [97, ...grades, 87];

const updatedStudent = {
    ...student,
    status: studentStatus,
    hobby: studentHobby
};

const updatedSchool = {
    ...school,
    schoolYear: schoolYear,
    program: programTitle
};

const uppercaseSubjects = subjects.map((subjectName) => {
    return subjectName.toUpperCase();
});

const improvedGrades = grades.map((grade) => {
    return grade + 5;
});

const passedGrades = grades.filter((grade) => {
    return grade >= passingScore;
});

// Filter Array 2: Grades above 90
const excellentGrades = grades.filter((grade) => {
    return grade > 90;
});

const studentContactInfo = {
    email: student.contact?.email || "No email available",
    phone: student.contact?.phone || "No phone available"
};

// Optional Chaining Object 2
const studentAddressInfo = {
    city: student.address?.city || "City not provided",
    country: student.address?.country || "Country not provided"
};

console.log(greetStudent(studentName));

console.log(`Average Grade: ${calculateAverage(grades)}`);

console.log(`Academic Status: ${checkStatus(studentScore)}`);

console.log(`Course Information: ${getFullCourse(studentCourse, studentYear)}`);

console.log(displayStudent(student));

console.log("\n===== MAP RESULTS =====");
console.log(`Uppercase Subjects: ${uppercaseSubjects}`);
console.log(`Improved Grades: ${improvedGrades}`);

console.log("\n===== FILTER RESULTS =====");
console.log(`Passed Grades: ${passedGrades}`);
console.log(`Excellent Grades: ${excellentGrades}`);

console.log("\n===== SPREAD OPERATOR RESULTS =====");
console.log(`All Subjects: ${allSubjects}`);
console.log(`New Grades: ${newGrades}`);

console.log("Updated Student:", updatedStudent);
console.log("Updated School:", updatedSchool);

console.log("\n===== OPTIONAL CHAINING RESULTS =====");
console.log(`Email: ${studentContactInfo.email}`);
console.log(`Phone: ${studentContactInfo.phone}`);
console.log(`City: ${studentAddressInfo.city}`);
console.log(`Country: ${studentAddressInfo.country}`);

console.log("\n===== FINAL STUDENT REPORT =====");

console.log(`Name: ${studentName}`);
console.log(`Course: ${studentCourse}`);
console.log(`Year Level: ${studentYear}`);
console.log(`Average Grade: ${calculateAverage(grades)}`);
console.log(`Status: ${checkStatus(studentScore)}`);
console.log(`School: ${schoolName}`);
console.log(`Teacher: ${teacher}`);
console.log(`Department: ${department}`);

console.log("\nThank you for using the Student Management System!");
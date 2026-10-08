let studentName = "Kimberly";
let passingGrade = 85;
let totalStudents = 3;

// 3 Arrays
let students = ["Kimberly", "JL", "Dailyn"];
let grades = [90, 80, 85];
let subjects = ["JavaScript", "Networking", "Database"];

if (grades[0] >= passingGrade) {
    console.log(students[0] + " passed!");
} else {
    console.log(students[0] + " failed.");
}

if (grades[1] >= 90) {
    console.log("Excellent");
} else if (grades[1] >= 75) {
    console.log("Passed");
} else {
    console.log("Failed");
}

if (totalStudents >= 3) {
    console.log("There are enough students.");
} else {
    console.log("There are only a few students.");
}

for (let i = 0; i < students.length; i++) {
    console.log("Student: " + students[i]);
}

let i = 0;

while (i < grades.length) {
    console.log("Grade: " + grades[i]);
    i++;
}
for (let subject of subjects) { console.log("Subject: " + subject); 
}
for (let subject of subjects) {
    console.log("Subject: " + subject);
}
```

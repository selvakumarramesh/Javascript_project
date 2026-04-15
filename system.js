// Load students when page loads
document.addEventListener("DOMContentLoaded", displayStudents);

let form = document.getElementById("studentForm");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let course = document.getElementById("course").value;
    let editIndex = document.getElementById("editIndex").value;

    let students = JSON.parse(localStorage.getItem("students")) || [];

    let student = {
        name: name,
        age: age,
        course: course
    };

    if (editIndex === "") {
        // CREATE
        students.push(student);
    } else {
        // UPDATE
        students[editIndex] = student;
        document.getElementById("editIndex").value = "";
    }

    localStorage.setItem("students", JSON.stringify(students));

    form.reset();

    displayStudents();
});


// READ
function displayStudents() {

    let table = document.getElementById("studentTable");

    table.innerHTML = "";

    let students = JSON.parse(localStorage.getItem("students")) || [];

    students.forEach((student, index) => {

        let row = `
            <tr>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.course}</td>
                <td>
                    <button class="edit" onclick="editStudent(${index})">
                        Edit
                    </button>

                    <button class="delete" onclick="deleteStudent(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;

        table.innerHTML += row;
    });

}


// EDIT (Load Data)
function editStudent(index) {

    let students = JSON.parse(localStorage.getItem("students"));

    document.getElementById("name").value =
        students[index].name;

    document.getElementById("age").value =
        students[index].age;

    document.getElementById("course").value =
        students[index].course;

    document.getElementById("editIndex").value = index;
}


// DELETE
function deleteStudent(index) {

    let students = JSON.parse(localStorage.getItem("students"));

    students.splice(index, 1);

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();
}
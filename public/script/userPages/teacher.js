let shortList = [];

function myFunctionTeacher(userTeachers, input){
    userTeachers = JSON.parse(userTeachers);
    shortList = userTeachers.filter((data) => 
        data.name.toLowerCase().includes(input.value.toLowerCase()) ||
        data.email.toLowerCase().includes(input.value.toLowerCase()) ||
        data.faculty.toLowerCase().includes(input.value.toLowerCase()) ||
        data.role.toLowerCase().includes(input.value.toLowerCase())
    )

    teachers = document.querySelector("#teacher_table tbody");
    teachers.innerHTML = "";
    for(const [i, teacher] of Object.entries(shortList)){
        const row = document.createElement("tr");
        const colNames = ["teacherID", "name", "email", "faculty", "role"];
        for(const colName of colNames){
            const col = document.createElement("td");
            
            col.setAttribute("id", `${colName}-${i}`);
            col.innerHTML = teacher[colName];
            row.appendChild(col);
        }
        teachers.appendChild(row);
    }
}
  
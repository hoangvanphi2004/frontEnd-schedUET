const BASE_URL = "http://localhost:8000"

const pagePath = window.location.pathname;
document.querySelectorAll("nav a").forEach((element) => {
  const tempHref = element.href;
  if (tempHref.includes(`${pagePath}`)) {
    element.classList.add("active");
  }
});

let userSchedules, userSections, userTakes, userID, DAY;

function getData(userSchedulesFromEJS, userSectionsFromEJS, userTakesFromEJS, userIDFromEJS, DAYFromEJS){
    const parser = new DOMParser();
    userSchedules = JSON.parse(parser.parseFromString(userSchedulesFromEJS, 'text/html').body.innerHTML);
    userSections = JSON.parse(parser.parseFromString(userSectionsFromEJS, 'text/html').body.innerHTML);
    userTakes = JSON.parse(parser.parseFromString(userTakesFromEJS, 'text/html').body.innerHTML);
    userID = userIDFromEJS;
    DAY = JSON.parse(parser.parseFromString(DAYFromEJS, 'text/html').body.innerHTML);
}

function showSchedule(){
    for(userSchedule of userSchedules.data){
        const startCell = document.querySelector(`.main_table table tr:nth-child(${parseInt(userSchedule.start) + 1}) td:nth-child(${userSchedule.day})`);
        startCell.setAttribute("rowspan", `${parseInt(userSchedule.end) - parseInt(userSchedule.start) + 1}`);
        startCell.innerHTML = userSchedule.title;
        startCell.style.border = "3px solid black"
        startCell.style.backgroundColor = "#c6fcff";
        for(let uselessCellIndex = parseInt(userSchedule.start) + 1; uselessCellIndex <= parseInt(userSchedule.end); uselessCellIndex++){
            const uselessCell = document.querySelector(`.main_table table tr:nth-child(${uselessCellIndex + 1}) td:nth-child(${userSchedule.day})`);
            uselessCell.style.display = "none";
        }
    }    
}

function isIntersect(x1, y1, x2, y2){
    return !((parseInt(y1) < parseInt(x2)) || (parseInt(y2) < parseInt(x1)));
}

function isConflict(section){
    for(userSchedule of userSchedules.data){
        if(section.day == userSchedule.day && isIntersect(section.start, section.end, userSchedule.start, userSchedule.end)){
            return true;
        }
    }
    return false;
}

function enterInputField(){
    let inputField = document.getElementsByClassName("main_search-history")[0];
    let inputValue = document.getElementsByClassName("main_search-input")[0].value;
    if(inputValue != ''){
        inputField.style.display = "block";
    }
}

function leaveInputField(){
    let inputField = document.getElementsByClassName("main_search-history")[0];
    inputField.style.display = "none";
}

function sectionSearch(){
    let inputField = document.getElementsByClassName("main_search-history")[0];
    let inputValue = document.getElementsByClassName("main_search-input")[0].value;
    let shortList = [];
    if(inputValue != ''){
        inputField.style.display = "block";
        for(section of userSections.data){
            if(section.title.toLowerCase().search(inputValue.toLowerCase()) >= 0 ||
            section.courseID.toLowerCase().search(inputValue.toLowerCase()) >= 0){
                shortList.push(section);
            }
        }
    }else{
        inputField.style.display = "none";
    }
    let showCourses = document.getElementsByClassName("main_search-history-list")[0];
    showCourses.textContent = '';
    for(section of shortList){
        let li = document.createElement("li");
        li.setAttribute("class", "main_search-history-item");
        let a = document.createElement("a");
        a.setAttribute("href", "#");
        a.setAttribute("onclick", `addSchedule("${section.courseID}", ${section.sectionID}, '${JSON.stringify(section)}')`);
        a.innerHTML = section.title + "</br>(" + DAY[section.day] + ", period: " + section.start + " to " + section.end + ")";
        li.appendChild(a); 
        showCourses.appendChild(li);
    }
}

async function addSchedule(courseID, sectionID, section){
    section = JSON.parse(section)
    const data = {"courseID": courseID, "sectionID": sectionID};
    if(isConflict(section)){
        alert("Môn học đã bị trùng với 1 môn khác");
    }else{
        await axios.post(`${BASE_URL}/schedules/${userID}`, data)
        location.reload();
    }
}

async function deleteSchedue(index){
    let userSchedule = userSchedules.data[index];
    const data = {"courseID": userSchedule.courseID, "sectionID": userSchedule.sectionID};
    await axios.delete(`${BASE_URL}/schedules/${userID}`, {data}) 
    location.reload();
}

async function switchToTakes(){
    for(userSchedule of userSchedules.data){
        const data = {"courseID": userSchedule.courseID, "sectionID": userSchedule.sectionID};
        await axios.delete(`${BASE_URL}/schedules/${userID}`, {data});
    }
    for(subject of userTakes.data){
        const data = {"courseID": subject.courseID, "sectionID": subject.sectionID};
        await axios.post(`${BASE_URL}/schedules/${userID}`, data);
    }
    location.reload();
}
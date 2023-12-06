const materialIDtd = document.createElement("td");
materialIDtd.id = `materialID-${i}`;
materialIDtd.textContent = receivedData[i].materialID;
temptr.appendChild(materialIDtd);

const nametd = document.createElement("td");
nametd.id = `name-${i}`;
nametd.textContent = receivedData[i].name;
temptr.appendChild(nametd);

const linktd = document.createElement("td");
linktd.id = `link-${i}`;
linktd.textContent = receivedData[i].link;
temptr.appendChild(linktd);

const courseTitletd = document.createElement("td");
courseTitletd.id = `courseTitle-${i}`;
courseTitletd.textContent = receivedData[i].courseTitle;
temptr.appendChild(courseTitletd);

const authortd = document.createElement("td");
authortd.id = `author-${i}`;
authortd.textContent = receivedData[i].author;
temptr.appendChild(authortd);

const publishertd = document.createElement("td");
publishertd.id = `publisher-${i}`;
publishertd.textContent = receivedData[i].publisher;
temptr.appendChild(publishertd);

const publishYeartd = document.createElement("td");
publishYeartd.id = `publishYear-${i}`;
publishYeartd.textContent = receivedData[i].publishYear;
temptr.appendChild(publishYeartd);

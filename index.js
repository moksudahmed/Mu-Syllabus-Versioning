// api url
const api_url = 
      "http://77.68.120.8:1337/syllabuslist";
var moduleData = [];
var syllabusCode ='';  
var moduleCode ='';

function readFile(){
    console.log("Read File Working");
}
readFile();
// Defining async function
async function getapi(url) {
    
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();
   
    if (response) {
       // hideloader();
       console.log("Success")
    }
    show(data);
}
// Calling that async function
getapi(api_url);
  
// Function to hide the loader
// function hideloader() {
//     document.getElementById('loading').style.display = 'none';
// }
// Function to define innerHTML for HTML table
async function getModuleCode() {
    const syllabus = document.getElementById("selectedSyllabusCode").value;
  
    const url = `http://77.68.120.8:1337/moduleist?id=${syllabus}`;
  
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();
    
    if (response) {
       // hideloader();
       console.log("Success")
    }
    console.log(data);
    syllabusCode = syllabus;
    loadModuleCode(data)    
  }
  
const show = (data) => {

    let tab = 
        `<select id="selectedSyllabusCode" onchange="getModuleCode()">`;    
    // Loop to access all rows 
    for (let r of data) {
        tab += `<option>${r.syllabusCode} </option>`;
    }    
    tab +=`</select>`;

    // Setting innerHTML as tab variable
    document.getElementById("syllabus-code").innerHTML = tab;
}

const getCourseDetails = () =>{
  //  alert("Selected")
    const x =  document.getElementById("selectedModuleCode").value;
    const module = moduleData.find(({moduleCode})=> moduleCode === x);
    moduleCode = x;
    document.getElementById("module-name").value = module['mod_name'];
    document.getElementById("credit-hour").value = module['mod_creditHour'];
    
    const lab = module['mod_type'];   
    if (lab === "Lab"){ 
        document.getElementById("lab").checked = true;
        document.getElementById("nonlab").checked = false;
    }
    else{
        document.getElementById("lab").checked = false;
        document.getElementById("nonlab").checked = true;
    }

    const major = module['mod_mejor'];
    if (major === "yes"){ 
        document.getElementById("major").checked = true;
        document.getElementById("nonmajor").checked = false;
    }
    else{
        document.getElementById("major").checked = false;
        document.getElementById("nonmajor").checked = true;
    }

    const labIncluded = module['mod_labIncluded'];
    if (labIncluded === "yes"){ 
        document.getElementById("lab-included-yes").checked = true;
        document.getElementById("lab-included-no").checked = false;
    }
    else{
        document.getElementById("lab-included-yes").checked = false;
        document.getElementById("lab-included-no").checked = true;
    }
    
    const group = module['mod_group'];
    loadGroup(group);   
}

const loadModuleCode = (data) => {

     let tab = 
         `<select id="selectedModuleCode" onchange="getCourseDetails()">`;    
     // Loop to access all rows 
     for (let r of data) {
         tab += `<option>${r.moduleCode} </option>`;
     }
     
     tab +=`</select>`;
 
     // Setting innerHTML as tab variable
     document.getElementById("module-code").innerHTML = tab;
     moduleData = data;
 }

const pushItem = (item) =>{
    return group = item['mod_group'];
}

const loadGroup = (group) =>{    
    let tab =`<select style="width:auto;" name="group-item" id="group-item" onchange = getGroupUpdates(this.value)>`+    
        `<option>${group}</option>`+   
        `</select><br>`
    ;       

    let _groupItems = [];

    moduleData.forEach((item)=>{
        if(!_groupItems.find((x)=> x === item['mod_group']))
            _groupItems.push(item['mod_group']);
    });

    document.getElementById("group").innerHTML = tab;
    
    let select = document.getElementById("group-item");    
    select.options.length = 1;
    for (i=0; i<_groupItems.length; i++) 
	{
	    select.options[select.length] = new Option(_groupItems[i], _groupItems[i]);
	}
   

}


var modeType = '';
const changeModuleTypeYes = () =>{
    document.getElementById("lab").checked = true;
    document.getElementById("nonlab").checked = false;
    modeType = 'lab';    
}

const changeModuleTypeNo = () =>{
    document.getElementById("lab").checked = false;
    document.getElementById("nonlab").checked = true;
    modeType = 'None Lab';
}

let labInclude ='';
const changeLabInclude = () =>{
    document.getElementById("lab-included-yes").checked = true;
    document.getElementById("lab-included-no").checked = false;
    labInclude ='yes';
}
const changeLabNotInclude = () =>{
    document.getElementById("lab-included-yes").checked = false;
    document.getElementById("lab-included-no").checked = true;
    labInclude ='no';
}

let major ='';
const changeMajor = () =>{
    document.getElementById("major").checked = true;
    document.getElementById("nonmajor").checked = false;
    major ='yes';
}
const changeNonMajor = () =>{
    document.getElementById("major").checked = false;
    document.getElementById("nonmajor").checked = true;
    major ='no';
}


let changeName = '';
const getUpdateName = (val) =>{
    //alert(val)
    changeName = val;
}

let credit = 0;
const getCreditHour = (val) =>{
   // alert(val)
   credit = val;
}

let group = '';
const getGroupUpdates = (val) =>{
   // alert(val)
   group = val;
}



const updateData = () =>{

    var obj = new Object();
    obj.syllabusCode = syllabusCode;
    obj.moduleCode = moduleCode;
    if(changeName) obj.mod_name = changeName;
    if(credit) obj.mod_creditHour = credit;    
    if(modeType) obj.mod_type = modeType;
    if(labInclude) obj.mod_labIncluded = labInclude;
    if(major) obj.mod_mejor = major;    
    if(group) obj.mod_group = group;    
    
    var data = JSON.stringify(obj);
    
    //makeRequest(data);
    updateSyllabus(obj);
    //console.log(data);
    //alert(data);
    
   
}

function updateSyllabus(obj){

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', 'http://77.68.120.8:1337/moduleupdate', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = () => { // Call a function when the state changes.
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        // Request finished. Do processing here.
    }
    }        
//    xhr.send("foo=bar&lorem=ipsum");
    xhr.send(`syllabusCode=${obj.syllabusCode}&moduleCode=${obj.moduleCode}&mod_name=${obj.mod_name}&hour=${obj.mod_creditHour}&type=${obj.mod_type}&labIncluded=${obj.mod_labIncluded}&major=${obj.mod_mejor}&group=${obj.mod_group}`);
    alert("Updated");
}
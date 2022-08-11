// api url
const syllabusCode = 'CSE-V5';
const api_url2 = 
      `http://77.68.120.8:1337/moduleist?id=${syllabusCode}`;
  console.log(api_url2);
// Defining async function
async function getapi(url) {
    
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
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
function show(data) {
    let tab = 
        `<select>`;
    
    // Loop to access all rows 
    for (let r of data) {
        tab += `<option>${r.title} </option>`;
    }
    
    tab +=`</select>`;

    console.log(tab);
    // Setting innerHTML as tab variable
    document.getElementById("module-code").innerHTML = tab;
}
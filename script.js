let myLeads = [];
const myInput = document.getElementById("input-el");
const inputBtn = document.querySelector("#input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const LeadsfromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if(LeadsfromLocalStorage) {
    myLeads = LeadsfromLocalStorage
    logOut(myLeads)
}

tabBtn.addEventListener("click", function () {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url);
        console.log(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        logOut(myLeads)
    })
})

deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear();
    myLeads = [];
    logOut(myLeads);
})


function logOut(leads) {
    let listItems = "";
    for(i = 0; i < leads.length; i++){
        listItems += `<li> 
                        <a href="${leads[i]}" target="_blank">
                        ${leads[i]}
                        </a>
                    </li>`
    }
    ulEl.innerHTML = listItems
}

function logIt () {
    myLeads.push(myInput.value);
    myInput.value = " ";
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    logOut(myLeads);
};

inputBtn.addEventListener("click", logIt);


// crud - create, read, update, delete
//application -> button -submit

let form = document.querySelector("#form");
const textInput = document.querySelector("#textInput");
const msg = document.querySelector("#msg");
//select all the data of form
const dateInput = document.querySelector("#dateInput");
const textArea = document.querySelector("#textarea");
let tasks = document.querySelector('#tasks');
const add = document.querySelector("#add");

//to trigger submit
form.addEventListener('submit', (e)=>{
 e.preventDefault(); //to stop refreshing the page
 formValidation();
 
})

let formValidation = ()=>{

    if(textInput.value === ""){
        msg.innerHTML = "Task cannot be blank"
    }else{
        console.log('success!');
        msg.innerHTML = "";
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        // simulating button click
        add.click();

        // immidiately invoked function exp 
        // IIFE - can run only once, anonymus, everytime it's success
        //if blank won't go back automatically
        (()=>{
            add.setAttribute("data-bs-dismiss", "");
        })()

    }
}

//accept and store data from form
let data = [];

//convert obj to arr, ans store obj inside arr
let acceptData = ()=>{
    data.push({
        text : textInput.value,
        date: dateInput.value,
       description: textArea.value
    })

    //to store data
    //store data arr inside local storage - key, value pair
    //if not use JSON.stringyfy - the data will store as object, can't access instead to access
    //data stored in local storage use this
 localStorage.setItem("data",JSON.stringify(data))
 //to get data -> .getItem
 createTasks();
 
}

//upload on screen
let createTasks = (e)=>{

    //***** x target all objects, y is serial num start from 0,1,..
    //x - individually targets all of the data one by one
    //+= can't remove previous val

    //every time we run this function, clear up all tasks then add this
    tasks.innerHTML = "";
    data.map((x,y)=>{
        return  tasks.innerHTML += `
   
        
        <div id=${y}>
         <span class = "fw-bold">${x.text}</span>
         <span class = "small text-secondary">${x.date}</span>
         <p>${x.description}</p>
         
         <span class= "options">
         <i onClick = "editTask(this)" data-bs-toggle ="modal" data-bs-target ="#form" class = "fas fa-edit"></i>
         <i onClick = "deleteTask(this); createTasks()" class = "fas fa-trash-alt"></i>
         </span>
         </div>
         `
        //  every time we delete single card, we will get updated numbers of card
    })
  
    resetForm();
}

let deleteTask = (e)=>{
    e.parentElement.parentElement.remove();
    data.splice(  e.parentElement.parentElement.id,1);
    localStorage.setItem("data",JSON.stringify(data))
}

let editTask = (e)=>{
    let selectedTask = e.parentElement.parentElement;
    // console.log(selectedTask)
    textInput.value = selectedTask.children[0].innerHTML ;
    dateInput.value = selectedTask.children[1].innerHTML;
    textArea.value = selectedTask.children[2].innerHTML ;

    //to remove older one
     deleteTask(e);

}
let resetForm = ()=>{
    textInput.value = "";
    dateInput.value = "";
    textArea.value = "";
}

//every time we refresh page, from local stroage data will be back to arr
//match get and set key value 
(()=>{
    //convert sring data to array of objects
    data = JSON.parse(localStorage.getItem('data')) || [];
    createTasks();
    // console.log(data);
})()
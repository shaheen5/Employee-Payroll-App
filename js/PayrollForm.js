//add event listener when document gets loaded
window.addEventListener('DOMContentLoaded',()=>{
    var employeePayrollData = new EmployeePayrollData();
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input',function(){        //add listener at name input
        if(name.value.length == 0){
            textError.textContent="";
            return;
        }
        try{
            employeePayrollData.name = name.value;
            textError.textContent = "";
        }catch(e){
            textError.textContent = e;
        }
    });

    const salary = document.querySelector('#salary');
    const outputSalary = document.querySelector('.salary-output');
    outputSalary.textContent = salary.value;
    salary.addEventListener('input',function(){       //add listener at salary input
          outputSalary.textContent = salary.value;
        });

    let day = document.querySelector('#day');
    let month = document.querySelector('#month');
    let year = document.querySelector('#year');
    const dateError = document.querySelector('.date-error');

    day.addEventListener('click',function(){            //add listener at date input
        month.addEventListener('click',function(){
            year.addEventListener('click',function(){
                try{
                    let date = day.value + " " + month.value + " " + year.value;
                    employeePayrollData.startDate = new Date(Date.parse(date));
                    dateError.textContent = "";
                }catch(e){
                    dateError.textContent = e;
                }
            })
        })
    });
});

//save function called on submit
const save = ()=> {
    try{
        let employeePayrollData = createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);
    }catch(e){
        return;
    }
}

//function to populate employee object with html form data
const createEmployeePayroll = ()=> {
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValueById('#name');
    }catch(e){
        setTextValue('.text-error',e);
        throw e;
    }
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#notes');
    let date = getInputValueById('#day')+" "+getInputValueById('#month')+" "+
               getInputValueById('#year');
    employeePayrollData.startDate = new Date(Date.parse(date));
    employeePayrollData.id = employeePayrollData.startDate.getTime();
    alert(employeePayrollData.toString());
    return employeePayrollData;
}
//function to get html form values of radio buttons  
const getSelectedValues = (propertyValue)=>{
    let allItems = document.querySelectorAll(propertyValue);
    let selectItems = [];
    allItems.forEach(item=>{
        if(item.checked) selectItems.push(item.value);
    });
    return selectItems;
}

//function to get form values by Id
const getInputValueById = (id=>{
    let value = document.querySelector(id).value;
    return value;
});

//create and update local storage with employee payroll object
function createAndUpdateStorage(employeePayrollData){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList != undefined){
        employeePayrollList.push(employeePayrollData);
    }else{
        employeePayrollList = [employeePayrollData];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
}

//reset form function to reset all elements in html form
const resetForm=()=>{
    setValue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#notes','');
    setValue('#day','1');
    setValue('#month','January');
    setValue('#year','2021'); 
}

const unsetSelectedValues = (propertyValue)=>{
    let allItems=document.querySelectorAll(propertyValue);
    allItems.forEach(item=>{
        item.checked = false;
    });
}

const setValue=(id,value)=>{
    const element = document.querySelector(id);
    element.value = value;
}
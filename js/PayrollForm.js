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

    const day = document.querySelector('#day');
    const month = document.querySelector('#month');
    const year = document.querySelector('#year');
    const yearsArray = ['January','February','March','April','May','June','July','August','September',
                        'October','November','December'];
    const dateError = document.querySelector('.date-error');

    day.addEventListener('click',function(){            //add listener at date input
        month.addEventListener('click',function(){
            year.addEventListener('click',function(){
                try{
                    const startDate = new Date(year.value,yearsArray.indexOf(month.value),day.value);
                    console.log(startDate);
                    employeePayrollData.startDate = startDate;
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
    let date = getInputValueById('#day') + " " + getInputValueById('#month')+
               " "+getInputValueById('#year');
    employeePayrollData.date = Date.parse(date);
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
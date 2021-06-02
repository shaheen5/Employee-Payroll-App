let isUpdate = false;
let employeePayrollObj = {};
//add event listener when document gets loaded
window.addEventListener('DOMContentLoaded',()=>{
    const name = document.querySelector('#name');
    name.addEventListener('input',function(){        //add listener at name input
        if(name.value.length == 0){
            setTextValue('.text-error',"");
            return;
        }
        try{
            checkName(name.value);
            setTextValue('.text-error',"");
        }catch(e){
            setTextValue('.text-error',e);
        }
    });

    const salary = document.querySelector('#salary');
    setTextValue('.salary-output',salary.value);
    salary.addEventListener('input',function(){       //add listener at salary input
        setTextValue('.salary-output',salary.value);
    });

    const date = document.querySelector('#date');
    date.addEventListener('input',function(){
        const startDate = new Date(Date.parse(getInputValueById('#day')+" "+
                                              getInputValueById('#month')+" "+
                                              getInputValueById('#year')));
        try{
            checkStartDate(startDate);
            setTextValue('.date-error',"");
        }catch(e){
            setTextValue('.date-error',e);
        }
    });
    document.querySelector('#cancelButton').href = site_properties.home_page;
    checkForUpdate();   
});

//save function called on submit
const save = (event)=> {
    event.preventDefault();
    event.stopPropagation();
    try{
        setEmployeePayrollObject();
        if (site_properties.use_local_storage.match("true")){
            createAndUpdateStorage();
            resetForm();
            window.location.replace(site_properties.home_page);
        }else{
            createOrUpdateEmployeePayroll();
        }
        
    }catch(e){
        return;
    }
}
//populate employee payroll object from UI
const setEmployeePayrollObject = ()=>{
    if (!isUpdate && site_properties.use_local_storage.match("true")){
        employeePayrollObj.id = createNewEmployeeId();
    } 
    employeePayrollObj._name = getInputValueById('#name');
    employeePayrollObj._profilePic = getSelectedValues('[name=profilePic]').pop();
    employeePayrollObj._gender = getSelectedValues('[name=gender]').pop();
    employeePayrollObj._department = getSelectedValues('[name=department]');
    employeePayrollObj._salary = getInputValueById('#salary');
    employeePayrollObj._note = getInputValueById('#notes');
    let date = getInputValueById('#day')+" "+getInputValueById('#month')+" "+
               getInputValueById('#year');
    employeePayrollObj._startDate = new Date(Date.parse(date));
}

//function to populate employee object with html form data
const createEmployeePayroll=()=> {
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

//function to set text value
const setTextValue = (id,value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

//create and update local storage with employee payroll object
const createAndUpdateStorage = ()=>{
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList){
        let employeePayrollData = employeePayrollList
                                  .find(empData => empData.id == employeePayrollObj.id);
        if (!employeePayrollData) {
            employeePayrollList.push(employeePayrollObj);
        }else {
            const index = employeePayrollList
                          .map(empData=>empData.id)
                          .indexOf(employeePayrollData.id);
            employeePayrollList.splice(index,1,employeePayrollObj);
        }
    }else{
        employeePayrollList = [employeePayrollObj];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
}

//create new employee id
const createNewEmployeeId = ()=> {
    let empId = localStorage.getItem('EmployeeID');
    empId = !empId ? 1 : (parseInt(empId)+1).toString();
    localStorage.setItem('EmployeeID',empId);
    return empId;
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

//check for update
const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false ;
    if (!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}

//set updated values
const setForm = () => {
    setValue('#name',employeePayrollObj._name);
    setSelectedValues('[name=profile]',employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]',employeePayrollObj._gender);
    setSelectedValues('[name=department]',employeePayrollObj._department);
    setValue('#salary',employeePayrollObj._salary);
    setTextValue('.salary-output',employeePayrollObj._salary);
    setValue('#notes',employeePayrollObj._note);
    let date = stringify(employeePayrollObj._startDate).split(" ");
    setValue('#day',date[0]);
    setValue('#month',date[1]);
    setValue('#year',date[2]);
}

const setSelectedValues = (propertyValue,value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item =>{
        if(Array.isArray(value)){
            item.checked = true;
        }
        else if (item.value === value)
            item.checked = true;
    });
}

//create or update employee payroll with json server
const createOrUpdateEmployeePayroll=()=>{
    let postURL = site_properties.server_url;
    let methodCall = "POST";
    makeServiceCall(methodCall,postURL,true,employeePayrollObj)
        .then(responseText => {
            resetForm();
            window.location.replace(site_properties.home_page);
        })
        .catch(error => {
            throw error;
        });
}
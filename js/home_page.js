//declare global variable for employee payroll list
let employeePayrollList; 
window.addEventListener('DOMContentLoaded', () => {
    employeePayrollList = getEmployeePayrollDataFromLocalStorage();
    document.querySelector('.emp-count').textContent = employeePayrollList.length;
    createInnerHTML();
    localStorage.removeItem('editEmp');
});

//get Employee Data from local storage
const getEmployeePayrollDataFromLocalStorage = () => {
    return localStorage.getItem('EmployeePayrollList') ?
                        JSON.parse(localStorage.getItem('EmployeePayrollList')) : [] ;
}

//Template literal ES6 feature 
const createInnerHTML = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>"+
                       "<th>Salary</th><th>start Date</th><th>Actions</th>";
    if ( employeePayrollList.length == 0 ) return;
    let innerHtml = `${headerHtml}`;
    
    for  ( const employeePayrollData of employeePayrollList){
        innerHtml = `${innerHtml}
         <tr>
             <td>
                 <img class="profile" alt="" src="${employeePayrollData._profilePic}">
             </td>
             <td>${employeePayrollData._name}</td>
             <td>${employeePayrollData._gender}</td>
             <td>${getDeptHtml(employeePayrollData._department)}</td>
             <td>${employeePayrollData._salary}</td>
             <td>${stringifyDate(employeePayrollData._startDate)}</td>
             <td> 
                 <img id="${employeePayrollData._id}" onclick ="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
                 <img id="${employeePayrollData._id}" alt="Edit" onclick="update(this)" src="../assets/icons/create-black-18dp.svg">
             </td>
         </tr>
         `;
    }
     document.querySelector('#table-display').innerHTML=innerHtml;
}

//populate all department from department list
const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList){
        deptHtml = `${deptHtml} <div class ='dept-label'>${dept}</div>`
    }
    return deptHtml;
}

// remove employee details from payroll list
const remove = (node)=> {
    let employeePayrollData = employeePayrollList.find(empData=>empData._id == node.id);
    if (!employeePayrollData) return;
    const index = employeePayrollList
                  .map(empData=>empData._id)
                  .indexOf(employeePayrollData._id);
    employeePayrollList.splice(index,1);
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
    document.querySelector('.emp-count').textContent = employeePayrollList.length;
    createInnerHTML();
}
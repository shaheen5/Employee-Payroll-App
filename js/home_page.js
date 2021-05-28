window.addEventListener('DOMContentLoaded', () => {
    createInnerHTML();
});

//Template literal ES6 feature 
const createInnerHTML = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>"+
                       "<th>Salary</th><th>start Date</th><th>Actions</th>";
    let innerHtml = `${headerHtml}`;
    let employeePayrollList = createEmployeePayrollJSON();

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
             <td>${employeePayrollData._startDate}</td>
             <td> 
                 <img name="${employeePayrollData._id}" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
                 <img name="${employeePayrollData._id}" alt="Edit" onclick="update(this)" src="../assets/icons/create-black-18dp.svg">
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

//create Employee Payroll JSON objects
const createEmployeePayrollJSON = () => {
    let employeePayrollList = [
        {
            _name : 'Shaheen Miya',
            _gender : 'Female',
            _department : ['Engineering' ,
                           'Finance'],
            _salary : '5000000',
            _startDate : '29 Oct 2019',
            _note : '',
            _id : new Date().getTime(),
            _profilePic : '../assets/profile-images/Ellipse -7.png'
        },
        {
            _name : 'Amar Kumar',
            _gender : 'Male',
            _department : ['HR' ,
                           'Finance'],
            _salary : '4000000',
            _startDate : '29 Oct 2019',
            _note : '',
            _id : new Date().getTime() + 1,
            _profilePic : '../assets/profile-images/Ellipse -2.png'
        }
    ];
    return employeePayrollList;
}
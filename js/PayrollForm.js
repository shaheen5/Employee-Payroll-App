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
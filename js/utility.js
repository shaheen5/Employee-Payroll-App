const stringifyDate = (date)=>{
    const options = {year :'numeric', month:'short', day:'numeric'}
    const newDate = !date ? "undefined" :
                    new Date(Date.parse(date)).toLocaleDateString('en-GB',options);
    return newDate;
}
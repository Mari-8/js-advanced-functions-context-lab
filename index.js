/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function createEmployeeRecord(empData) {
    const emp = {
        firstName: empData[0], 
        familyName: empData[1], 
        title: empData[2], 
        payPerHour: empData[3], 
        timeInEvents: [], 
        timeOutEvents: [] 
    }
    return emp
}

function createEmployeeRecords(emps) {
    let newEmps = [] 
    for (let i=0; i < emps.length; i++) {
        let newEmp = createEmployeeRecord(emps[i])
        newEmps.push(newEmp)
    }
    return newEmps
}

function createTimeInEvent(dateNTime) {
    const timeIn = {
        type: "TimeIn", 
        date: dateNTime.split(" ")[0], 
        hour: parseInt(dateNTime.split(" ")[1])
    }
    this.timeInEvents.push(timeIn)
    
    return this
}

function createTimeOutEvent(dateNTime) {
    const timeOut = {
        type: "TimeOut", 
        date: dateNTime.split(" ")[0], 
        hour: parseInt(dateNTime.split(" ")[1])
    }
    this.timeOutEvents.push(timeOut) 

    return this
}

function hoursWorkedOnDate(dateNTime) {
    let timeIn = this.timeInEvents.find(function(event) {
        return event.date === dateNTime
    })
    let timeOut = this.timeOutEvents.find(function(event) {
        return event.date === dateNTime
    })
    return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(dateNTime) {
    let hoursWorked = hoursWorkedOnDate.call(this, dateNTime)
    let hoursParsed = parseInt(hoursWorked)
    return (this.payPerHour * hoursParsed)
}

function findEmployeeByFirstName(emps, name) {
    return emps.find(emp => emp.firstName === name)
}
const reducer = (accum, currVal) => accum + currVal

function calculatePayroll(emps) {
    let total = [] 

    for(let i=0; i < emps.length; i++) {
        let partial = allWagesFor.call(emps[i]) 
        total.push(partial)
    }
    return total.reduce(reducer, 0)
}
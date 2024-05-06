// const baseUrl = 'http://localhost:8080/api/v1/tsam/tenant/7ca2664b-f379-43db-bdf9-7fdd40707219'
const baseUrl = 'https://tsm.swabhavtechlabs.com/api/v1/tsam/tenant/7ca2664b-f379-43db-bdf9-7fdd40707219'
const loginUrl = `${baseUrl}/login`
const timesheetUrl = `${baseUrl}/new-timesheet/limit/40/offset/0`
let token = ""

function getFormattedDate(date) {
  const d = new Date(date)
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

async function getTodayTimesheet() {
  const currentDate = getFormattedDate(new Date())
  const credentialID = "73498823-db71-4f71-8705-fdba95b87445"

  if (token == "") {
    await login()
  }

  fetch(`${timesheetUrl}?fromDate=${currentDate}&toDate=${currentDate}&credentialID=${credentialID}`, {
    method: 'GET',
    mode: "cors",
    headers: { 'token': token },
    contentType: 'application/json',
  }).then((result) => {
    return result.json()
  }).then((data) => {
    addTimesheetToView(data)
  }).catch((err) => {
    console.error(err);
  })
}

function addTimesheetToView(timesheets) {
  console.log(timesheets);
  const tbody = document.getElementById('timesheet-body');

  timesheets.forEach((timesheet, index) => {
    let activityRows = []
    const row = document.createElement('tr');
    row.classList.add('align-middle')

    const cellOne = document.createElement('td');
    cellOne.textContent = index + 1;
    cellOne.rowSpan = timesheet.activities.length
    row.appendChild(cellOne);

    const cellTwo = document.createElement('td');
    cellTwo.textContent = getFormattedDate(timesheet.createdAt);
    cellTwo.rowSpan = timesheet.activities.length
    row.appendChild(cellTwo);


    timesheet.activities.forEach((activity, index) => {
      if (timesheet.activities.length > 1 && index > 0) {
        const activityRow = document.createElement('tr');
        activityRow.classList.add('align-middle')

        const cellThree = document.createElement('td');
        cellThree.innerHTML = activity.activity;
        activityRow.appendChild(cellThree);

        if (!activity.isCompleted) {
          const completeButton = document.createElement('button')
          completeButton.textContent = 'Mark complete'
          completeButton.classList.add('btn', 'btn-light')
          completeButton.addEventListener(('click'), markActivityCompleted)

          const cellFour = document.createElement('td');
          cellFour.appendChild(completeButton);
          activityRow.appendChild(cellFour);
        } else {
          const cellFour = document.createElement('td');
          cellFour.textContent = "Activity completed";
          activityRow.appendChild(cellFour);
        }

        activityRows.push(activityRow)
      } else {
        const cellThree = document.createElement('td');
        cellThree.innerHTML = activity.activity;
        row.appendChild(cellThree);

        if (!activity.isCompleted) {
          const completeButton = document.createElement('button')
          completeButton.textContent = 'Mark complete'
          completeButton.classList.add('btn', 'btn-light')
          completeButton.addEventListener(('click'), markActivityCompleted)

          const cellFour = document.createElement('td');
          cellFour.appendChild(completeButton);
          row.appendChild(cellFour);
        } else {
          const cellFour = document.createElement('td');
          cellFour.textContent = "Activity completed";
          row.appendChild(cellFour);
        }
      }
    })

    // Append the row to the tbody
    tbody.appendChild(row);

    activityRows.forEach((activityRow) => {
      tbody.appendChild(activityRow);
    })
  });
}

function markActivityCompleted() {
  console.log("button clicked");
}

async function login() {
  return new Promise((resolve, reject) => {
    const body = {
      role: {
        id: "e42ad2bc-b681-4407-b9fa-e6eb3373bf2f"
      },
      email: "shailesh@swabhavtechlabs.com",
      password: "boriNgTes1@"
    }

    fetch(`${loginUrl}`, {
      method: 'POST',
      mode: "cors",
      contentType: 'application/json',
      body: JSON.stringify(body),
    }).then((result) => {
      return result.json()
    }).then((data) => {
      console.log(data);
      token = data.token
      resolve()
    }).catch((err) => {
      console.error(err);
      reject()
    })
  })
}

getTodayTimesheet()
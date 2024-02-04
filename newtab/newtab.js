const setCurrentTime = () => {
  const timeElement = document.getElementById("current-time")
  let d = new Date()
  timeElement.innerHTML = d.toLocaleTimeString()

  setInterval(() => {
    timeElement.innerHTML = d.toLocaleTimeString()
  }, 1000)
}

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]

const setCurrentDate = () => {
  const dateElement = document.getElementById("current-date")
  let d = new Date()
  // dateElement.innerHTML = `${daysOfWeek[d.getDate()] + ", " +
  //   months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear()}`
  dateElement.innerHTML = d.toDateString()
}

setCurrentTime()
setCurrentDate()
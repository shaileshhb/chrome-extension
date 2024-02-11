const setCurrentTime = () => {
  const timeElement = document.getElementById("current-time")
  let d = new Date()
  addGreeting(d.getHours())
  
  timeElement.innerHTML = d.toLocaleTimeString()

  setInterval(() => {
    let d = new Date()
    addGreeting(d.getHours())

    const timeElement = document.getElementById("current-time")
    timeElement.innerHTML = d.toLocaleTimeString()
  }, 1000)
}

const setCurrentDate = () => {
  const dateElement = document.getElementById("current-date")
  let d = new Date()
  dateElement.innerHTML = d.toDateString()
}

function addGreeting(currentHour) {
  let greeting = ""
  if (currentHour >= 5 && currentHour < 12) {
    greeting = 'Good morning, Shailesh!';
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = 'Good afternoon, Shailesh!';
  } else {
    greeting = 'Good evening, Shailesh!';
  }

  const greetingElement = document.getElementById("greetings")
  greetingElement.innerHTML = greeting
}

setCurrentTime()
setCurrentDate()
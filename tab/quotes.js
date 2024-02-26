const quotesUrl = 'https://api.api-ninjas.com/v1/quotes?category='

function getQuote(category) {
  fetch(`${quotesUrl}${category}`, {
    method: 'GET',
    headers: { 'X-Api-Key': '7iGs5S/H7/ZulZbrzFo3iQ==7vRHZgjGusDW5Mc3' },
    contentType: 'application/json',
  }).then((result) => {
    return result.json()
  }).then((data) => {
    const quote = document.getElementById("quote")
    quote.innerHTML = data[0].quote
  }).catch((err) => {
    console.error(err);
  })
}

var categories = [
  "amazing",
  "architecture",
  "communication",
  "computers",
  "cool",
  "courage",
  "dreams",
  "education",
  "experience",
  "failure",
  "faith",
  "family",
  "fear",
  "fitness",
  "forgiveness",
  "friendship",
  "funny",
  "future",
  "good",
  "great",
  "happiness",
  "health",
  "humor",
  "inspirational",
  "knowledge",
  "leadership",
  "learning",
  "life",
  "money",
  "morning",
  "movies",
  "success"]

var index = Math.floor(Math.random() * categories.length)
getQuote(categories[index])
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
let addToy = false

let TOYS = []

getToys()
  .then(() => renderToys(TOYS))

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

// add event listener to create toy form
toyForm.addEventListener('submit', event => {
  let newToy = {}
  newToy.name = event.target.name.value
  newToy.image = event.target.image.value
  newToy.likes = 0
  // addToyOnServer(newToy)
  addToyOnServer(newToy)
})

// post new toy to server
function addToyOnServer (toy) {
	return fetch(`http://localhost:3000/toys`, {
  	method: 'POST',
		headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
		body: JSON.stringify(toy)
	}).then(resp => resp.json())
}

// fetch toys from server
function getToys () {
  return fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
      .then(toys => TOYS = toys)
}

// on page load, display cards for all toys with`<div class="card">` in toy collection div.
function renderToy (toy) {
  let newCard = document.createElement('div')
  newCard.className = 'card'
  newCard.innerHTML = `<h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p class='toy-likes'>${toy.likes} likes</p>
  <button class="like-btn">Like <3</button>`
  toyCollection.append(newCard)

  let likeBtn = newCard.querySelector('.like-btn')
  let toyLikes = newCard.querySelector('.toy-likes')

  likeBtn.addEventListener('click', () => {
    updateLikes(toy)
    toyLikes.innerText = `${toy.likes} likes`
  })
}

// render all cards
function renderToys (toys) {
  toys.forEach(toy => renderToy(toy))
}

//update Likes ON SERVER
function updateLikes (toy) {
  toy.likes++
  return fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Accept: "application/json" },
    body: JSON.stringify(toy)
  }).then(resp => resp.json())
}

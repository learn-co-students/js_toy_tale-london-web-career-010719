const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollectionEl = document.querySelector('#toy-collection')
const TOYURL = 'http://localhost:3000/toys/'
let addToy = false


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

document.addEventListener('DOMContentLoaded', () => {
  drawToys()
})

// YOUR CODE HERE

function getToys() {
  return fetch(TOYURL)
    .then(resp => resp.json())
};


function drawToy(toy) {
  const toyCardEl = document.createElement('div')
  toyCardEl.className = 'card'
  toyCardEl.innerHTML = `
                <h2>${toy.name}</h2>
                <img src=${toy.image} class="toy-avatar" />
                <ul id= comments-${toy.id}>
                ${toy.comments.map(comment => `<li>${comment}</li>`).join(' ')} 
                </ul>
                <p id="likes-${toy.id}">${toy.likes} Likes</p>
                <button class="like-btn">Upvote <3</button>`

  toyCollectionEl.append(toyCardEl)

  likeBtn = toyCardEl.querySelector('.like-btn')
  likes = toyCardEl.querySelector('p')

  likeBtn.addEventListener('click', function (event) {
    likeToy(toy)
  })
};

function drawToys() {
  toyCollectionEl.innerHTML = ''
  getToys()
    .then(toys => toys.forEach(toy => drawToy(toy))
    )
};

toyForm.addEventListener('submit', function (event) {
  event.preventDefault()
  if (event.target.name.value === "" || event.target.name.value === "") {
    alert("name or value must not be blank")
  } else {
    addNewToy(event)
    event.target.reset()
    document.querySelector('#add.toy.form').reset()
  }

})

function addNewToy(event) {
  const newToy = { name: event.target.name.value, image: `${event.target.image.value}`, likes: 0 }
  // submitbutton.classList.add('loading')
  addToyToDb(newToy)
    .then(newToyFromDB => {
      drawToy(newToyFromDB)
    })
};

function addToyToDb(toy) {
  const options =
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toy)
  }
  return fetch(TOYURL, options)
    .then(resp => resp.json())
}

function likeToy(toy) {
  toy.likes++
  document.querySelector('#likes-' + toy.id).innerHTML = toy.likes + ' Likes'
  const options =
  {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toy)
  }
  fetch(TOYURL + `${toy.id}`, options)
    .then(resp => resp.json())
}


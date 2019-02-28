const toyUrl = "http://localhost:3000/toys"
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyContainer = document.querySelector('#toy-collection')
let addToy = false

document.addEventListener("DOMContentLoaded", function () {
  displayToyList()
});

function fetchToys() {
  return fetch(toyUrl)
    .then(res => res.json())
}

function writeToy(toy) {
  const toyEl = document.createElement('div')
  toyEl.className = 'card'
  toyEl.dataset.id = toy.id
  toyEl.innerHTML = `
    <h2>${toy.name}</h2>
    <img class="toy-avatar" src="${toy.image}" >
    <p>${toy.likes} Likes</p>
    <button class="like-btn">Like <3</button>
  `
  toyContainer.append(toyEl)
  toyEl.querySelector('button').addEventListener('click', () => {
    updateToy(likeToy(toy))
  })
}

function writeToys(toys) {
  for (const toy of toys) { writeToy(toy) }
}

function displayToyList() {
  toyContainer.innerHTML = ''
  fetchToys()
    .then(writeToys)
}

function addToyToList(name, image) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "name": name,
      "image": image,
      "likes": 0
    })
  }
  fetch(toyUrl, options)
    .then(res => res.json())
    .then(toy => writeToy(toy))
}

function likeToy(toy) {
  toy.likes += 1
  findToyElement(toy).querySelector('p').innerText = `${toy.likes} Likes`
  return toy
}

function updateToy(toy) {
  const url = (toyUrl + `/${toy.id}`)
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toy)
  }
  return fetch(url, options)
    .then(res => res.json())
}

function findToyElement(toy) {
  return document.querySelector( `[data-id='${toy.id}']`)
}


addBtn.addEventListener('click', () => {
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.querySelector('form').addEventListener('submit', event => {
      event.preventDefault()
      addToyToList(event.target.name.value, event.target.image.value)
    })
  } else {
    toyForm.style.display = 'none'
  }
})


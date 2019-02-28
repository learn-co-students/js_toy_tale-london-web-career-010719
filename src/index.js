const addBtnEl = document.querySelector('#new-toy-btn')
const toyFormEl = document.querySelector('.container')
const toyContainerEl = document.querySelector('#toy-collection')
let addToy = false

//==== Initialize Page ====//
document.addEventListener("DOMContentLoaded", function () {
  initialize()
})
const initialize = () => {
  getToys().then(drawToyCards)
  document.querySelector('.add-toy-form').addEventListener('submit', event => {
    event.preventDefault()
    const newToy = { name: event.target.name.value, image: event.target.image.value, likes: 0}
    createToy(newToy).then(toy => drawToyCard(toy, true))
  })
}

//==== Draw Functions ====//
const drawToyCard = (toy, prepend=false) => {
  const toyCardEl = document.createElement('div')
  toyCardEl.classList.add('card')
  toyCardEl.dataset.toyId = toy.id
  toyCardEl.innerHTML = toyCardHTML(toy)
  toyCardEl.querySelector('button').addEventListener('click', likeToy(toy))
  if (prepend){
    toyContainerEl.prepend(toyCardEl)
  } else {
    toyContainerEl.appendChild(toyCardEl)
  }
}

const likeToy = toy => () => {
  toy.likes++
  patchToy(toy).then(toy => updateLikes(toy))
}
const updateLikes = toy => {
  toyContainerEl.querySelector(`div[data-toy-id="${toy.id}"]`).querySelector('p').innerHTML = `${toy.likes} like(s)`
}

const drawToyCards = toys => toys.forEach(toy => drawToyCard(toy, false))
const toyCardHTML = toy => 
    `<h2>${toy.name}</h2>
    <img src="${toy.image}" alt="${toy.name}" class="toy-avatar"/>
    <p>${toy.likes} like(s)</p>
    <button class="like-btn">Like <3</button>`

//handle form toggling
addBtnEl.addEventListener('click', () => {
  addToy = !addToy
  if (addToy) {
    toyFormEl.style.display = 'block'
  } else {
    toyFormEl.style.display = 'none'
  }
})

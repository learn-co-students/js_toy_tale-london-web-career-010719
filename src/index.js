const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')

let addToy = false
//================Show Toys=============
function showToy(toy) {
  const toyDiv = document.createElement('div')
  toyDiv.className = 'card'
  toyDiv.innerHTML =
  `<h2>Toy Name: ${toy.name}</h2>
  <img class="toy-avatar" src="${toy.image}"/>
  <p>Likes: ${toy.likes} </p>
  <button class"like-btn">Like</button>
  <button class"like-btn">Delete</button>`
  toyDiv.addEventListener('click', (event) => {
    if (event.target.innerText === 'Like'){
      toy.likes = toy.likes + 1
      updateToy(toy)
    }
  })
  toyDiv.addEventListener('click', (event) => {
    if (event.target.innerText === 'Delete'){
      deleteToy(toy)
    }
  })
  return toyDiv
}

function listToys(toys) {
  toyCollection.innerHTML = ''
  for (let i = 0; toys.length > i; i++) {
    toy = showToy(toys[i])
    toyCollection.append(toy)
  }
}

//================Create Toy=============
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

toyForm.addEventListener('submit', (event) => {
  if (event.target.className === "add-toy-form")
  event.preventDefault()
  toy = {name: event.target.name.value, image: event.target.image.value, likes: 0}
  postToy(toy)
})


function init() {
  getToys()
}
init()

// OR HERE!

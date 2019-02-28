url = 'http://localhost:3000/toys'



const addBtn = document.querySelector('#new-toy-btn')
const toyFormDiv = document.querySelector('.container')
const toyForm = document.querySelector('.add-toy-form')
const toyCollectionDiv = document.querySelector('#toy-collection')
let addToy = false
let allToys = []

// =============================================================================

// RENDER TOYS

const getToys = () => fetch(url).then(resp => resp.json())

const renderToys = toys => {
  allToys = []
  toyCollectionDiv.innerHTML = ''
  toys.forEach(renderToyCard)
}

const renderToyCard = toy => {
  allToys.push(toy)
  // create toy card Div
  const toyCardDiv = document.createElement('div')
  toyCardDiv.className = 'card'
  toyCollectionDiv.append(toyCardDiv)

  // populate card with toy info
  const toyInfo = `

    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
  `

  toyCardDiv.innerHTML = toyInfo

  // Like button with event listener
  toyCardDiv.querySelector('button').addEventListener('click', () => updateLikes(toy))
}


// =============================================================================

// ADD NEW TOY

// show form to add new toy

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyFormDiv.style.display = 'block'
    // submit listener here
    toyForm.addEventListener('submit', () => {
      event.preventDefault()
      createNewToy(toyForm)
    })
  } else {
    toyFormDiv.style.display = 'none'
  }
})

// Create new Item on the server

const createNewToy = toyForm =>{
  const newToyName = toyForm.name.value
  const newToyImage = toyForm.image.value
  optimisticallyRenderToys(toyForm)
  fetch(url,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "name": newToyName,
        "image": newToyImage,
        "likes": 0
      })
    }
  ).then(resp => resp.json()).then(() => initialize())
}

const optimisticallyRenderToys = toyForm =>{
  const newToyName = toyForm.name.value
  const newToyImage = toyForm.image.value
  const toy = {
    "name": newToyName,
    "image": newToyImage,
    "likes": 0
  }
  renderToyCard(toy)
}

// =============================================================================

// UPDATE LIKES

const updateLikes = toy => {
  const currentLikes = toy.likes





  fetch(url+`/${toy.id}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "likes": currentLikes+1
      })
    }
  ).then(resp => resp.json()).then(() => initialize())
}




// =============================================================================



const initialize = () => {
  getToys().then(renderToys)
}

initialize()













// OR HERE!

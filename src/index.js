const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

const toyList = new ToyList()

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    const createToyBtn = document.querySelector('input.submit')
    createToyBtn.addEventListener('click',addNewToy)
  } else {
    toyForm.style.display = 'none'
  }
})

function addNewToy(){
  event.preventDefault()
  const toyName = document.querySelector("input[name='name']").value
  const toyImage = document.querySelector("input[name='image']").value
  const url = "http://localhost:3000/toys"

  const options = {
    method: 'POST',
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: `${toyName}`,
      image: `${toyImage}`,
      likes: "0"
    })
  }

  fetch (url, options)
    .then (res => res.json())
    .then (toy => toyList.createToy(toy))
}

function fetchToys(id){
  if (id===undefined){
    return fetch("http://localhost:3000/toys")
      .then(res => res.json())
  }
  else {
    return fetch(`http://localhost:3000/toys/${id}`)
      .then(res => res.json())
  }
}

function addLikesEvent(){
  document.querySelectorAll('button.like-btn').forEach((el)=>{
    const likeBtn = el
    likeBtn.addEventListener('click', e=>addLikes(e))
  })
}

function addLikes(e){
  const toyId = e.target.attributes['toy-id'].value
  const likesEl = document.querySelector(`p[toy-id="${toyId}"]`)
  const likes = parseInt(likesEl.innerText)+1
  const url = `http://localhost:3000/toys/${toyId}`

  const options = {
    method: 'PATCH',
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": `${likes}`
    })
  }

  fetch (url, options)
    .then (res => res.json())
    .then (toy => {likesEl.innerText = `${toy['likes']} Likes`})
}



fetchToys()
  .then(toys => toyList.displayToyList(toys))
  .then(addLikesEvent)


// OR HERE!

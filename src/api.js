const url = `http://localhost:3000/toys`

//GET
function getToys(){
    fetch(url)
        .then (resp => resp.json())
        .then (toys => {
            listToys(toys)
        })
}

//POST
function postToy(toy) {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(toy)
    }
    fetch(url, options)
        .then(resp => resp.json)
        .then(getToys)
}

//POST
function updateToy(toy) {
    const options = {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(toy)
    }
    fetch(`${url}/${toy.id}`, options)
        .then(resp => resp.json)
        .then(getToys)
}

//Delete
function deleteToy(toy) {
    const options = {
        method: 'DELETE'
    }
    fetch(`${url}/${toy.id}`, options)
        .then(resp => resp.json)
        .then(getToys)
}
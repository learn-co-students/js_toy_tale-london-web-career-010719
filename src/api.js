//==== API CAlls ====//
BASEURL = 'http://localhost:3000/toys'


const getToys = () => fetch(BASEURL).then(resp => resp.json())

const createToy = toy => {
    return fetch(BASEURL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(toy)
    }).then(resp => resp.json())
}

const patchToy = toy => {
    return fetch(`${BASEURL}/${toy.id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(toy)
    }).then(resp => resp.json())
}
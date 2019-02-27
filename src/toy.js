class Toy {
    constructor({id, name, image, likes}) {
        this.id = id
        this.name = name
        this.image = image
        this.likes = likes
    }

    element() {
        const cardDiv = document.createElement("div")
        cardDiv.className = "card"
        
        const h2 = document.createElement("h2")
        h2.innerText = this.name
        const img = document.createElement("img")
        img.setAttribute("src", this.image)
        img.className = "toy-avatar"
        const p =  document.createElement("p")
        p.innerText = `${this.likes} Likes`
        const btn = document.createElement("button")
        btn.className = "like-btn"
        btn.dataset.id = this.id
        btn.innerText = "Like <3"
        btn.addEventListener("click", e => {
            this.likes++
            ToyController.likeToy(e, this.likes)
        })
        cardDiv.append(h2, img, p, btn)
        return cardDiv
    }
}

class ToyController {
    static init() {
        const addBtn = document.querySelector('#new-toy-btn')
        const toyForm = document.querySelector('.container')
        const form = document.querySelector(".add-toy-form")
        let addToy = false
        
        addBtn.addEventListener('click', () => {
          addToy = !addToy
          if (addToy) {
            toyForm.style.display = 'block'
            form.addEventListener("submit", e => {ToyController.createNewToy(e)})
          } else {
            toyForm.style.display = 'none'
          }
        })
        
        Adapter.getToys()
        .then(toys => ToyController.renderToyCards(toys))
    }

    static renderToycard(toy) {
        const toyCollectionDiv = document.querySelector("#toy-collection")
        const newToy = new Toy(toy)
        toyList.push(newToy)
        toyCollectionDiv.appendChild(newToy.element())

    }

    static renderToyCards(toys) {
        const toyCollectionDiv = document.querySelector("#toy-collection")
        toyCollectionDiv.innerHTML = ""
        toys.forEach(toy => ToyController.renderToycard(toy))
    }

    static createNewToy(e) {
        e.preventDefault()
        const data = {
            name: e.target.name.value,
            image: e.target.image.value,
            likes: 0
        }
        e.target.reset()
        Adapter.createToy(data)
        .then(toy => ToyController.renderToycard(toy))
    }

    static likeToy(e, likes) {
        const id = e.target.dataset.id
        const data = {
            likes: likes
        }
        return Adapter.updateToy(id, data)
        .then(() => {
            Adapter.getToys()
            .then(toys => ToyController.renderToyCards(toys))
        })
    }
}
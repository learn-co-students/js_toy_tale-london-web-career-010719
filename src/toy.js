
const taskListEl = document.querySelector('#toy-collection')

class Toy {
  constructor(toy){
    this.id = toy.id
    this.name = toy.name
    this.image = toy.image
    this.likes = toy.likes
    this.el = this.createEl()
  }
  //prototype

  createEl(){
    const taskEl = document.createElement('div.card')
    taskEl.innerHTML = `
      <h2>${this.name}</h2>
      <img src=${this.image} class="toy-avatar" />
      <p toy-id="${this.id}">${this.likes} Likes </p>
      <button class="like-btn" toy-id="${this.id}">Like <3</button>
    `
    return taskEl
  }

}

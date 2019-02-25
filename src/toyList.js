class ToyList {
  constructor(){
    this.toys =[]
    this.toyListEl = document.querySelector('#toy-collection')
  }
  //prototype

  displayToy(toyInstance){
    this.toyListEl.appendChild(toyInstance.el)
  }

  createToy(toy){
    const toyInstance = new Toy (toy)
    this.displayToy(toyInstance)
    this.toys.push(toyInstance)
  }

  displayToyList(toys){
    toys.forEach(toy => this.createToy(toy))
  }


}

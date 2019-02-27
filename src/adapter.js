class Adapter {
    static getToys() {
        return fetch("http://localhost:3000/toys")
        .then(res => res.json())
    }

    static createToy(data) {
        const options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        }
        return fetch("http://localhost:3000/toys", options)
        .then(res => res.json())
    }

    static updateToy(id, data) {
        const options = {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        }
        return fetch(`http://localhost:3000/toys/${id}`, options)
        .then(res => res.json())
    }
}   
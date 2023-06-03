let express = require("express")

let app = express()

app.use(express.json())

let PORT = 9001

let db = []

let counter = 1

app.listen(PORT, function(){
    console.log("Application started");
})

app.post("/cars", function(req,res){
    let t = req.body.type
    let ma = req.body.make
    let mod = req.body.model
    let s = req.body.specs

    let newEntry = {
        type: t,
        make: ma,
        model: mod,
        specs: s,
        id: counter
    }

    counter ++

    db.push(newEntry)

    res.status(201).json(newEntry)
})

app.get("/cars", function(req, res){
    let summaries = db.map(function(element){
        let summary = {}
        summary.type = element.type
        summary.make = element.make
        summary.model = element.model
        summary.id = element.id
        return summary
    })

    res.json(summaries)

})

app.get("/cars/:id", function(req, res){
    let id = req.params.id

    let found = db.find(function(element){
        if(element.id == id){
            return element
        }
    })

    res.json(found)
})


app.delete("/cars/:id", function(req, res)  {
    let id = req.params.id

    let newDB = db.filter(function(element){
        if(element.id == id){
            return false
        } else {
            return true
        }
    })
   db = newDB

   res.json(db)

})

app.put("/cars/:id", function(req, res){
    let id = req.params.id
    let type = req.body.type
    let make = req.body.make
    let model = req.body.model
    let specs = req.body.specs

    let found = db.find(function(element){
        if(element.id == id){
            return true
        }
    })

    if(found){
        found.type = type
        found.model = model
        found.make = make
        found.specs = specs
    }
    
    let summaries = db.map(function(element){
        let summary = {}
        summary.type = element.type
        summary.make = element.make
        summary.model = element.model
        summary.id = element.id
        return summary
    })

    res.json(summaries)
})
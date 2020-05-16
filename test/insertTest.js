var db = require('../db')
var expect = require('chai').expect

var collectionName, path, soldierId
var done = function(err, id) {id = soldierId}
var soldierObj = {
    id: 1,
    name: "Noa",
    rank: "corporal",
    limitations: "none",
    duties: "2"
}
var soldierObjWithNoId = {
    name: "Noa",
    rank: "corporal",
    limitations: "none",
    duties: "1"
}

describe('insertFunction', function() {
    it("should create a file and insert it into a new collection",function() {
        collectionName = "soldierCollection3"
        path = "./collections/soldierCollection3/1.txt"
        db.prototype.insert(collectionName, soldierObj, done)
        expect(path).to.be.a.file()
    })

    it("should create a file and insert it into an existing collection",function() {
        collectionName = "soldierCollection3"
        path = "./collections/soldierCollection3/1.txt"
        db.prototype.insert(collectionName, soldierObj, done)
        expect(path).to.be.a.file()
    })
    
    it("should detect that the created file already exists and replace the old one",function() {
        collectionName = "soldierCollection1"
        path = "./collections/soldierCollection1/1.txt"
        db.prototype.insert(collectionName, soldierObj, done)
        expect(path).to.be.a.file().with.content(soldierObj)
    })

    it("should generate new Id to a soldier object and create and insert a new file to new collection",function() {
       collectionName = "soldiersCollection4"
       db.prototype.insert(collectionName, soldierObjWithNoId, done)
       path = `./collections/soldierCollection4/${soldierId}`
       expect(path).to.be.a.file();
    })

    it("should generate new Id to a soldier object and create and insert a new file to an existing collection",function() {
        collectionName = "soldiersCollection4"
        db.prototype.insert(collectionName, soldierObjWithNoId, done)
        path = `./collections/soldierCollection4/${soldierId}`
        expect(path).to.be.a.file()
    })

    it("should check if the generator does not generate the same id twice", function() {
        collectionName = "soldiersCollection4"
        db.prototype.insert(collectionName, soldierObjWithNoId, done)
        let firstId = soldierId
        db.prototype.insert(collectionName, soldierObjWithNoId, done)
        expect(firstId).not.toEqual(soldierId)
    })

    it("should check if a json file has been created and named after the id property in the json object", function() {
        collectionName = "soldierCollection5"
        path = "./collections/soldierCollection5"
        db.prototype.insert(collectionName, soldierObj, done)
        expect(path).to.be.a.directory().with.files(`${soldierObj.id}.json`)
    })
})
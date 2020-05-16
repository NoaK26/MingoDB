const db = require('../db')
const expect = require('chai').expect
const fs = require('fs')
const expect = require('chai').expect

before(function() {
    fs.mkdirSync("./collections/soldierCollection1", { recursive: true })
    fs.mkdir("./collections/soldierCollection2", { recursive: true })
    fs.writeFile("./collections/soldierCollection1/1.json", JSON.stringify(soldierObj))
})

describe('MingoDB', function() {
    let collectionName, result, path, soldierId
    const soldierObj = require('./testData.json')["soldierObj"]
    
    // tests for insert function
    const soldierObjWithNoId = require('./testData.json')["soldierObjWithNoId"]
    const insertDone = function(err, id) {id = soldierId}
    
    it("should create a file and insert it into a new collection",function() {
        collectionName = "soldierCollection3"
        path = "./collections/soldierCollection3/1.txt"
        db.prototype.insert(collectionName, soldierObj, insertDone)
        expect(path).to.be.a.file()
    })
    
    it("should create a file and insert it into an existing collection",function() {
        collectionName = "soldierCollection3"
        path = "./collections/soldierCollection3/1.txt"
        db.prototype.insert(collectionName, soldierObj, insertDone)
        expect(path).to.be.a.file()
    })
    
    it("should detect that the created file already exists and replace the old one",function() {
        collectionName = "soldierCollection1"
        path = "./collections/soldierCollection1/1.txt"
        db.prototype.insert(collectionName, soldierObj, insertDone)
        expect(path).to.be.a.file().with.content(soldierObj)
    })
    
    it("should generate new Id to a soldier object and create and insert a new file to new collection",function() {
        collectionName = "soldiersCollection4"
        db.prototype.insert(collectionName, soldierObjWithNoId, insertDone)
        path = `./collections/soldierCollection4/${soldierId}`
        expect(path).to.be.a.file();
    })
    
    it("should generate new Id to a soldier object and create and insert a new file to an existing collection",function() {
        collectionName = "soldiersCollection4"
        db.prototype.insert(collectionName, soldierObjWithNoId, insertDone)
        path = `./collections/soldierCollection4/${soldierId}`
        expect(path).to.be.a.file()
    })
    
    it("should check if the generator does not generate the same id twice", function() {
        collectionName = "soldiersCollection4"
        db.prototype.insert(collectionName, soldierObjWithNoId, insertDone)
        const  firstId = soldierId
        db.prototype.insert(collectionName, soldierObjWithNoId, insertDone)
        expect(firstId).not.toEqual(soldierId)
    })
    
    it("should check if a json file has been created and named after the id property in the json object", function() {
        collectionName = "soldierCollection5"
        path = "./collections/soldierCollection5"
        db.prototype.insert(collectionName, soldierObj, insertDone)
        expect(path).to.be.a.directory().with.files(`${soldierObj.id}.json`)
    })
    
    // tests for find function
    const findDone = function(err, resultArray) {result = resultArray}
    const queryFnTrue = function() {return true}
    const queryFnFalse = function() {return false}
    
    it("should find a collection and include all the documents in it", function() {
        collectionName = "soldierCollection1"
        db.prototype.find(collectionName, queryFnTrue, findDone)
        expect(result).toEqual(soldierObj)
    })
    
    it("should find a collection and decide not to contain any document in it", function() {
        collectionName = "soldierCollection1"
        db.prototype.find(collectionName, queryFnFalse, findDone)
        expect(result).toEqual(null)
    })
    
    it("should search for a collection and not find it because it doesn't exist",function() {
        collectionName = "soldierCollection3"
        db.prototype.find(collectionName, queryFnTrue, findDone)
        expect(result).toEqual(null)
    })
})
var db = require('../db')
var fs = require('fs')
var async = require('async')
var collectionName, result
var done = function(err, resultArray) {result = resultArray}
var queryFnTrue = function() {return true}
var queryFnFalse = function() {return false}
var expect = require('chai').expect

var soldierObj1 = {
    id: 1,
    name: "Noa",
    rank: "corporal",
    limitations: "none",
    duties: "1"

}

fs.mkdirSync("./collections/soldierCollection1", { recursive: true }, function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log("first directory successfully created.")
    }
  })

  fs.mkdir("./collections/soldierCollection2", { recursive: true }, function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log("second directory successfully created.")
    }
  })

  fs.writeFile("./collections/soldierCollection1/1.json", JSON.stringify(soldierObj1), (error) => {
      if (error) {
          console.error('An error occured: ', error);
      } else {
          console.log('Your file is made!')
      }
  })

describe('findFunction', function() {
     it("should find a collection and include all the documents in the array", function() {
        collectionName = "soldierCollection1"
        db.prototype.find(collectionName, queryFnTrue, done)
        expect(result).toEqual(soldierObj1)
    })
    
    it("should decide not to contain any document in the results array", function() {
        collectionName = "soldierCollection1"
        db.prototype.find(collectionName, queryFnFalse, done)
        expect(result).toEqual(null)
    })

    it("shouldn't find the collection",function() {
        collectionName = "soldierCollection3"
        db.prototype.find(collectionName, queryFnTrue, done)
        expect(result).toEqual(null)
    })
})
const db = require("../db")
const assert = require('chai').assert

soldierObj = {
    id: "1",
    name: "Maya",
    rank: "private", 
    limitiations: ["Korona", "Weather"],
    duties: "123456"
}

soldierObjWithouId = {
    name: "Maya",
    rank: "private", 
    limitiations: ["Korona", "Weather"],
    duties: "123456"
}

describe('insertFuncion', function() {
    it('check if new collection creates', () => {
        assert.equal(db.prototype.insert("firstSoldiersCollection", soldierObj, null), "EMPTY")
    })
    
    it('check if old collection does not creates', () => {
        assert.equal(db.prototype.insert("firstSoldiersCollection", soldierObj, null), "EMPTY")
    })
    
    it('create file in old collection', () => {
        assert.equal(db.prototype.insert("firstSoldiersCollection", soldierObj, null), "EMPTY")
    })
    
    it('rewrite file in old collection', () => {
        assert.equal(db.prototype.insert("firstSoldiersCollection", soldierObj, null), "EMPTY")
    })
    
    it('create file in new collection', () => {
        assert.equal(db.prototype.insert("secondSoldiersCollection", soldierObj, null), "EMPTY")
    })
    
    it('rewrite file in new collection', () => {
        assert.equal(db.prototype.insert("thirdSoldiersCollection", soldierObj, null), "EMPTY")
    })
    
    it('create file in old collection without given a id', () => {
        assert.equal(db.prototype.insert("secondSoldiersCollection", soldierObjWithouId, null), "EMPTY")
    })
    
    it('rewrite file in old collection without given a id', () => {
        assert.equal(db.prototype.insert("thirdSoldiersCollection", soldierObjWithouId, null), "EMPTY")
    })
    
    it('create file in new collection without given a id', () => {
        assert.equal(db.prototype.insert("fourthSoldiersCollection", soldierObjWithouId, null), "EMPTY")
    })
    
    it('rewrite file in new collection without given a id', () => {
        assert.equal(db.prototype.insert("fourthSoldiersCollection", soldierObjWithouId, null), "EMPTY")
    })
})

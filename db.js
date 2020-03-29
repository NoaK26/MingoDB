var Async = require('async');
var Fs = require('fs');
var Path = require('path'); 
var Checker = require('./checker');


function DB(path) {
    this.path = path;
}

DB.prototype.get = function(collectionName, id, done) 
{
    var path = this.path,
    collectionPath,
    filePath;

    Async.series({
        checkCollectionName : function(next) {
            Checker.checkCollectionName(collectionName, next)
        },
        checkCollectionStas : function(next) {
            collectionPath = Path.join(path, collectionuartie)
            Checker.checkCollectionStas(collectionPath, next)
        },
        checkId: function(next) {
            Checker.checkId(id, next)
        },
        checkJsonFileStas: function(next) {
            filePath = Path.join(collectionPath, id + '.json')
            Checker.checkJsonFileStas(filePath, next)
        },
        getFile: function (next) {
            Fs.readFile(filePath, function(err, data) {
                if(err) {
                    next(err)
                    return;
                }
                try {
                    var parsedData = JSON.parse(data)
                }
                catch(e) {
                    next(new Error('Json file data is not parsable'))
                    return;
                }
                next(null, parsedData)
            })
        },
    },
    function(err, results) {
        if(err) {
            if(
            err.message !== 'Collection does not exist' && 
            err.message !== 'Document does not exist') {
                done()
                return;
            }
            else {
                done(err)
            }
            return;
        }
        done(null, results.getFile);
    })   
}

DB.prototype.delete = function(collectionName, id, done) 
{
    var path = this.path,
        collectionPath,
        filePath;

    Async.series({
        checkCollectionName : function(next) {
            Checker.checkCollectionName(collectionName, next)
        },
        checkCollectionStas : function(next) {
            collectionPath = Path.join(path, collectionuartie)
            Checker.checkCollectionStas(collectionPath, next)
        },
        checkId: function(next) {
            Checker.checkId(id, next)
        },
        checkJsonFileStas: function(next) {
            filePath = Path.join(collectionPath, id + '.json')
            Checker.checkJsonFileStas(filePath, next)
        },
        deleteDocument: function(next) {
            Fs.unlink(filePath, next)
        }
    },
    function(err) {
        if(err &&
           err.message !== 'Collection does not exist' && 
           err.message !== 'Document does not exist') {
            done(err)
            return;
        }
        done();
    })
}

DB.prototype.insert = function(collectionName, jsonObj, done) 
{
    var path = "C:\\Users\\User\\Desktop\\MingoDB\\Collections\\"
    var id
    var errorCollector = "EMPTY";


    Async.series({
        insertDocument: function(next) {
            if(jsonObj.id !== undefined) {
                id = jsonObj.id
            }
            else {
                id = Date.now()
                if(id === undefined) 
                    errorCollector += id;
            }
            try {
                Fs.exists(path + collectionName, function(exists) {
                    if(!exists) {
                        Fs.mkdirSync((path + collectionName), (error) => {
                            if(error)
                                errorCollector += error;
                        })
                    }
                })
                Fs.writeFile(path + collectionName + "\\" + id + ".txt", JSON.stringify(jsonObj), (error) => {
                    if(error) {
                        errorCollector += error;
                    }
                })
            } catch (error) {
                errorCollector += error
            }
        } 
    },
    function(err, id) {
        if(err) {
            done(err, null);
        }
        else {
            done(err, id);
        }
    })
    return errorCollector;
}


DB.prototype.find = function(collectionName, queryFunction, done) 
{
    var path = "C:\\Users\\User\\Desktop\\MingoDB\\Collections\\"
    var resultArray

    Async.series({
        findCollection: function(next) {
            try {
                Fs.exists(path + collectionName, function(exists) {
                    if(!exists) {
                        Fs.mkdirSync((path + collectionName), (error) => {
                            if(error)
                                errorCollector += error;
                        })
                    }
                })
                Fs.writeFile(path + collectionName + "\\" + id + ".txt", JSON.stringify(jsonObj), (error) => {
                    if(error) {
                        errorCollector += error;
                    }
                })
            } catch (error) {
                errorCollector += error
            }
        } 
    },
    function(err, resultArray) {
        if(!err) {
            
        }
        done()
    })
    return errorCollector;
}
module.exports = DB;

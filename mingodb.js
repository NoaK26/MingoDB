var FS = require('fs')
var DB = require('./db')

function MingoDB() {} 

MingoDB.connect = function(dbFolderPath, done) {
    if (typeof dbFolderPath !== 'string'  && !(dbFolderPath instanceof String)) {
        done(new Error('Folder path should be a string.')); 
        return;
    }
    Fs.stat(dbFolderPath, function(err, stats) {
        if (err) {
            done(err)
            return;
        }
        if(!stats.isDirectory()) {
            done( new Error('Not a directury'));
            return;
        } 
        if((stats.mode & 0770).toString(8) !== '770') {
            done(new Error('No proper permissions for folder'));
            return;
        }
        done(null, new DB(dbFolderPath))
    });
}
module.exports = MingoDB
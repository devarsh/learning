import fs from 'fs'
import zlib from 'zlib'
require('buffer').Buffer
var Promise = require('promise')

const readTheFile = cb => path => {
  cb(fs.readFileSync(path,{encoding:'utf8'}))
}

const zipTheFile = cb => source => {
  zlib.deflate(source,(err,buf)=> {
    if(!err) {
      cb(buf.toString('base64'))
    }
    else {
      console.log(err)
    }
  })
}

const unzipTheFile = cb => source => {
  const buffer = new Buffer(source,'base64')
  zlib.unzip(buffer, (err, buf) => {
    if (!err) {
      cb(buf.toString())
    } else {
      // handle error
      console.log(err)
    }
  })
}

const writeTheFile = cb => path => source => fs.writeFile(path,source,'utf8',cb)

const compose = (args,cb) => {
  const fns = [...args]
  return fns.reduceRight((acc,fn) => {
    return fn(acc)
  },cb)
}

const callback = () => {
  function emptyFn() {}
  const chain2 = [readTheFile,unzipTheFile]
  const writeTheUnzipFile = writeTheFile(emptyFn)('testFiles/unzippedFile.txt')
  const unzipFile = compose(chain2,writeTheUnzipFile)
  var zipPath = 'testFiles/zippedFile.txt'
  unzipFile(zipPath)
}

const chain1 = [readTheFile,zipTheFile]
const writeTheZipFile = writeTheFile(callback)('testFiles/zippedFile.txt')
const zipFile = compose(chain1,writeTheZipFile)
var originPath = 'testFiles/InFile.txt'
zipFile(originPath)


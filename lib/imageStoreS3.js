// const fs = require('fs')
// const path = require('path')
// const util = require('util')

// const asyncWriteFile = util.promisify(fs.writeFile)

// module.exports.save = async (name, data, callback) => {
//   const fileName = `//dimkkspizzabucket.s3.eu-central-1.amazonaws.com/pizzas/${name}.png`

//   try {
//     await asyncWriteFile(path.join(__dirname, '/..', fileName), data, 'base64')
//   } catch (err) {
//     console.error(`Error writing image file. Error: ${err}`)
//   }

//   return fileName
// }
const aws = require("aws-sdk");
const s3 = new aws.S3();

module.exports.save = (name, data) => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: "dimkkspizzabucket",
      Key: `pizzas/${name}.png`,
      Body: Buffer.from(data, 'base64'),
      ContentEncoding: 'base64',
      ContentType: 'image/png'
    }
    s3.putObject(params, (err, data) => {
      if (err) reject(err);
      resolve(`//dimkkspizzabucket.s3.eu-central-1.amazonaws.com/${params.Key}`)
    })
  })
}
const fs = require("fs");

const jsonGenerator = async(data) => {
    try {
        const path = './olx-bikes-' + Date.now() + '.json'
        fs.writeFile(path, JSON.stringify(data), { flag: 'wx' }, function (err) {
            if (err) throw err;
            console.log('It\'s saved!');
          })
    } catch (error) {
        console.log('Falhou na geração do JSON!' + error)
    }
}

module.exports = {
    jsonGenerator: jsonGenerator
}
const { getDataFromUrl } = require("../scraping");
const { states, motorcycles } = require("../search-variables");

const rawDataGenerator = async() => {
    try {
        let data = {}
        for (let index = 0; index < states.length; index++) {
            const state = states[index];
            data[state] = [];
            console.log('Buscando dados do estado: ' + state)
            for (let index = 0; index < motorcycles.length; index++) {
                let bike = motorcycles[index]
                let bikeData = {}
                let bikeName = bike.name
                console.log('Buscando dados da moto ' + bikeName + ' no estado ' + state)
                let bikeSite = bike.site.replace('www', state)
                let dataExtracted = await getDataFromUrl(bikeSite)
                bikeData[bikeName] = []
                bikeData[bikeName].push(dataExtracted)
                data[state].push(bikeData)
            }
        }
        console.log('Buscado todos os itens que foram requisitados!')
        return data
    } catch (error) {
        console.log('Houve um erro na coleta dos dados brutos! - ' +  error)        
    }
}

module.exports = {
    rawDataGenerator: rawDataGenerator
}
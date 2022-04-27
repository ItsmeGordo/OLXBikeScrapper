const { jsonGenerator } = require("./generator/json-generator");
const { rawDataGenerator } = require("./generator/raw-data-generator");

const main = async () => {
    try {
        let data = await rawDataGenerator()
        await jsonGenerator(data);
    } catch (error) {
        console.log('Erro inesperado! - ' + error)
    }
}

main()
const { getDataFromUrl } = require("./scraping")

const main = async () => {
    try {
        let dataExtracted = await getDataFromUrl('https://sc.olx.com.br/autos-e-pecas/motos/suzuki/marauder?sf=1')
        console.log(dataExtracted)
    } catch (error) {
        console.log('Falhou algo!' + error )        
    }
}

main()
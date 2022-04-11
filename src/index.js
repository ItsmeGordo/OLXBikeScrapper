const { getDataFromUrl } = require("./scraping")

const main = async () => {
    try {
        let states = [ 'sc', 'pr', 'rs']
        let motorcycles = [
            'https://www.olx.com.br/autos-e-pecas/motos/honda/shadow/600?sp=2',
            'https://www.olx.com.br/autos-e-pecas/motos/honda/shadow/750?sp=2',
            'https://www.olx.com.br/autos-e-pecas/motos/kawasaki/vulcan/800?sp=2',
            'https://www.olx.com.br/autos-e-pecas/motos/kawasaki/vulcan/900?sp=2',
            'https://www.olx.com.br/autos-e-pecas/motos/kawasaki/vulcan/acima-de-1000?sp=2',
            'https://www.olx.com.br/autos-e-pecas/motos/yamaha/xv/250?sp=2',
            'https://www.olx.com.br/autos-e-pecas/motos/yamaha/xv/500?sp=2',
            'https://www.olx.com.br/autos-e-pecas/motos/yamaha/xv/550?sp=2',
            'https://www.olx.com.br/autos-e-pecas/motos/yamaha/xvs/650?sp=2',
            'https://www.olx.com.br/autos-e-pecas/motos/suzuki/savage?sp=2',
            'https://www.olx.com.br/autos-e-pecas/motos/suzuki/marauder?sp=2',
            'https://www.olx.com.br/autos-e-pecas/motos/suzuki/intruder/800?sp=2',
            'https://www.olx.com.br/autos-e-pecas/motos/suzuki/intruder/acima-de-1000?sp=2',
            'https://www.olx.com.br/autos-e-pecas/motos/suzuki/boulevard/800?sp=2',
            'https://www.olx.com.br/autos-e-pecas/motos/harley-davidson/sportster?sp=2',
            'https://www.olx.com.br/autos-e-pecas/motos/harley-davidson/dyna?sp=2'

        ]
        for (let index = 0; index < states.length; index++) {
            const state = states[index];
            for (let index = 0; index < motorcycles.length; index++) {
                let bike = motorcycles[index];
                bike = bike.replace('www', state)
                let dataExtracted = await getDataFromUrl(bike)
                console.log(dataExtracted)
        }
            
        }
    } catch (error) {
        console.log('Falhou algo!' + error )        
    }
}

main()
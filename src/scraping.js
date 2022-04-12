const axios = require('axios');
const cheerio = require('cheerio');
const { LINK_CLASS, PRODUCT_NAME_SELECTOR, VALUE_SELECTOR, PUBLISH_DATE_SELECTOR, KM_SELECTOR, CEP_SELECTOR, CITY_SELECTOR, YEAR_SELECTOR } = require('./constants');

const extractAllData = async (targetUrl) => {
    try {
        const response = await axios.get(targetUrl)
        return response.data
    } catch (error) {
        console.log("Can't extract data from this targetUrl" + targetUrl)
    }
}

const listAllLinks = async (targetUrl) => {
    const linksExtracted = []
    const html = await extractAllData(targetUrl);
    const $ = await cheerio.load(html);
    $(LINK_CLASS).each(function(i, lnk) {
        linksExtracted[i] = $(lnk).attr('href')
    })
    return linksExtracted
}

const extractRelevantData = async (productLink) => {
    try {
        const response = await axios.get(productLink)
        const htmlProduct = response.data
        const $ = await cheerio.load(htmlProduct)
        const result = {
            productName: $(PRODUCT_NAME_SELECTOR).text(),
            value: $(VALUE_SELECTOR).text(),
            publishDate: $(PUBLISH_DATE_SELECTOR).text(),
            fabricationYear: $(YEAR_SELECTOR).text(),
            mileage: $(KM_SELECTOR).text(),
            cep: $(CEP_SELECTOR).text(),
            city: $(CITY_SELECTOR).text(),
            link: productLink
        }
        return result
    } catch (error) {
        console.log('Something went wrong in data extraction' + error)
    }
}

const getDataFromUrl = async (targetUrl) => {
    try {
        var data = {} // empty Object
        var key = targetUrl;
        data[key] = [];
        const linksExtracted = await listAllLinks(targetUrl)
        for (const productLink of linksExtracted) {
            const extractedData = await extractRelevantData(productLink)
            data[key].push(extractedData)
        };
        return data
    } catch (error) {
        console.log('Ops! something went wrong' + error)
    }
}

module.exports = {
    getDataFromUrl: getDataFromUrl
  }
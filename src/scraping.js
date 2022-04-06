const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

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
    $('.sc-12rk7z2-1').each(function(i, lnk) {
        linksExtracted[i] = $(lnk).attr('href')
    })
    return linksExtracted
}

const extractRelevantData = async (productLink) => {
    try {
        const response = await axios.get(productLink)
        const htmlProduct = response.data
        const $ = await cheerio.load(htmlProduct)
        let productName = $('#content > div.sc-18p038x-3.dSrKbb > div > div.sc-bwzfXH.h3us20-0.cBfPri > div.duvuxf-0.h3us20-0.jAHFXn > div.h3us20-6.gFNxVM > div > div > h1').text()
        let value = $('#content > div.sc-18p038x-3.dSrKbb > div > div.sc-bwzfXH.h3us20-0.cBfPri > div.duvuxf-0.h3us20-0.cpscHx > div.h3us20-6.jUPCvE > div > div > div.sc-hmzhuo.dtdGqP.sc-jTzLTM.iwtnNi > div.sc-hmzhuo.sc-12l420o-0.kUWFYY.sc-jTzLTM.iwtnNi > h2.sc-ifAKCX.eQLrcK').text()
        let publishDate = $('#content > div.sc-18p038x-3.dSrKbb > div > div.sc-bwzfXH.h3us20-0.cBfPri > div.duvuxf-0.h3us20-0.jAHFXn > div.h3us20-6.hzUJDA > div > div > div > span.sc-1oq8jzc-0.jvuXUB.sc-ifAKCX.fizSrB').text()
        const result = {
            productName: productName,
            value: value,
            publishDate: publishDate,
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
        console.log(data)
    } catch (error) {
        console.log('Ops! something went wrong' + error)
    }
}
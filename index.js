#! /usr/bin/env node

const diffy = require('diffy')()
const trim = require('diffy/trim+newline')
const { readFile } = require('fs')
const { promisify } = require('util')

const readFileAsync = promisify(readFile)

const getDailyQuote = () => {

    return readFileAsync('./quotes.json')
        .then(data => JSON.parse(data))
        .then(parsed => parsed.quotes[Math.floor(Math.random() * parsed.quotes.length)])
}

(async () => {
    try {
        const quote = await getDailyQuote()
        diffy.render(function () {
            return trim(`
                RMS daily:
                ${quote}\n
            `)
        })
    } catch (e) {
        console.error('Ooops', e.message)
        process.exit(1)
    }
})()


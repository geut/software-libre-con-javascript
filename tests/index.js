const test = require('tape')
const { quotes } = require('../quotes.json')
const { spawn } = require('child_process')
const path = require('path')

const binPath = path.normalize(`${__dirname}/../index.js`)

test('RMS quote test', function (t) {
  t.plan(2)

  const child = spawn('node', [binPath])

  child.stdout.on('data', data => {
    const quote = data.toString()
    const exists = quotes.find(q => quote.includes(q))
    t.ok(exists, 'CLU must return a valid Richard Stallman quote')
  })

  child.on('close', code => {
    t.equal(code, 0, 'CLI must exit with code: 0')
  })
})

const path = require('path')
const fs = require('fs')
const solc = require('solc')

const filename = 'Inbox.sol'
const inboxPath = path.resolve(__dirname, 'contracts', filename)
const source = fs.readFileSync(inboxPath, 'utf8')

const input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol': {
            content: source
        }
    },
    settings: {
        optimizer: {
            enabled: true
        },
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
}

module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[filename].Inbox

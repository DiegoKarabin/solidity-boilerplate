const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())
const { abi, evm: { bytecode: { object } } } = require('../compile')

let accounts, inbox, testingAccount
const INITIAL_STRING = 'Hi there!'

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts()

    testingAccount = accounts[0]

    // Use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(abi)
        .deploy({ data: object, arguments: [INITIAL_STRING] })
        .send({ from: testingAccount, gas: '1000000' })
})

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address)
    })

    it('has a default message', async () => {
        const message = await inbox.methods.message().call()

        assert.strictEqual(message, INITIAL_STRING)
    })

    it('can change the message', async () => {
        await inbox.methods.setMessage('bye').send({ from: testingAccount })

        const message = await inbox.methods.message().call()

        assert.strictEqual(message, 'bye')
    })
})

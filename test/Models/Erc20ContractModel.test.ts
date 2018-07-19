import { ERC20Contract } from "../../src/models/Erc20ContractModel"
import { Database } from "../../src/models/Database"
import { assert, expect } from "chai"
import { equal } from "assert";
const config = require("config");

describe("Test ERC20Contract model", () => {

    before(() => {
        new Database(config.get("MONGO.URI")).connect()
    })

    beforeEach((done) => {
        ERC20Contract.remove({}, err => {
            done();
        });
    });

    afterEach((done) => {
        ERC20Contract.remove({}, err => {
            done();
        });
    });

    const address = "0xD09856227B4cf970E93f4038701Dc7bC72518d89"
    const name = "CanYaCoin"
    const symbol = "CAN"
    const totalSupply = "100000000000000"
    const decimals = 6
    const erc20Contract = { address, name, totalSupply, decimals, symbol};

    it("Should save ERC20 contract", (done) => {
        new ERC20Contract(erc20Contract).save().then((res) => {
                expect(res).to.have.property("_id")
                expect(res).to.have.property("address", address)
                expect(res).to.have.property("name", name)
                expect(res).to.have.property("totalSupply", totalSupply)
                expect(res).to.have.property("decimals", decimals)
                expect(res).to.have.property("symbol", symbol)
                expect(res).to.have.property("verified", false)
                done()
        })
    })

    it("Should set verified to true if specified", (done) => {
        const verified = {...erc20Contract, verified: true}

        new ERC20Contract(verified).save().then((res) => {
                expect(res).to.have.property("verified", true)
                done()
        })
    })
})
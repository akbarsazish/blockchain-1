const cryptoHash = require('./crypto-hash');

describe("cryptoHash()", ()=>{
    it("generate SHA-256 hashed output", ()=> {
        expect(cryptoHash("crypto")).toEqual("da2f073e06f78938166f247273729dfe465bf7e46105c13ce7cc651047bf0ca4");
    });

    it("produce the same hash with the same input in any order", ()=>{
        expect(cryptoHash("one", "two", "three", "four")).toEqual(cryptoHash("three", "one", "four", "two"))
    })
})

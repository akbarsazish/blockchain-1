const Block = require('./block');
const Blockchain = require('./blockchain');

describe("Blockchain{}", ()=> {
    const blockchain = new Blockchain();
   it("contain `chain` Array instance", ()=> {
        expect(blockchain.chain instanceof Array).toBe(true)
   });

   it("start with genesis block", ()=> {
     expect(blockchain.chain[0]).toEqual(Block.genesis());
   });

   it("add a new block to the chain", ()=> {
    const newData = 'foo bar';
    blockchain.addBlock({data: newData});
    expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
   })
})
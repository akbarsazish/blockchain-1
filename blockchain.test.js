const Block = require('./block');
const Blockchain = require('./blockchain');

describe("Blockchain{}", ()=> {
      let blockchain = new Blockchain();
    beforeEach(()=> {
        blockchain = new Blockchain();
    })
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
   });

   describe("isValidChain()", ()=> {
     beforeEach(()=> {
        blockchain.addBlock({data: "one"})
        blockchain.addBlock({data: "two"})
        blockchain.addBlock({data: "three"})
     });

     describe("when the chain doesn't start with genesis block", ()=> {
        it("return false", ()=> {
            blockchain.chain[0] = {data:"fake genesis"}
            expect(Block.isValidation(blockchain.chain)).toEqual(false);
        })
     });

     describe("when the chain start with genesis block", ()=> {
        describe("and lastHash references has changed", ()=> {
            it("return false", ()=> {
                blockchain.chain[2].lastHash = 'broken-lasthash';
                expect(Block.isValidation(blockchain.chain)).toEqual(false);
            });
        });
        
        describe("and the chain contains a block with invalid field", ()=> {
            it("return false", ()=> {
                expect(Block.isValidation(blockchain.chain)).toEqual(false);
            })
        });

        describe("and the chain is valid", ()=> {
            it("return true", ()=> {
                expect(Block.isValidation(blockchain.chain)).toEqual(true);
            })
        });
     });
   })
})
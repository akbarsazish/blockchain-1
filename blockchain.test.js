const Block = require('./block');
const Blockchain = require('./blockchain');

describe("Blockchain{}", ()=> {
      let blockchain, newChain, originalChain;
    beforeEach(()=> {
        blockchain = new Blockchain();
        newChain = new Blockchain();
        originalChain = blockchain.chain;
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
     describe("when the chain doesn't start with genesis block", ()=> {
        it("return false", ()=> {
            blockchain.chain[0] = {data:"fake genesis"}
            expect(Blockchain.isValidChain(blockchain.chain)).toEqual(false);
        })
     });

     describe('when the chain does start with the genesis block and has multiple blocks', ()=>{
      
        beforeEach(()=>{
          blockchain.addBlock({data:'one'});
          blockchain.addBlock({data:'two'});
          blockchain.addBlock({data:'three'});
        });
  
        describe('and a lastHash refrenece has changed', ()=>{
          it('returns false', ()=>{
            blockchain.chain[2].lastHash = 'broken-lastHash';
            expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
          });
        });
  
        describe('and the chain contains a block with an invalid field', ()=>{
          it('returns false', ()=>{
            blockchain.chain[2].data = 'changed-data';
            expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
          });
        });
  
        describe('and the chain does not contain any invalid blocks', ()=>{
          it('returns true', ()=>{
            expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
          });
        });
      });
   })

   describe("replaceChain()", ()=> {
     describe("when the newChain is دnot longer", ()=> {
        it("Doesn't replace the chain", ()=> {
            newChain[0] = {new:'chain'}
            blockchain.replaceChain(newChain.chain);
            expect(blockchain.chain).toEqual(originalChain)
        })
     })
     describe("when the newChain is longer", ()=> {
        beforeEach(()=>{
            newChain.addBlock({data:'one'});
            newChain.addBlock({data:'two'});
            newChain.addBlock({data:'three'});
          });
        describe("when the chain is invalide", ()=> {
            it("Doesn't replace the chain", ()=> {
              newChain.chain[2].hash = "fake-chain";
              blockchain.replaceChain(newChain.chain);
              expect(blockchain.chain).toEqual(originalChain)
            })
        })
        describe("when the chain is valide", ()=> {
            it("Does replace the chain", ()=> {
                blockchain.replaceChain(newChain.chain);
                expect(blockchain.chain).toEqual(newChain.chain)
            })
        })
     })
   })
})
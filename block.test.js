const Block = require("./block");
const cryptoHash = require('./crypto-hash')
const {GENESIS_DATA} = require('./config');

describe("Block", ()=>{
  const timestamp = '123456';
  const lastHash = 'foo-hash';
  const hash = 'bar-hash';
  const data = ['blockchain', 'data'];
  
  const block = new Block({
    timestamp,
    lastHash,
    hash,
    data
  });
  
  it("has a timestamp, lastHash, hash and data property", ()=>{
    expect(block.timestamp).toEqual(timestamp);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
  });

  describe('genesis()', ()=>{
    const genesisblock = Block.genesis();
    it('returns a block instance', ()=>{
      expect(genesisblock instanceof Block).toEqual(true);
    })

    it('returns the genesis data', ()=>{
      expect(genesisblock).toEqual(GENESIS_DATA);
    })
  });

  describe("minedBlock()", ()=>{
    const lastBlock = Block.genesis();
    const data = "mined data";
    const minedBlock = Block.minedBlock({lastBlock, data});

    it("return a block instance", ()=> {
      expect(minedBlock instanceof Block).toEqual(true)
    });

    it("sets `lastHash` to the `hash` of lastBlock", ()=>{
      expect(minedBlock.lastHash).toEqual(lastBlock.hash);
    })

    it("sets `data`", ()=>{
      expect(minedBlock.data).toEqual(data);
    })

    it("sets `timestamp`", ()=>{
      expect(minedBlock.timestamp).not.toEqual(timestamp);
    })

    it("create SHA256 based on proper input", ()=>{
      expect(minedBlock.hash).toEqual(cryptoHash(minedBlock.timestamp, lastBlock.hash, data))
    })
  })

});
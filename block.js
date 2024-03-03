const {GENESIS_DATA, MINE_RATE} = require('./config');
const cryptoHash = require('./crypto-hash')

class Block {
  constructor({ timestamp, lastHash, hash, data, difficulty, nonce }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.difficulty = difficulty;
    this.nonce = nonce;
  }

  static genesis(){
    return new this(GENESIS_DATA);
  }

  static minedBlock({lastBlock, data}){
    let timestamp, hash;
    const lastHash = lastBlock.hash;
    let {difficulty} = lastBlock;
    let nonce = 0;
    do{
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty({originalBlock: lastBlock, timestamp});
      hash = cryptoHash(timestamp, lastHash, data, difficulty, nonce);
    }while(hash.substring(0, difficulty)!== '0'.repeat(difficulty));
    return new this({
      timestamp,
      lastHash,
      data: data,
      difficulty,
      nonce,
      hash
    })
  }

  static adjustDifficulty({originalBlock, timestamp}){
    const {difficulty} = originalBlock;
    if(difficulty < 1) return 1;
    if((timestamp - originalBlock.timestamp) > MINE_RATE) return difficulty - 1;
      return difficulty + 1;
  }
}

module.exports = Block;

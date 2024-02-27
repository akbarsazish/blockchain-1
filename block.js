
class Block{
    constructor({timestamp, lastHash, hash, data}){
        this.timestamp = timestamp;
        this.hash = hash;
        this.lastHash = lastHash;
        this.data = data;
    }
}

const block1 = new Block({
    timestamp:"98797", lastHash:"lasthasn", hash:"rwewerew", data:"data"
});

console.log(block1)
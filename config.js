const INITIAL_DIFFICULTY = 3;
const MINE_RATE = 1000;
const STARTING_BALANCE = 5000;

const REWARD_INPUT = {address: '*authorized-reward-address*'};
const MINING_REWARD = 100; 

const GENESIS_DATA = {
    timestamp: 1,
    lastHash: '--@--!--',
    hash: 'hash-one',
    data: [],
    difficulty: INITIAL_DIFFICULTY,
    nonce: 0
  }
  
  module.exports = {GENESIS_DATA, MINE_RATE};
const args = process.argv.slice(2)
const main = require('./main')

module.exports = {
  /**
   * Generate an EFF passphrase based on the chosen word list.
   * @param {boolean} useEntropy - Whether or not to use the data in the entropy file.
   * @returns {Object} An associative array of the generated passphrase and its meta.
   */
  generateEff: function(useEntropy) {
    let effSet
    let wordlist = []
  
    if (args.includes('-e') || args.includes('--eff')) {
      const option = args.findIndex((option) => option === '-e' || option === '--eff')
      effSet = args[option + 1]
    } else {
      effSet = 'Short'
    }
  
    if (effSet.toLowerCase() === 'distant') {
      const effDistant = require('../lists/effDistant')
      wordlist = effDistant.wordlist
      effSet = 'Distant'
    } else if (effSet.toLowerCase() === 'long') {
      const effLong = require('../lists/effLong')
      wordlist = effLong.wordlist
      effSet = 'Long'
    } else if (effSet.toLowerCase() === 'potter') {
      const effHarryPotter = require('../lists/effHarryPotter')
      wordlist = effHarryPotter.wordlist
      effSet = 'Harry Potter'
    } else if (effSet.toLowerCase() === 'short') {
      const effShort = require('../lists/effShort')
      wordlist = effShort.wordlist
      effSet = 'Short'
    } else if (effSet.toLowerCase() === 'thrones') {
      const effGameOfThrones = require('../lists/effGameOfThrones')
      wordlist = effGameOfThrones.wordlist
      effSet = 'Game of Thrones'
    } else if (effSet.toLowerCase() === 'trek') {
      const effStarTrek = require('../lists/effStarTrek')
      wordlist = effStarTrek.wordlist
      effSet = 'Star Trek'
    } else if (effSet.toLowerCase() === 'wars') {
      const effStarWars = require('../lists/effStarWars')
      wordlist = effStarWars.wordlist
      effSet = 'Star Wars'
    } else {
      console.log('Unknown wordlist:', effSet)
      process.exit()
    }
  
    wordlist = main.uniquesOnly(wordlist)
  
    const assocArr = {}
    const entropy = main.getEntropy()
    const len = Math.ceil(entropy / Math.log2(wordlist.length))
    let pass = main.generatePass(len, wordlist, true, useEntropy)
  
    if (args.includes('-H') || args.includes('--hyphenate')) {
      pass = pass.split(' ').join('-')
    }
  
    assocArr.Generator = 'EFF'
    assocArr.Wordlist = effSet
    assocArr.Password = pass
    assocArr.Characters = pass.replace(/\s/g, '').length
    assocArr.Entropy = Math.floor(len * Math.log2(wordlist.length))
  
    return assocArr
  }
}
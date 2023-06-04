const args = process.argv.slice(2)
const main = require('./main')

module.exports = {
  /**
   * Generate an Alternate passphrase based on the chosen word list.
   * @param {boolean} useEntropy - Whether or not to use the data in the entropy file.
   * @returns {Object} An associative array of the generated passphrase and its meta.
   */
  genPass: function(useEntropy) {
    var combinedWords = function(lists) {
      const alternatePgp = require('../lists/alternatePgp')
      const alternatePokerware = require('../lists/alternatePokerware')
      const alternateVAN = require('../lists/alternateVAN')
      const alternateWordle = require('../lists/alternateWordle')
      const bitcoinEnglish = require('../lists/bitcoinEN')
      const dicewareNLP = require('../lists/dicewareNLP')
      const effDistant = require('../lists/effDistant')
      const effLong = require('../lists/effLong')
      const effShort = require('../lists/effShort')
  
      wordlist = alternatePgp.wordlist                        //  512 words
      wordlist = wordlist.concat(alternatePokerware.wordlist) // 5304 words
      wordlist = wordlist.concat(alternateVAN.wordlist[0])    //  432 words
      wordlist = wordlist.concat(alternateVAN.wordlist[1])    //  373 words
      wordlist = wordlist.concat(alternateVAN.wordlist[2])    //  402 words
      wordlist = wordlist.concat(alternateWordle.wordlist)    // 5790 words
      wordlist = wordlist.concat(bitcoinEnglish.wordlist)     // 2048 words
      wordlist = wordlist.concat(dicewareNLP.wordlist[0])     // 1296 words
      wordlist = wordlist.concat(dicewareNLP.wordlist[1])     // 7776 words
      wordlist = wordlist.concat(effDistant.wordlist)         // 1296 words
      wordlist = wordlist.concat(effLong.wordlist)            // 4000 words
      wordlist = wordlist.concat(effShort.wordlist)           // 1296 words
  
      if (lists === 'everything') {
        const alternateColors = require('../lists/alternateColors')
        const alternateEyeware = require('../lists/alternateEyeware')
        const alternateRockyou = require('../lists/alternateRockyou')
        const alternateSimpsons = require('../lists/alternateSimpsons')
        const alternateSkey = require('../lists/alternateSkey')
        const alternateTrump = require('../lists/alternateTrump')
        const dicewareBeale = require('../lists/dicewareBeale')
        const dicewareEnglish = require('../lists/dicewareEnglish')
        const effHarryPotter = require('../lists/effHarryPotter')
        const effGameOfThrones = require('../lists/effGameOfThrones')
        const effStarTrek = require('../lists/effStarTrek')
        const effStarWars = require('../lists/effStarWars')
  
        wordlist = wordlist.concat(alternateColors.wordlist)    // 1029 words
        wordlist = wordlist.concat(alternateEyeware.wordlist)   // 8192 words
        wordlist = wordlist.concat(alternateRockyou.wordlist)   // 7776 words
        wordlist = wordlist.concat(alternateSimpsons.wordlist)  // 5000 words
        wordlist = wordlist.concat(alternateSkey.wordlist)      // 2048 words
        wordlist = wordlist.concat(alternateTrump.wordlist)     // 8192 words
        wordlist = wordlist.concat(dicewareEnglish.wordlist)    // 8192 words
        wordlist = wordlist.concat(dicewareBeale.wordlist)      // 7776 words
        wordlist = wordlist.concat(effGameOfThrones.wordlist)   // 4000 words
        wordlist = wordlist.concat(effHarryPotter.wordlist)     // 4000 words
        wordlist = wordlist.concat(effStarTrek.wordlist)        // 4000 words
        wordlist = wordlist.concat(effStarWars.wordlist)        // 4000 words
      } else if (lists == 'common') {
        wordlist = wordlist.map(v => v.toLowerCase()) // Lowercase every character.
      }
  
      return wordlist
    }
    let altSet
    let wordlist = []
  
    if (args.includes('-a') || args.includes('--alternate')) {
      const option = args.findIndex((option) => option === '-a' || option === '--alternate')
      altSet = args[option + 1]
    } else {
      altSet = 'Common'
    }
  
    if (altSet.toLowerCase() === 'acronym') {
      wordlist = combinedWords('everything')
      wordlist = wordlist.filter(element => /^[a-z]+$/gi.test(element))
      altSet = 'Acronym'
    } else if (altSet.toLowerCase() === 'afrikaans') {
      const alternateAfrikaans = require('../lists/alternateAfrikaans')
      wordlist = alternateAfrikaans.wordlist
      altSet = 'Afrikaans'
    } else if (altSet.toLowerCase() === 'belarusian') {
      const alternateBelarusian = require('../lists/alternateBelarusian')
      wordlist = alternateBelarusian.wordlist
      altSet = 'Belarusian'
    } else if (altSet.toLowerCase() === 'colors') {
      const alternateColors = require('../lists/alternateColors')
      wordlist = alternateColors.wordlist
      altSet = 'Colors'
    } else if (altSet.toLowerCase() === 'common') {
      wordlist = combinedWords('common')
      altSet = 'Common Words Only'
    } else if (altSet.toLowerCase() === 'croatian') {
      const alternateCroatian = require('../lists/alternateCroatian')
      wordlist = alternateCroatian.wordlist
      altSet = 'Croatian'
    } else if (altSet.toLowerCase() === 'deseret') {
      const alternateDeseret = require('../lists/alternateDeseret')
      wordlist = alternateDeseret.wordlist
      altSet = 'Deseret'
    } else if (altSet.toLowerCase() === 'elvish') {
      const alternateElvish = require('../lists/alternateElvish')
      wordlist = alternateElvish.wordlist
      altSet = 'Elvish'
    } else if (altSet.toLowerCase() === 'everything') {
      wordlist = combinedWords('everything')
      altSet = 'Every Word List'
    } else if (altSet.toLowerCase() === 'klingon') {
      const alternateKlingon = require('../lists/alternateKlingon')
      wordlist = alternateKlingon.wordlist
      altSet = 'Klingon'
    } else if (altSet.toLowerCase() === 'lotr') {
      const alternateEyeware = require('../lists/alternateEyeware')
      wordlist = alternateEyeware.wordlist
      altSet = 'LOTR'
    } else if (altSet.toLowerCase() === 'mongolian') {
      const alternateMongolian = require('../lists/alternateMongolian')
      wordlist = alternateMongolian.wordlist
      altSet = 'Mongolian'
    } else if (altSet.toLowerCase() === 'pgp') {
      const alternatePgp = require('../lists/alternatePgp')
      wordlist = alternatePgp.wordlist
      altSet = 'PGP'
    } else if (altSet.toLowerCase() === 'pokerware') {
      const alternatePokerware = require('../lists/alternatePokerware')
      wordlist = alternatePokerware.wordlist
      altSet = 'Pokerware'
    } else if (altSet.toLowerCase() === 'rockyou') {
      const alternateRockyou = require('../lists/alternateRockyou')
      wordlist = alternateRockyou.wordlist
      altSet = 'RockYou'
    } else if (altSet.toLowerCase() === 'serbian') {
      const alternateSerbian = require('../lists/alternateSerbian')
      wordlist = alternateSerbian.wordlist
      altSet = 'Serbian'
    } else if (altSet.toLowerCase() === 'shavian') {
      const alternateShavian = require('../lists/alternateShavian')
      wordlist = alternateShavian.wordlist
      altSet = 'Shavian'
    } else if (altSet.toLowerCase() === 'simpsons') {
      const alternateSimpsons = require('../lists/alternateSimpsons')
      wordlist = alternateSimpsons.wordlist
      altSet = 'Simpsons'
    } else if (altSet.toLowerCase() === 's/key') {
      const alternateSkey = require('../lists/alternateSkey')
      wordlist = alternateSkey.wordlist
      altSet = 'S/KEY'
    } else if (altSet.toLowerCase() === 'trump') {
      const alternateTrump = require('../lists/alternateTrump')
      wordlist = alternateTrump.wordlist
      altSet = 'Trump'
    } else if (altSet.toLowerCase() === 'ukranian') {
      const alternateUkranian = require('../lists/alternateUkranian')
      wordlist = alternateUkranian.wordlist
      altSet = 'Ukranian'
    } else if (altSet.toLowerCase() === 'van') {
      const alternateVAN = require('../lists/alternateVAN')
      wordlist = alternateVAN.wordlist
      altSet = 'VAN'
    } else if (altSet.toLowerCase() === 'wordle') {
      const alternateWordle = require('../lists/alternateWordle')
      wordlist = alternateWordle.wordlist
      altSet = 'Wordle'
    } else {
      console.log('Unknown wordlist:', altSet)
      process.exit(1)
    }
  
    wordlist = main.uniquesOnly(wordlist)
  
    const assocArr = {}
    const entropy = main.getEntropy()
    const setSize = wordlist[0].length + wordlist[1].length + wordlist[2].length
    let pass = ''
  
    if (wordlist.filter(Array.isArray).length === 3) {
      // We're working on the 'Verb, Adjective, Noun' list
      const vanEntropy = Math.log2(wordlist[0].length * wordlist[1].length * wordlist[2].length)
      const len = Math.ceil(entropy / vanEntropy)
      let vans = []
  
      for (let i = 0; i < len; i++) {
        vans[i]  = main.generatePass(1, wordlist[0], true, useEntropy)
        vans[i] += main.generatePass(1, wordlist[1], true, useEntropy)
        vans[i] += main.generatePass(1, wordlist[2], true, useEntropy)
      }
  
      pass = vans.join(" ")
      assocArr.Entropy = Math.floor(len * vanEntropy)
      assocArr.SetSize = setSize.toLocaleString() + " words"
    } else if (altSet.toLowerCase() === 'acronym') {
      let counter = 4
      let results
  
      do {
        results = this.acronym(counter, wordlist, useEntropy)
        counter++
      } while (results.security < entropy)
  
      pass = results.passphrase.trim()
      assocArr.SetSize = wordlist.length.toLocaleString() + " words"
    } else {
      const len = Math.ceil(entropy / Math.log2(wordlist.length))
  
      pass = main.generatePass(len, wordlist, true, useEntropy)
      assocArr.Entropy = Math.floor(len * Math.log2(wordlist.length))
      assocArr.SetSize = wordlist.length.toLocaleString() + " words"
    }
  
    if (args.includes('-H') || args.includes('--hyphenate')) {
      pass = pass.split(' ').join('-')
    }
  
    assocArr.Generator = 'Alternate'
    assocArr.Wordlist = altSet
    assocArr.Password = pass
    assocArr.Characters = pass.replace(/\s/g, '').length
  
    return assocArr
  },
  
  /**
   * Generate a passphrase built up from an acronym.
   * @param {Number} wordCount - The number of words in the passphrase.
   * @param {Array} wordlist - A list of words to choose from.
   * @param {Boolean} useEntropy - Boolean to use collected entropy.
   * @return {Object} - Dictionary containing the passphrase and its security.
   */
  acronym: function(wordCount, wordlist, useEntropy) {
    var getSecurity = function (entropyList) {
      let total = 0
  
      for (let i = 0; i < entropyList.length; i++) {
        total += Math.log2(entropyList[i])
      }
  
      return Math.floor(total)
    }
  
    const candidates = []
  
    for (let i = 0; i < wordlist.length; i++) {
      if (wordlist[i].length === wordCount) {
        candidates.push(wordlist[i])
      }
    }
  
    const num = main.secRand(candidates.length, useEntropy)
    const acronym = candidates[num]
    const entropies = []
    const passphraseWords = []
  
    for (let i = 0; i < acronym.length; i++) {
      const candidates = []
  
      for (let j = 0; j < wordlist.length; j++) {
        if (wordlist[j].charAt(0).toLowerCase() === acronym[i].charAt(0).toLowerCase()) {
          candidates.push(wordlist[j])
        }
      }
  
      const word = candidates[main.secRand(candidates.length, useEntropy)]
      passphraseWords.push(word)
      entropies.push(candidates.length)
    }
  
    for (let i = 0; i < passphraseWords.length; i++) {
      const word = passphraseWords[i]
  
      if (args.includes('-j') || args.includes('--json')) {
          passphraseWords[i] = word
      } else {
        /**
         * https://en.wikipedia.org/wiki/ANSI_escape_code#Colors
         * \x1b[CODE
         */
          passphraseWords[i] = '\x1b[31m' + word[0] + '\x1b[0m' + word.substring(1) 
      }
    }
  
    const security = getSecurity(entropies)
    const passphrase = passphraseWords.join(' ')
  
    return {passphrase, security}
  }
}
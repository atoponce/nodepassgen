const args = process.argv.slice(2)
const main = require('./main')

module.exports = {
  /**
   * Generate a Diceware passphrase based on the chosen language word list.
   * @param {boolean} useEntropy - Whether or not to use the data in the entropy file.
   * @returns {Object} An associative array of the generated passphrase and its meta.
   */
  generateDiceware: function(useEntropy) {
    let lang
    let wordlist = []
  
    if (args.includes('-d') || args.includes('--diceware')) {
      const option = args.findIndex((option) => option === '-d' || option === '--diceware')
      lang = args[option + 1]
    } else {
      lang = 'English'
    }
  
    if (lang.toLowerCase() === 'basque') {
      const dicewareBasque = require('../lists/dicewareBasque')
      wordlist = dicewareBasque.wordlist
      lang = 'Basque'
    } else if (lang.toLowerCase() === 'beale') {
      const dicewareBeale = require('../lists/dicewareBeale')
      wordlist = dicewareBeale.wordlist
      lang = 'Beale'
    } else if (lang.toLowerCase() === 'bulgarian') {
      const dicewareBulgarian = require('../lists/dicewareBulgarian')
      wordlist = dicewareBulgarian.wordlist
      lang = 'Bulgarian'
    } else if (lang.toLowerCase() === 'catalan') {
      const dicewareCatalan = require('../lists/dicewareCatalan')
      wordlist = dicewareCatalan.wordlist
      lang = 'Catalan'
    } else if (lang.toLowerCase() === 'chinese') {
      const dicewareChinese = require('../lists/dicewareChinese')
      wordlist = dicewareChinese.wordlist
      lang = 'Chinese'
    } else if (lang.toLowerCase() === 'czech') {
      const dicewareCzech = require('../lists/dicewareCzech')
      wordlist = dicewareCzech.wordlist
      lang = 'Czech'
    } else if (lang.toLowerCase() === 'danish') {
      const dicewareDanish = require('../lists/dicewareDanish')
      wordlist = dicewareDanish.wordlist
      lang = 'Danish'
    } else if (lang.toLowerCase() === 'dutch') {
      const dicewareDutch = require('../lists/dicewareDutch')
      wordlist = dicewareDutch.wordlist
      lang = 'Dutch'
    } else if (lang.toLowerCase() === 'english') {
      const dicewareEnglish = require('../lists/dicewareEnglish')
      wordlist = dicewareEnglish.wordlist
      lang = 'English'
    } else if (lang.toLowerCase() === 'esperanto') {
      const dicewareEsperanto = require('../lists/dicewareEsperanto')
      wordlist = dicewareEsperanto.wordlist
      lang = 'Esperanto'
    } else if (lang.toLowerCase() === 'estonian') {
      const dicewareEstonian = require('../lists/dicewareEstonian')
      wordlist = dicewareEstonian.wordlist
      lang = 'Estonian'
    } else if (lang.toLowerCase() === 'finnish') {
      const dicewareFinnish = require('../lists/dicewareFinnish')
      wordlist = dicewareFinnish.wordlist
      lang = 'Finnish'
    } else if (lang.toLowerCase() === 'french') {
      const dicewareFrench = require('../lists/dicewareFrench')
      wordlist = dicewareFrench.wordlist
      lang = 'French'
    } else if (lang.toLowerCase() === 'german') {
      const dicewareGerman = require('../lists/dicewareGerman')
      wordlist = dicewareGerman.wordlist
      lang = 'German'
    } else if (lang.toLowerCase() === 'greek') {
      const dicewareGreek = require('../lists/dicewareGreek')
      wordlist = dicewareGreek.wordlist
      lang = 'Greek'
    } else if (lang.toLowerCase() === 'hebrew') {
      const dicewareHebrew = require('../lists/dicewareHebrew')
      wordlist = dicewareHebrew.wordlist
      lang = 'Hebrew'
    } else if (lang.toLowerCase() === 'hungarian') {
      const dicewareHungarian = require('../lists/dicewareHungarian')
      wordlist = dicewareHungarian.wordlist
      lang = 'Hungarian'
    } else if (lang.toLowerCase() === 'italian') {
      const dicewareItalian = require('../lists/dicewareItalian')
      wordlist = dicewareItalian.wordlist
      lang = 'Italian'
    } else if (lang.toLowerCase() === 'japanese') {
      const dicewareJapanese = require('../lists/dicewareJapanese')
      wordlist = dicewareJapanese.wordlist
      lang = 'Japanese'
    } else if (lang.toLowerCase() === 'latin') {
      const dicewareLatin = require('../lists/dicewareLatin')
      wordlist = dicewareLatin.wordlist
      lang = 'Latin'
    } else if (lang.toLowerCase() === 'maori') {
      const dicewareMaori = require('../lists/dicewareMaori')
      wordlist = dicewareMaori.wordlist
      lang = 'Maori'
    } else if (lang.toLowerCase() === 'nlp') {
      const dicewareNLP = require('../lists/dicewareNLP')
      wordlist = dicewareNLP.wordlist
      lang = 'NLP'
    } else if (lang.toLowerCase() === 'norwegian') {
      const dicewareNorwegian = require('../lists/dicewareNorwegian')
      wordlist = dicewareNorwegian.wordlist
      lang = 'Norwegian'
    } else if (lang.toLowerCase() === 'polish') {
      const dicewarePolish = require('../lists/dicewarePolish')
      wordlist = dicewarePolish.wordlist
      lang = 'Polish'
    } else if (lang.toLowerCase() === 'portuguese') {
      const dicewarePortuguese = require('../lists/dicewarePortuguese')
      wordlist = dicewarePortuguese.wordlist
      lang = 'Portuguese'
    } else if (lang.toLowerCase() === 'romanian') {
      const dicewareRomanian = require('../lists/dicewareRomanian')
      wordlist = dicewareRomanian.wordlist
      lang = 'Romanian'
    } else if (lang.toLowerCase() === 'russian') {
      const dicewareRussian = require('../lists/dicewareRussian')
      wordlist = dicewareRussian.wordlist
      lang = 'Russian'
    } else if (lang.toLowerCase() === 'slovak') {
      const dicewareSlovak = require('../lists/dicewareSlovak')
      wordlist = dicewareSlovak.wordlist
      lang = 'Slovak'
    } else if (lang.toLowerCase() === 'slovenian') {
      const dicewareSlovenian = require('../lists/dicewareSlovenian')
      wordlist = dicewareSlovenian.wordlist
      lang = 'Slovenian'
    } else if (lang.toLowerCase() === 'spanish') {
      const dicewareSpanish = require('../lists/dicewareSpanish')
      wordlist = dicewareSpanish.wordlist
      lang = 'Spanish'
    } else if (lang.toLowerCase() === 'swedish') {
      const dicewareSwedish = require('../lists/dicewareSwedish')
      wordlist = dicewareSwedish.wordlist
      lang = 'Swedish'
    } else if (lang.toLowerCase() === 'turkish') {
      const dicewareTurkish = require('../lists/dicewareTurkish')
      wordlist = dicewareTurkish.wordlist
      lang = 'Turkish'
    } else {
      console.log('Unknown language:', lang)
      process.exit(1)
    }
  
    wordlist = main.uniquesOnly(wordlist)
  
    const assocArr = {}
    const entropy = main.getEntropy()
    let pass = []
    let len = 0
  
    if (wordlist.filter(Array.isArray).length === 2) {
      // We're working on the 'Natural Language Passwords' list
      const len1 = Math.ceil(entropy / Math.log2(wordlist[0].length)) // adjectives
      const len2 = Math.ceil(entropy / Math.log2(wordlist[1].length)) // nouns
  
      const adjs = main.generatePass(len1, wordlist[0], true, useEntropy).split(' ')
      const nouns = main.generatePass(len2, wordlist[1], true, useEntropy).split(' ')

      const setSize = wordlist[0].length + wordlist[1].length
  
      let bits = 0
      let counter = 0
  
      while (bits <= entropy) {
        // building up the password alternating: adj-noun-adj-noun-...
        if (counter % 2 === 0) {
          pass.push(adjs[counter])
          bits += Math.log2(wordlist[0].length)
        } else {
          pass.push(nouns[counter])
          bits += Math.log2(wordlist[1].length)
        }
  
        counter++
      }

      if (pass.length & 1 === 1) { // adj_1, noun_1, ..., adj_n
        pass.unshift(pass.pop())   // adj_n, adj_1, noun_1, ...
      }
  
      pass = pass.join(' ')
      assocArr.SetSize = setSize.toLocaleString() + " words"
    } else {
      // Every other Diceware word list.
      len = Math.ceil(entropy / Math.log2(wordlist.length))
      pass = main.generatePass(len, wordlist, true, useEntropy)
      assocArr.SetSize = wordlist.length.toLocaleString() + " words"
    }
  
    if (args.includes('-H') || args.includes('--hyphenate')) {
      pass = pass.split(' ').join('-')
    }
  
    assocArr.Generator = 'Diceware'
    assocArr.Wordlist = lang
    assocArr.Password = pass
    assocArr.Characters = pass.replace(/\s/g, '').length
    assocArr.Entropy = Math.floor(len * Math.log2(wordlist.length))
  
    return assocArr
  }
}
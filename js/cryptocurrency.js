const args = process.argv.slice(2)
const main = require('./main')
const crypto = require('crypto')

module.exports = {
  /**
   * Generate a Bitcoin BIPS39-compliante passphrase (seed). Contains checksum.
   * @param {boolean} useEntropy - Whether or not to use the data in the entropy file.
   * @returns {Object} An associative array of the generated passphrase and its meta.
   */
  bitcoin: function(useEntropy) {
    let lang
    let pass = ''
    let wordlist = []
  
    if (args.includes('-b') || args.includes('--bitcoin')) {
      const option = args.findIndex((option) => option === '-b' || option === '--bitcoin')
      lang = args[option + 1]
    } else {
      lang = 'English'
    }
  
    if (lang.toLowerCase() === 'chinese') {
      if (args.includes('-t') || args.includes('--traditional')) {
        const bitcoinCNTrad = require('../lists/bitcoinCNTrad')
        wordlist = bitcoinCNTrad.wordlist
        lang = 'Chinese (Trad)'
      } else {
        const bitcoinCNSimp = require('../lists/bitcoinCNSimp')
        wordlist = bitcoinCNSimp.wordlist
        lang = 'Chinese (Simp)'
      }
    } else if (lang.toLowerCase() === 'czech') {
      const czechWordlist = require('../lists/bitcoinCZ')
      wordlist = czechWordlist.wordlist
      lang = 'Czech'
    } else if (lang.toLowerCase() === 'english') {
      const englishWordlist = require('../lists/bitcoinEN')
      wordlist = englishWordlist.wordlist
      lang = 'English'
    } else if (lang.toLowerCase() === 'french') {
      const frenchWordlist = require('../lists/bitcoinFR')
      wordlist = frenchWordlist.wordlist
      lang = 'French'
    } else if (lang.toLowerCase() === 'italian') {
      const italianWordlist = require('../lists/bitcoinIT')
      wordlist = italianWordlist.wordlist
      lang = 'Italian'
    } else if (lang.toLowerCase() === 'japanese') {
      const japaneseWordlist = require('../lists/bitcoinJP')
      wordlist = japaneseWordlist.wordlist
      lang = 'Japanese'
    } else if (lang.toLowerCase() === 'korean') {
      const koreanWordlist = require('../lists/bitcoinKR')
      wordlist = koreanWordlist.wordlist
      lang = 'Korean'
    } else if (lang.toLowerCase() === 'portuguese') {
      const portugueseWordlist = require('../lists/bitcoinPT')
      wordlist = portugueseWordlist.wordlist
      lang = 'Portuguese'
    } else if (lang.toLowerCase() === 'spanish') {
      const spanishWordlist = require('../lists/bitcoinES')
      wordlist = spanishWordlist.wordlist
      lang = 'Spanish'
    } else {
      console.log('Unknown language:', lang)
      process.exit(1)
    }
  
    wordlist = main.uniquesOnly(wordlist)
  
    var bytesToBinary = function (bytes) {
      let total = BigInt(0)
  
      for (let i = 0; i < bytes.length; i++) {
        total |= BigInt(bytes[i] * 256 ** (bytes.length - i - 1))
      }
  
      return total.toString(2)
    }
  
    const assocArr = {}
    const entropy = main.getEntropy()
    const requiredEntropy = Math.ceil(entropy / 32) * 32 // Multiple of 32 bits, per the bip39 spec
    const entropyBuffer = new Uint8Array(Math.ceil(requiredEntropy / 8))
  
    for (let i = 0; i < entropyBuffer.length; i++) {
      entropyBuffer[i] = main.secRand(256, useEntropy)
    }
  
    const digest = crypto.createHash('sha256').update(entropyBuffer).digest()
    const entropyBits = bytesToBinary(entropyBuffer).padStart(requiredEntropy, '0')
    const checkBits = bytesToBinary(digest)
      .padStart(256, '0')
      .substr(0, 11 - (requiredEntropy % 11))
    const allBits = entropyBits + checkBits
  
    const bitWords = allBits.match(/(.{1,11})/g)
    const words = bitWords.map(function (binary) {
      return wordlist[parseInt(binary, 2)]
    })
  
    pass = words.join(' ')
  
    const len = Math.ceil(entropy / Math.log2(wordlist.length))
  
    if (args.includes('-H') || args.includes('--hyphenate')) {
      pass = pass.split(' ').join('-')
    }
  
    assocArr.Generator = 'Bitcoin'
    assocArr.Wordlist = lang
    assocArr.Password = pass
    assocArr.Characters = pass.replace(/\s/g, '').length
    assocArr.Entropy = requiredEntropy
    assocArr.Checksum = true
    assocArr.SetSize = wordlist.length.toLocaleString() + " words"
  
    return assocArr
  },
  
  /**
   * Generate a Monero-compliant passphrase (seed). Contains checksum.
   * @param {boolean} useEntropy - Whether or not to use the data in the entropy file.
   * @returns {Object} An associative array of the generated passphrase and its meta.
   */
  monero: function(useEntropy) {
    /**
     * Calculate the CRC32 of a string.
     * @param {string} string - The string to calculate.
     * @returns {number} A 32-bit integer.
     */
    var crc32 = function (str) {
      // https://gist.github.com/lenqwang/1be7b4843a580f2c1df84d5360e5e88c
      let crc = 0 ^ -1
      const crcTable = []
  
      for (let i = 0; i < 256; i++) {
        let c = i
  
        for (let j = 0; j < 8; j++) {
          c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
        }
  
        crcTable[i] = c
      }
  
      for (let i = 0; i < str.length; i++) {
        crc = (crc >>> 8) ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xff]
      }
  
      return (crc ^ -1) >>> 0
    }
  
    let lang
    let pass = ''
    let wordlist = []
  
    if (args.includes('-M') || args.includes('--monero')) {
      const option = args.findIndex((option) => option === '-M' || option === '--monero')
      lang = args[option + 1]
    } else {
      lang = 'English'
    }
  
    if (lang.toLowerCase() === 'chinese') {
      const moneroCN = require('../lists/moneroCN')
      wordlist = moneroCN.wordlist
      lang = 'Chinese'
    } else if (lang.toLowerCase() === 'dutch') {
      const dutchWordlist = require('../lists/moneroNL')
      wordlist = dutchWordlist.wordlist
      lang = 'Czech'
    } else if (lang.toLowerCase() === 'english') {
      const englishWordlist = require('../lists/moneroEN')
      wordlist = englishWordlist.wordlist
      lang = 'English'
    } else if (lang.toLowerCase() === 'esperanto') {
      const esperantoWordlist = require('../lists/moneroEO')
      wordlist = esperantoWordlist.wordlist
      lang = 'Esperanto'
    } else if (lang.toLowerCase() === 'french') {
      const frenchWordlist = require('../lists/moneroFR')
      wordlist = frenchWordlist.wordlist
      lang = 'French'
    } else if (lang.toLowerCase() === 'german') {
      const germanWordlist = require('../lists/moneroDE')
      wordlist = germanWordlist.wordlist
      lang = 'German'
    } else if (lang.toLowerCase() === 'italian') {
      const italianWordlist = require('../lists/moneroIT')
      wordlist = italianWordlist.wordlist
      lang = 'Italian'
    } else if (lang.toLowerCase() === 'japanese') {
      const japaneseWordlist = require('../lists/moneroJP')
      wordlist = japaneseWordlist.wordlist
      lang = 'Japanese'
    } else if (lang.toLowerCase() === 'lojban') {
      const lojbanWordlist = require('../lists/moneroJBO')
      wordlist = lojbanWordlist.wordlist
      lang = 'Lojban'
    } else if (lang.toLowerCase() === 'portuguese') {
      const portugueseWordlist = require('../lists/moneroPT')
      wordlist = portugueseWordlist.wordlist
      lang = 'Portuguese'
    } else if (lang.toLowerCase() === 'russian') {
      const russianWordlist = require('../lists/moneroRU')
      wordlist = russianWordlist.wordlist
      lang = 'Russian'
    } else if (lang.toLowerCase() === 'spanish') {
      const spanishWordlist = require('../lists/moneroES')
      wordlist = spanishWordlist.wordlist
      lang = 'Spanish'
    } else {
      console.log('Unknown language:', lang)
      process.exit(1)
    }
  
    wordlist = main.uniquesOnly(wordlist)  // Force unique elements in array.
  
    const assocArr = {}
    const entropy = Math.ceil(main.getEntropy() / 32) * 32 // Multiple of 32 bits
    const len = Math.ceil(entropy / Math.log2(wordlist.length))
  
    pass = main.generatePass(len, wordlist, true, useEntropy).split(' ')
  
    let prefixes = ''
  
    for (let i = 0; i < pass.length; i++) {
      prefixes += pass[i].substring(0, 3)
    }
  
    const checksum = crc32(prefixes)
    const checkWord = pass[checksum % pass.length]
  
    pass.push(checkWord)
    pass = pass.join(' ')
  
    if (args.includes('-H') || args.includes('--hyphenate')) {
      pass = pass.split(' ').join('-')
    }
  
    assocArr.Generator = 'Monero'
    assocArr.Wordlist = lang
    assocArr.Password = pass
    assocArr.Characters = pass.replace(/\s/g, '').length
    assocArr.Entropy = entropy
    assocArr.Checksum = true
    assocArr.SetSize = wordlist.length.toLocaleString() + " words"
  
    return assocArr
  }
}
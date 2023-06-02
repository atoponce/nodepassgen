const fs = require('fs')
const main = require('./main')

module.exports = {
  /**
   * Collect raw keyboard timing input from the user. Generate some helper text
   * for the user to type from the Scripps National Spelling Bee word list.
   * @param {Object} entropyFile - The file containing the entropy data.
   */
  collectInput: function(entropyFile) {
    const readline = require('readline')
    const alternateScripps = require('../lists/alternateScripps')
    const wordlist = alternateScripps.wordlist

    let input = ''
    let words = ''
    let lastKey = ''
    let lastKeyTime = 0
    const ns = []
    const challenge = this.shuffle(wordlist)
  
    for (let i = 0; i < 100; i++) {
      words += challenge[i]
      words += ' '
    }
  
    console.log(
      `
      Type, not paste these 100 words. Be as accurate as possible, but don't stress it.
      Entropy is calculated on keypress timings, not the content itself.
      Entropy is saved in ` +
        entropyFile +
        `. Type <ctrl>-<c> when finished.`
    )
    console.log()
    console.log(words)
    console.log()
  
    readline.emitKeypressEvents(process.stdin)
    process.stdin.setRawMode(true)
  
    process.stdin.on('keypress', (str, key) => {
      /**
       * Preventing long-press key repeats, forcing users to type individual
       * keys. I want the user's neural chaotic entropy, not the system's
       * interrupt requests.
       *
       * The fastest typists in the world regularly clock in above 200 wpm. If an
       * English word averages 5 characters, that's 1,000 characters per minute,
       * or about 17 characters per second. At 17 characters per second, that's a
       * 60 ms delay between key presses on average.
       *
       * The average English typist however is approximately 40 words or 200
       * characters per minute. That's about 3 characters per second, or about
       * 300 ms delay between key presses.
       *
       * Quick table:
       *
       * |  wpm  |  cpm  |  cps  | Delay  |
       * | :---: | :---: | :---: | :----: |
       * |   40  |  200  |  3.33 | 300 ms | <- average typist
       * |   60  |  300  |   5   | 200 ms |
       * |   80  |  400  |  6.66 | 150 ms |
       * |  100  |  500  |  8.33 | 120 ms | <- my personal typing average
       * |  120  |  600  |   10  | 100 ms |
       * |  140  |  700  | 11.66 |  86 ms |
       * |  160  |  800  | 13.33 |  75 ms |
       * |  180  |  900  |   15  |  67 ms |
       * |  200  | 1000  | 16.66 |  60 ms |
       * |  220  | 1100  | 18.33 |  55 ms | <- current typing speed records
       * |  240  | 1200  |   20  |  50 ms |
       *
       * The "Big Three" operating systems all have 30 ms default key repeat
       * delays:
       *
       *   * Windows: 250 ms initial delay, 30 ms repeat
       *   * Mac: 225 ms initial delay, 30 ms repeat
       *   * Linux (GNOME): 500 ms initial delay, 30 ms repeat
       *
       * I couldn't figure out if NodeJS had an API for catching and disabling
       * key repeats, so I asked for help:
       * https://stackoverflow.com/q/68369655/868868. NodeJS really should have a
       * boolean to toggle for catching keypress repeats.
       *
       * Typing at 200 wpm or faster is unlikely given current typing records,
       * and 60 ms still will catch operating system key press repeats.
       */
      if (lastKey == key.sequence && new Date().getTime() - lastKeyTime < 60) {
        lastKeyTime = new Date().getTime()
        return
      }
  
      process.stdout.write(str)
      ns.push(process.hrtime.bigint() & 0xffffn) // least significant 16-bits (65536 nanoseconds)
  
      lastKey = key.sequence
      lastKeyTime = new Date().getTime()
  
      if (key.name === 'return') {
        process.stdout.write('\n')
      }
  
      if (key.ctrl && key.name === 'c') {
        let ent
        let bitstr = module.exports.processEntropy(ns)
  
        try {
          entropy = JSON.parse(fs.readFileSync(entropyFile, 'utf8'))
        } catch (err) {
          entropy = []
        }
  
        const div = Math.floor(bitstr.length / 16)
  
        for (let i = 0; i < div; i++) {
          entropy.push(parseInt(bitstr.substr(16 * i, 16), 2))
        }
  
        try {
          fs.writeFileSync(entropyFile, JSON.stringify(entropy))
        } catch (err) {
          console.error(err)
        }
  
        process.exit(0)
      }
    })
  },
  
  /**
   * Debias the bitstring using the John von Neumann debias algorithm.
   * @param {number} bits - The bits that need dibasing.
   * @returns {number} The debiased bits.
   */
  debias: function(bits) {
    let bitstr = ''
  
    for (let i = 0; i < 8; i++) {
      let pair = (bits >> BigInt(14 - 2 * i)) & 0x3n
  
      if (pair === 1n || pair === 2n) {
        bitstr += pair >> 1n
      }
    }
  
    return bitstr
  },
  
  /**
   * Collect and debias raw entropy from the keyboard.
   * @param {Array} arr - An array containing raw data that needs to be debiased.
   * @returns {string} The debiased data.
   */
  processEntropy: function(arr) {
    let unbiasedBitstr = ''
  
    for (let i = 0; i < arr.length; i++) {
      unbiasedBitstr += module.exports.debias(arr[i])
    }
  
    return unbiasedBitstr
  },
  
  /**
   * Shuffle an array using the Fisher-Yates shuffle with a CSPRNG.
   * @param {Array} array - An array to shuffle the contents of.
   * @returns {Array} The shuffled array.
   */
  shuffle: function(array) {
    let counter = array.length
  
    while (counter > 0) {
      const index = main.secRand(counter, false)
      counter--
      [array[counter], array[index]] = [array[index], array[counter]]
    }
  
    return array
  }
}
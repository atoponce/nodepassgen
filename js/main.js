const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const args = process.argv.slice(2)

module.exports = {
  entropyFile: path.join(
    process.platform === 'win32' ? process.env.HOMEpath : process.env.HOME,
    'nodepassgen.json'
  ),
  
  /**
   * Get minimum entropy margin in bits from the user.
   * @returns {number} Entropy in bits.
   */
  getEntropy: function() {
    let entropy = 72

    if (args.includes('-m') || args.includes('--min-entropy')) {
      const option = args.findIndex((option) => option === '-m' || option === '--min-entropy')
      entropy = Number(args[option + 1])
    }

    if (entropy < 48 || entropy === undefined) {
      console.log('Security value too low. Must be at least 48-bits.')
      process.exit(1)
    } else {
      return entropy
    }
  },

  /**
   * The critical password generation function. Generates a password from a given set of data.
   * @param {number} len - How many characters/words to pick.
   * @param {string|Array} set - The data to pick from.
   * @param {boolean} spaces - Whether or not to include spaces in the password.
   * @param {boolean} useEntropy - Whether or not to use the data in the entropy file.
   * @returns {string} The generated password.
   */
  generatePass: function(len, set, spaces, useEntropy) {
    let pass = ''
    let passArr = ''

    if (typeof set === 'string') {
      passArr = set.split('')
    } else {
      passArr = set
    }

    for (let i = len; i--; ) {
      if (spaces) {
        pass += passArr[this.secRand(set.length, useEntropy)]
        pass += ' '
      } else {
        pass += passArr[this.secRand(set.length, useEntropy)]
      }
    }

    return pass
  },

  /**
   * A cryptographically secure random number generator.
   * @param {number} count - The max number a random number can be.
   * @param {boolean} useEntropy - Whether or not to use the data in the entropy file.
   * @returns {number} Uniform random number.
   */
  secRand: function(count, useEntropy) {
    let rand = 0
    let num = 0
    const min = 2 ** 16 % count

    if (useEntropy) {
      try {
        const entropy = JSON.parse(fs.readFileSync(this.entropyFile, 'utf8'))
    
        if (entropy.length > 0) {
          num = entropy[0]
          entropy.shift()
      
          try {
            fs.writeFileSync(this.entropyFile, JSON.stringify(entropy))
          } catch (err) {
            console.error(err)
          }
        }
      } catch (err) {
        console.error(err)
      }
    }

    do {
      rand = crypto.randomBytes(2)
      num ^= (rand[0] << 8 | rand[1])
    } while (num < min)

    return num % count
  },
  
  /**
   * Remove any and all duplicates from an array. Case sensitive.
   * @param {Array} list - An array of strings or numbers which might contain duplicates.
   * @returns {Array} The array with duplicates removed.
   */
  uniquesOnly: function(list) {
    // enforce unique elements in array
    return [...new Set(list)]
  }
}
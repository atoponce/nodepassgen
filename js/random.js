const args = process.argv.slice(2)
const main = require('./main')

module.exports = {
  /**
   * Generate a random meaningless password string.
   * @param {number} b - A number base.
   * @param {boolean} useEntropy - Whether or not to use the entropy in the data file.
   * @returns {Object} An associative array of the generated password and its meta.
   */
  getSet: function(b, useEntropy) {
    const entropy = main.getEntropy()
    const assocArr = {}
    let checksum = false
    let ident = ''
    let s = ''
  
    if (b == 256) {
      s = 'ḀḁḂḃḄḅḆḇḈḉḊḋḌḍḎḏḐḑḒḓḔḕḖḗḘḙḚḛḜḝḞḟḠḡḢḣḤḥḦḧḨḩḪḫḬḭḮḯḰḱḲḳḴḵḶḷḸḹḺḻḼḽḾḿ'
      s += 'ṀṁṂṃṄṅṆṇṈṉṊṋṌṍṎṏṐṑṒṓṔṕṖṗṘṙṚṛṜṝṞṟṠṡṢṣṤṥṦṧṨṩṪṫṬṭṮṯṰṱṲṳṴṵṶṷṸṹṺṻṼṽṾṿ'
      s += 'ẀẁẂẃẄẅẆẇẈẉẊẋẌẍẎẏẐẑẒẓẔẕẖẗẘẙẚẛẜẝẞẟẠạẢảẤấẦầẨẩẪẫẬậẮắẰằẲẳẴẵẶặẸẹẺẻẼẽẾế'
      s += 'ỀềỂểỄễỆệỈỉỊịỌọỎỏỐốỒồỔổỖỗỘộỚớỜờỞởỠỡỢợỤụỦủỨứỪừỬửỮữỰựỲỳỴỵỶỷỸỹỺỻỼỽỾỿ'
      ident = 'Latin Extended'
    } else if (b === 220) {
      for (let i = 0; i < 94; i++) {
        // Standard ASCII
        s += String.fromCharCode(33 + i)
      }
      // Excludes Unicode U+F8FF in the Corporate Private Use Area for the Apple logo
      s += 'ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæ'
      s += 'ø¿¡¬√ƒ≈∆«»…ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ'
      ident = 'Mac OS Roman'
    } else if (b === 188) {
      for (let i = 0; i < 94; i++) {
        s += String.fromCharCode(33 + i)
      }
      for (let i = 0; i < 95; i++) {
        s += String.fromCharCode(161 + i)
      }
      s = s.replace(String.fromCharCode(173), '') // soft-hyphen isn't graphical
      ident = 'ISO 8859-1'
    } else if (b === 94) {
      for (let i = 0; i < 94; i++) {
        s += String.fromCharCode(33 + i)
      }
      ident = 'Base94'
    } else if (b === 85) {
      s = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&()*+-;<=>?@^_`{|}~'
      ident = 'Base85'
    } else if (b === 64) {
      s = '`!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_'
      ident = 'Base64'
    } else if (b === 62) {
      s = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      ident = 'Base62'
    } else if (b === 58) {
      s = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
      ident = 'Base58'
    } else if (b === 52) {
      s = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
      ident = 'Base52'
    } else if (b === 45) {
      s = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_$%*+-./:'
      ident = 'Base45'
    } else if (b === 36) {
      s = '0123456789abcdefghijklmnopqrstuvwxyz'
      ident = 'Base36'
    } else if (b === 32) {
      s = '0123456789abcdefghjkmnpqrstvwxyz'
      ident = 'Base32'
      checksum = true
    } else if (b === 26) {
      s = 'abcdefghjkmnpqrstvwxyz'
      ident = 'Base26'
    } else if (b === 16) {
      s = '0123456789abcdef'
      ident = 'Base16'
    } else if (b === 10) {
      s = '0123456789'
      ident = 'Base10'
    } else if (b === 8) {
      s = '01234567'
      ident = 'Base8'
    } else if (b === 4) {
      s = '0123'
      ident = 'Base4'
    } else if (b === 2) {
      s = '01'
      ident = 'Base2'
    }
  
    const len = Math.ceil(entropy / Math.log2(s.length))
    let pass = main.generatePass(len, s, false, useEntropy)
  
    if (b === 32) {
      // Add Crockford's modulo 37 checksum
      let res = 0n
      const check = s + '*~$=u'
  
      for (let i = 0; i < pass.length; i++) {
        res += BigInt(s.indexOf(pass[i]) * 32 ** (pass.length - i - 1))
      }
  
      pass += check[res % 37n]
    }
  
    assocArr.Generator = 'Random'
    assocArr.Wordlist = ident
    assocArr.Password = pass
    assocArr.Characters = len
    assocArr.Entropy = Math.floor(len * Math.log2(s.length))
    assocArr.SetSize = s.length.toLocaleString() + " characters"
  
    if (checksum) {
      assocArr.Checksum = true
    }
  
    return assocArr
  },
  
  /**
   * Determine the right password generator to use when generating the random password.
   * @param {boolean} useEntropy - Whether or not to use the entropy in the data file.
   * @returns {Object} An associative array of the generated password and its meta from the correctly determined helper function.
   */
  genPass: function(useEntropy) {
    let assocArr
    let randSet
  
    if (args.includes('-r') || args.includes('--random')) {
      const option = args.findIndex((option) => option === '-r' || option === '--random')
      randSet = args[option + 1]
    } else {
      randSet = 'Base94'
    }
  
    if (randSet.toLowerCase() === 'base256') {
      assocArr = this.getSet(256, useEntropy)
    } else if (randSet.toLowerCase() === 'base220') {
      assocArr = this.getSet(220, useEntropy)
    } else if (randSet.toLowerCase() === 'base188') {
      assocArr = this.getSet(188, useEntropy)
    } else if (randSet.toLowerCase() === 'base94') {
      assocArr = this.getSet(94, useEntropy)
    } else if (randSet.toLowerCase() === 'base85') {
      assocArr = this.getSet(85, useEntropy)
    } else if (randSet.toLowerCase() === 'base64') {
      assocArr = this.getSet(64, useEntropy)
    } else if (randSet.toLowerCase() === 'base62') {
      assocArr = this.getSet(62, useEntropy)
    } else if (randSet.toLowerCase() === 'base58') {
      assocArr = this.getSet(58, useEntropy)
    } else if (randSet.toLowerCase() === 'base52') {
      assocArr = this.getSet(52, useEntropy)
    } else if (randSet.toLowerCase() === 'base45') {
      assocArr = this.getSet(45, useEntropy)
    } else if (randSet.toLowerCase() === 'base36') {
      assocArr = this.getSet(36, useEntropy)
    } else if (randSet.toLowerCase() === 'base32') {
      assocArr = this.getSet(32, useEntropy)
    } else if (randSet.toLowerCase() === 'base26') {
      assocArr = this.getSet(26, useEntropy)
    } else if (randSet.toLowerCase() === 'base16') {
      assocArr = this.getSet(16, useEntropy)
    } else if (randSet.toLowerCase() === 'base10') {
      assocArr = this.getSet(10, useEntropy)
    } else if (randSet.toLowerCase() === 'base8') {
      assocArr = this.getSet(8, useEntropy)
    } else if (randSet.toLowerCase() === 'base4') {
      assocArr = this.getSet(4, useEntropy)
    } else if (randSet.toLowerCase() === 'base2') {
      assocArr = this.getSet(2, useEntropy)
    } else if (randSet.toLowerCase() === 'emoji') {
      assocArr = this.emoji(useEntropy)
    } else if (randSet.toLowerCase() === 'whitespace') {
      assocArr = this.whitespace(useEntropy)
    } else {
      console.log('Unknown set:', randSet)
      process.exit(1)
    }
  
    return assocArr
  },
  
  /**
   * Generate an emoji password.
   * @param {boolean} useEntropy - Whether or not to use the entropy in the data file.
   * @returns {Object} An associative array of the generated password and its meta.
   */
  emoji: function(useEntropy) {
    const emojiWordlist = require('../lists/random_emoji')
    const wordlist = main.uniquesOnly(emojiWordlist.wordlist)
    const entropy = main.getEntropy()
    const assocArr = {}
    const len = Math.ceil(entropy / Math.log2(wordlist.length))
  
    let pass = main.generatePass(len, wordlist, true, useEntropy)
  
    pass = pass.replace(/ /g, '')
    assocArr.Generator = 'Random'
    assocArr.Wordlist = 'Emoji'
    assocArr.Password = pass
    assocArr.Characters = len
    assocArr.Entropy = Math.floor(len * Math.log2(wordlist.length))
    assocArr.SetSize = wordlist.length.toLocaleString() + " emoji"
  
    return assocArr
  },

  whitespace: function(useEntropy) {
    const s = [
      /**
       * Non-zero width, horizontal, non-graphical spaces/blanks
       */
      '\u{0009}', // Character tabulation
      '\u{0020}', // Space
      '\u{00A0}', // Non-breaking space
      '\u{2000}', // En quad
      '\u{2001}', // Em quad
      '\u{2002}', // En space
      '\u{2003}', // Em space
      '\u{2004}', // Three-per-em space
      '\u{2005}', // Four-per-em space
      '\u{2006}', // Six-per-em space
      '\u{2007}', // Figure space
      '\u{2008}', // Punctuation space
      '\u{2009}', // Thin space
      '\u{200A}', // Hair space
      '\u{2028}', // Line separator
      '\u{2029}', // Paragraph separator
      '\u{202F}', // Narrow no-break space
      '\u{205F}', // Medium mathematical space
      '\u{2800}', // Braille pattern blank
      '\u{3000}', // Ideographic space
      '\u{3164}', // Hangul filler
      '\u{FFA0}', // Halfwidth hangul filler
      // Zero width, non-control spaces/blanks
      '\u{034F}', // Combining grapheme joiner
      '\u{115F}', // Hangul choseong filler
      '\u{1160}', // Hangul Jungseong filler
      '\u{180E}', // Mongolian vowel separator
      '\u{200B}', // Zero width space
      '\u{200C}', // Zero width non-joiner
      '\u{200D}', // Zero width joiner
      '\u{2060}', // Word joiner
      '\u{2063}', // Invisible separator
      '\u{FEFF}', // Zero width non-breaking space
    ]

    const assocArr = {}
    const entropy = main.getEntropy()
    const len = Math.ceil(entropy / Math.log2(s.length))

    let pass = "\u{2800}" + main.generatePass(len, s, false, useEntropy) + "\u{2800}"

    if (! args.includes('-j') && ! args.includes('--json')) {
      pass = '"' + pass + '"'
    }

    assocArr.Generator = 'Random'
    assocArr.Wordlist = 'Whitespace'
    assocArr.Password = pass
    assocArr.Characters = len
    assocArr.Entropy = Math.floor(len * Math.log2(s.length))
    assocArr.SetSize = s.length.toLocaleString() + " characters"
  
    return assocArr
  }
}

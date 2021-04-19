# Nodejs Password Generator

This is a Nodejs implementation of https://github.com/atoponce/webpassgen. As
such, enough changes are made to make it its own separate project.

**NOTE:** When generating non-ASCII passwords, a font supporting Unicode may be
needed to view the characters correctly.

Options are:

    Usage: nodepassgen [OPTION [ARG]]...
    NOTE: A Unicode font may be needed to view some of the passwords correctly.
      -h, --help                 Print this help and exit.
      -a, --alternate WORDLIST   Choose an alternate wordlist. Default is Trump.
                                   WORDLIST must be one of:
                                     Deseret, Colors, Elvish, English, Klingon,
                                     PGP, Pokerware, Rockyou, Shavian, Simpsons,
                                     S/KEY, Trump.
                                   NOTE: "English" combines every English word list.
      -b, --bitcoin LANGUAGE     Choose a Bitcoin language. Default is English.
                                   LANGUAGE must be one of:
                                    Chinese, Czech, English, French, Italian,
                                    Japanese, Korean, Portuguese.
                                   NOTE: Simplified Chinese is the default Chinese
                                   character set. If you want to use Traditional
                                   Chinese, use --traditional.
      -d, --diceware LANGUAGE    Choose a Diceware language. Default is English.
                                   LANGUAGE must be one of:
                                     Basque, Beale, Bulgarian, Catalan, Chinese,
                                     Czech, Danish, Dutch, English, Esperanto,
                                     Estonian, Finnish, French, German, Greek,
                                     Hebrew, Hungarian, Italian, Japanese, Latin,
                                     Maori, NLP, Norwegian, Polish, Portuguese,
                                     Romanian, Russian, Slovak, Slovenian, Spanish
                                     Swedish, Turkish.
                                   NOTE: NLP is "Natural Language Passwords".
      -D, --dicekey              Generate a hard-coded 198-bit entropy text-based
                                   DiceKeys key. Format of the key is:
                                   <character><side><orientation> where:
                                     <character>: Shuffled A-Z without Q 
                                          <side>: Random side 1-6 of the die
                                   <orientation>: Random t,r,b,l direction
      -e, --eff WORDLIST         Choose an EFF wordlist. Default is Short.
                                   WORDLIST must be one of:
                                     Distant, Long, Potter, Short, Thrones, Trek,
                                     Wars.
      -H, --hyphenate            Hyphenate Alternate, Bitcoin, Diceware, EFF, and
                                   system passphrases.
      -j, --json                 Output the passwords and meta in JSON format.
      -m, --min-entropy NUMBER   Set a minimum entropy in bits. Default is 70.
      -o, --only GENERATOR       Choose a generator instead of printing all six.
                                   GENERATOR must be one of:
                                     Alternate, Bitcoin, Diceware, EFF,
                                     Pseudowords, Random, System.
      -p, --pseudowords OPTION   Choose a Pseudowords option. Default is Apple.
                                   OPTION must be one of:
                                     Apple, Babble, Letterblock, Munemo, Proquints.
      -r, --random SET           Choose from a string set. Default is Base94.
                                   SET must be one of:
                                     Base256, Base188, Base94, Base85, Base64,
                                     Base62, Base58, Base52, Base36, Base32,
                                     Base26, Base16, Base10, Base8, Base2, Coins,
                                     DNA, Emoji.
                                   NOTE: Braile Base256, use -R, --braille.
      -R, --braille              Use Braille patterns for Base256.
      -s, --system               Use /usr/share/dict/words for the passphrase.
                                   NOTE: larger word lists have more obscure words.
      -t, --traditional          Use Traditional Chinese with Bitcoin.
    
Output can be valid JSON, meant to be both human and machine parseable. Default
is unformatted plaintext:

    $ nodepassgen
    Alternate(Trump): playing six maker #SC appointed community
    Bitcoin(English): erupt track ivory step owner satoshi slot cradle blind
    Diceware(English): boone ani nuclei cuba bhoy shied
    EFF(Short): hush blot agent ounce trash chess hub
    Pseudowords(Apple): Qihxes-rebvir-3arrid
    Random(Base94): XuLk?26Y!DS

    $ nodepassgen -j | jq
    [
      {
        "Generator": "Alternate",
        "Wordlist": "Trump",
        "Password": "1969 Acosta such McCabe's practiced calendar",
        "Characters": 39,
        "Entropy": 78
      },
      {
        "Generator": "Bitcoin",
        "Wordlist": "English",
        "Password": "entire oblige chalk kick cave dilemma sort essence want",
        "Characters": 40,
        "Entropy": 77
        "Checksum": true
      },
      {
        "Generator": "Diceware",
        "Wordlist": "English",
        "Password": "cheek kirby milch meter red shred",
        "Characters": 28,
        "Entropy": 77
      },
      {
        "Generator": "EFF",
        "Wordlist": "Short",
        "Password": "range grasp mute legal mold punch wife",
        "Characters": 32,
        "Entropy": 72
      },
      {
        "Generator": "Pseudowords",
        "Wordlist": "Apple",
        "Password": "9imken-tipnub-zezvaB",
        "Characters": 20,
        "Entropy": 72
      },
      {
        "Generator": "Random",
        "Wordlist": "Base94",
        "Password": "=Bc!C\\86uEQ",
        "Characters": 11,
        "Entropy": 72
      }
    ]

# Nodejs Password Generator

This is a Nodejs implementation of https://github.com/atoponce/webpassgen. As
such, enough changes are made to make it its own separate project.

**NOTE:** When generating non-ASCII passwords, a font supporting Unicode may be
needed to view the characters correctly.

Options are:

    Usage: node main.js [OPTION [ARG]]...

    NOTE: A Unicode font may be needed to view some of the passwords correctly.

       -h
       --help
           Print this help and exit.

       -d <language>
       --diceware <language>
           Choose a Diceware language. Default is English.
           <language> must be one of:
               Basque, Beale, Bulgarian, Catalan, Chinese, Czech, Danish, Dutch,
               Dutch-Alt, English, Esperanto, Estonian, Finnish, French, German,
               Hewbrew, Hungarian, Italian, Japanese, Latin, Maori, Norwegian,
               Polish, Portuguese, Russian, Slovak, Slovenian, Spanish, Swedish,
               Turkish.

       -e <wordlist>
       --eff <wordlist>
           Choose an EFF wordlist. Default is Short.
           <wordlist> must be one of:
               Distant, Long, Potter, Short, Trek, Wars.

       -a <wordlist>
       --alternate <wordlist>
           Choose an alternate wordlist. Default is Trump.
           <wordlist> must be one of:
               Deseret, Colors, Elvish, Klingon, PGP, Rockyou, Shavian,
               Simpsons, Trump

       -b <language>
       --bitcoin <language>
           Choose a Bitcoin language. Default is English.
           <language> must be one of:
               Chinese, Czech, English, French, Italian, Japanese, Korean, Portuguese
           NOTE:
               Simplified Chinese is the default Chinese character set.
               If you want to use Traditional Chinese, use --traditional.

       -t
       --traditional
           Use the Traditional Chinese character set with Bitcoin.

       -s
       --system
           Use /usr/share/dict/words for building your passphrase.
           Obviously, the more words in that file, the more entropy per word.
           NOTE: larger system word lists will contain more obscure words.

       -D
       --dicekey
           Generate a hard-coded 198-bit entropy text-based DiceKeys key.
           Format of the key is: <character><side><orientation> where:
                 <character>: Shuffled A-Z without Q 
                      <side>: Random side 1-6 of the die
               <orientation>: Random N,E,S,W cardinal direction

       -B
       --bubble
           Choose Bubble Babble encoding.

       -n
       --ninja
           Choose Secret Ninja encoding.

       -k
       --kpop
           Choose Korean K-pop words.

       -r <set>
       --random <set>
           Choose from a string set. Default is Base94
           <set> must be one of:
               Base256, Base188, Base94, Base85, Base64, Base62, Base58, Base52
               Base36, Base32, Base26, Base16, Base10, Base8, Base2, Coins, DNA, Emoji
           NOTE: If you want URL-safe Base64, use -u/--urlsafe.
           NOTE: If you want Braile Base256, use -B/--braille.

       -B
       --braille
           Use Braille patterns for Base256. Ignored with any other option.

       -u
       --url-safe
           Use URL-safe characters for Base64. Ignored with any other option.

       -o <generator>
       --only <generator>
           Choose a generator instead of printing all six (default).
           <generator> must be one of:
               Alternate, Bitcoin, Diceware, EFF, Pseudowords
               Random, System

       -m <number>
       --min-entropy <number>
           Set a minimum entropy requirement in bits. Default is 70.

       -j
       --json
           Output the passwords and meta in JSON format.

       -H
       --hyphenate
           Add hyphens to the Diceware, EFF, and Alternate passphrases.
    
Output can be valid JSON, meant to be both human and machine parseable. Default
is unformatted plaintext:

    $ nodepassgen
    Alternate(Trump): playing six maker #SC appointed community
    Bitcoin(English): marine zone system type middle tilt margin
    Diceware(English): boone ani nuclei cuba bhoy shied
    EFF(Short): hush blot agent ounce trash chess hub
    Pseudowords(Apple_Inc): Qihxes-rebvir-3arrid
    Random(Base94): XuLk?26Y!DS

    $ nodepassgen --json
    [
      {
        "Generator": "Alternate",
        "Wordlist": "Trump",
        "Password": "#debate witch dear lame Mariano called",
        "Characters": 33,
        "Entropy": 78
      },
      {
        "Generator": "Bitcoin",
        "Wordlist": "English",
        "Password": "lock globe crazy afraid avoid inform cruel",
        "Characters": 36,
        "Entropy": 77
      },
      {
        "Generator": "Diceware",
        "Wordlist": "English",
        "Password": "pasha 34 tensor aaron away flick",
        "Characters": 27,
        "Entropy": 77
      },
      {
        "Generator": "EFF",
        "Wordlist": "Short",
        "Password": "chuck mull mardi brink error tag dig",
        "Characters": 30,
        "Entropy": 72
      },
      {
        "Generator": "Pseudowords",
        "Wordlist": "Apple_Inc",
        "Password": "fovMyp-vejpeg-5orfyp",
        "Characters": 20,
        "Entropy": 72
      },
      {
        "Generator": "Random",
        "Wordlist": "Base94",
        "Password": "TI-$yR!fx\\|",
        "Characters": 11,
        "Entropy": 72
      }
    ]

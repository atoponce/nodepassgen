# Nodejs Password Generator

This is a Nodejs implementation of https://github.com/atoponce/webpassgen. As
such, enough changes are made to make it its own separate project.

**NOTE:** When generating emoji passwords, a font supporting emoji may be needed
to view the emoji characters correctly.

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
            Basque, Beale, Bulgarian, Catalan, Chinese, Czech, Danish, Dutch
            Dutch-alt, English, Esperanto, Finnish, French, German, Hungarian,
            Italian, Japanese, Maori, Norwegian, Polish, Portuguese, Russian,
            Slovak, Slovenian, Spanish, Swedish, Turkish.

    -e <wordlist>
    --eff <wordlist>
        Choose an EFF wordlist. Default is Short.
        <wordlist> must be one of:
            Distant, Long, Short.

    -a <wordlist>
    --alternate <wordlist>
        Choose an alternate wordlist. Default is Trump.
        <wordlist> must be one of:
            Colors, Elvish, Klingon, PGP, Rockyou, Simpsons, Trump

    -b <language>
    --bitcoin <language>
        Choose a Bitcoin language. Default is English.
        <language> must be one of:
            Chinese, English, French, Italian, Japanese, Korean
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

    -n
    --ninja
        Choose Secret Ninja encoding.

    -c
    --cosby
        Choose Bill Cosby Bebob.

    -k
    --kpop
        Choose Korean K-pop words.

    -r <set>
    --random <set>
        Choose from a string set. Default is Base94
        <set> must be one of:
            Base94, Base85, Base64, Base62, Base58, Base52, Base36, Base32
            Base26, Base16, Base10, Base8, Base2, Coins, DNA, Emoji
        NOTE: If you want URL-safe Base64, use -u/--urlsafe.

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
    Alternate(Trump): deplorable stuns 1988 Broaddrick 44 Russians
    Bitcoin(English): dirt globe expire victory oak okay fragile
    Diceware(English): spew vw night grain 89 won
    EFF(Short): lair shush royal jam snack visor busy
    Pseudowords(Bubble Babble): xekyp-binah-gofop-febun-kemax
    Random(Base94): Gf&qfko

    $ nodepassgen --json
    [
      {
        "Generator": "Alternate",
        "Wordlist": "Trump",
        "Password": "#newyear thoughts nuclear fools damage steel",
        "Characters": 39,
        "Entropy": 77
      },
      {
        "Generator": "Bitcoin",
        "Wordlist": "English",
        "Password": "leader naive way subway board citizen beach",
        "Characters": 37,
        "Entropy": 77
      },
      {
        "Generator": "Diceware",
        "Wordlist": "English",
        "Password": "55 parse club kudo bread reagan",
        "Characters": 26,
        "Entropy": 77
      },
      {
        "Generator": "EFF",
        "Wordlist": "Short",
        "Password": "omen robin mud jot savor reach ivy",
        "Characters": 28,
        "Entropy": 72
      },
      {
        "Generator": "Pseudowords",
        "Wordlist": "Bubble Babble",
        "Password": "xakyf-difiv-xuvil-tamal-mivax",
        "Characters": 25,
        "Entropy": 78
      },
      {
        "Generator": "Random",
        "Wordlist": "Base94",
        "Password": "2_c+#]ky6B1",
        "Characters": 11,
        "Entropy": 72
      }
    ]

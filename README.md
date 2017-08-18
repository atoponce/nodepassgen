# Nodejs Password Generator

This is a Nodejs implementation of https://github.com/atoponce/webpassgen. As
such, enough changes are made to make it its own separate project.

Options are:

   --help
       Print this help and exit.

   --diceware <language>
       Choose a Diceware language. Default is English.
       <language> must be one of:
           Basque, Beale, Bulgarian, Catalan, Chinese, Czech,
           Danish, Dutch, English, Esperanto, Finnish, French,
           German, Italian, Japanese, Maori, Norwegian, Polish,
           Portuguese, Russian, Slovenian, Spanish, Swedish, Turkish.

   --eff <wordlist>
       Choose an EFF wordlist. Default is Short.
       <wordlist> must be one of:
           Distant, Long, Short.

   --alternate <wordlist>
       Choose an alternate wordlist. Default is PGP.
       <wordlist> must be one of:
           Bitcoin, Elvish, Klingon, PGP
           RockYou, Simpsons, Trump

   --ninja
       Choose Secret Ninja encoding.

   --cosby
       Choose Bill Cosby Bebob.

   --kpop
       Choose Korean K-pop words.

   --random <base>
       Choose a number base to generated. Default is Base94
       <base> must be one of:
           Base94, Base64, Base32, Base16, Base10.
   --emoji
       Choose emoji. A supporting font is needed to view correctly.

   --only <generator>
       Choose a generator instead of printing all six (default).
       <generator> must be one of:
           Diceware, EFF, Alternate, Pseudowords, Random, Emoji

   --min-entropy <number>
       Set a minimum entropy requirement in bits. Default is 70.

   --json
       Output the passwords and meta in JSON format.

   --hyphenate
       Add hyphens to the Diceware, EFF, and Alternate passphrases.

Output can be valid JSON, meant to be both human and machine parseable. Default
is unformatted plaintext:

    $ nodejs nodepassgen
    Diceware(English): huck be steed 11th yam vito
    EFF(Short): agony urban trio jazz near ajar tutu
    Alternate(PGP): orca pioneer payday music Babylon phonetic disruptive choking
    Pseudowords(Bubble Babble): xulym-gyryz-tesem-zetax-selox
    Base94(null): _k|~):tLDc$
    Emoji(null): 🈵 ◼ 🔸 🕝 💥 👮 🏯 🔳

    $ nodejs nodepassgen --json
    [
      {
        "Generator": "Diceware",
        "Wordlist": "English",
        "Password": "squid renown break goggle purr marry",
        "Characters": 31,
        "Entropy": 77
      },
      {
        "Generator": "EFF",
        "Wordlist": "Short",
        "Password": "duct niece decal ivory tray oil jeep",
        "Characters": 30,
        "Entropy": 72
      },
      {
        "Generator": "Alternate",
        "Wordlist": "PGP",
        "Password": "tolerance billiard integrate uncut adviser slowdown asteroid Oakland",
        "Characters": 61,
        "Entropy": 72
      },
      {
        "Generator": "Pseudowords",
        "Wordlist": "Bubble Babble",
        "Password": "xakiz-rumyr-xiceg-doxur-kibix",
        "Characters": 25,
        "Entropy": 78
      },
      {
        "Generator": "Base94",
        "Wordlist": null,
        "Password": "@fg/;aMt~)!",
        "Characters": 11,
        "Entropy": 72
      },
      {
        "Generator": "Emoji",
        "Wordlist": null,
        "Password": "❇ 💋 🎡 🆔 📫 💕 󾓬 🔚",
        "Characters": 8,
        "Entropy": 78
      }
    ]

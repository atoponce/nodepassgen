# Nodejs Password Generator

This is a Nodejs implementation of https://github.com/atoponce/webpassgen. As
such, enough changes are made to make it its own separate project.

Options are:

    --help
        Print this help and exit.

    --diceware <language>
        Default English.
        Choose a Diceware language. <language> must be one of:
            Beale, Catalan, Danish, Dutch, English, Esperanto,
            Finnish, French, German, Italian, Japanese Maori,
            Norwegian, Polish, Spanish, Swedish, Turkish.

    --eff <wordlist>
        Default Short.
        Choose an EFF wordlist. <wordlist> must be one of:
            Distant, Long, Short.

    --alternate <wordlist>
        Default PGP.
        Choose an alternate wordlist. <wordlist> must be one of:
            Bitcoin, Elvish, Klingon, PGP,
            RockYou, Simpsons, Trump.

    --ninja
        Choose Secret Ninja encoding.

    --only <generator>
        Choose a generator instead of printing all nine (default).
        <generator> must be one of:
            Diceware, EFF, Alternate, Pseudowords, Base94, Base64,
            Base32, Base16, Base10.

    --min-entropy <number>
        Default 70-bits.
        Set a minimum entropy requirement in bits.

    --hyphenate
        Hyphenate the passphrases. Applies only to the Diceware, EFF, and
        Alternate passphrase generators.

    --json
        Output the passwords and meta in JSON format.

Output can be valid JSON, meant to be both human and machine parseable. Default
is unformatted plaintext:

    $ nodejs nodepassgen
    Diceware(English): aroma yam bj knee erda above
    EFF(Short): olive cork sneer swirl eagle curvy kilt
    Alternate(PGP): Pandora upshot edict molecule alone infancy gossamer indulge
    Pseudowords(Bubble Babble): xubyz-zypyp-hesur-pivox-nasax
    Base94(null): slWH[bi|W~1
    Base64(null): 4Vk9XhbAohQB
    Base32(null): pxz4fk9awv0nc4
    Base16(null): 7bf58e86556ce55962
    Base10(null): 7365319826201997256123

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

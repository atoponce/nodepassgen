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
            Bitcoin, Elvish, Klingon, PGP, RockYou, Simpsons.

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
	    "Password": "tail thyme legion pansy vita corps",
	    "Characters": 29,
	    "Entropy": 77
      },
      {
	    "Generator": "EFF",
	    "Wordlist": "Short",
	    "Password": "wheat dodge stamp boxer swarm bleak spend",
	    "Characters": 35,
	    "Entropy": 72
      },
      {
	    "Generator": "Alternate",
	    "Wordlist": "PGP",
	    "Password": "adult barbecue blowtorch endorse misnomer vapor equation hydraulic",
	    "Characters": 59,
	    "Entropy": 72
      },
      {
	    "Generator": "Pseudowords",
	    "Wordlist": "Bubble Babble",
	    "Password": "xezyx-zuzeg-bozum-bepup-xyhax",
	    "Characters": 25,
	    "Entropy": 78
      },
      {
	    "Generator": "Base94",
	    "Wordlist": null,
	    "Password": "A#BNG(r{#A<",
	    "Characters": 11,
	    "Entropy": 72
      },
      {
	    "Generator": "Base64",
	    "Wordlist": null,
	    "Password": "Ztcoe01LyJWm",
	    "Characters": 12,
	    "Entropy": 72
      },
      {
	    "Generator": "Base32",
	    "Wordlist": null,
	    "Password": "pbxqazn6yktd32",
	    "Characters": 14,
	    "Entropy": 70
      },
      {
	    "Generator": "Base16",
	    "Wordlist": null,
	    "Password": "1d9d95e9063e7c0fb1",
	    "Characters": 18,
	    "Entropy": 72
      },
      {
	    "Generator": "Base10",
	    "Wordlist": null,
	    "Password": "8616678856135725452404",
	    "Characters": 22,
	    "Entropy": 73
      }
    ]

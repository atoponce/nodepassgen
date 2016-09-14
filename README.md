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

    --min-entropy <number>
        Default 70-bits.
        Set a minimum entropy requirement in bits.


Output is valid JSON, meant to be both human and machine parseable.

    $ nodejs main.js
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

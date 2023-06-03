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
                                     Acronym, Afrikaans, Belarusian, Colors, Common,
                                     Croatian, Deseret, Elvish, Everything, Klingon,
                                     LOTR, Mongolian, PGP, Pokerware, Rockyou,
                                     Serbian, Shavian, Simpsons, S/KEY, Trump,
                                     Ukranian, VAN, Wordle.
                                   NOTE: "English" combines every English word list.
      -b, --bitcoin LANGUAGE     Choose a Bitcoin language. Default is English.
                                   LANGUAGE must be one of:
                                    Chinese, Czech, English, French, Italian,
                                    Japanese, Korean, Portuguese, Spanish.
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
                                     Romanian, Russian, Slovak, Slovenian, Spanish,
                                     Swedish, Turkish.
                                   NOTE: NLP is "Natural Language Passwords".
      -e, --eff WORDLIST         Choose an EFF wordlist. Default is Short.
                                   WORDLIST must be one of:
                                     Distant, Long, Potter, Short, Thrones, Trek,
                                     Wars.
      -H, --hyphenate            Hyphenate Alternate, Bitcoin, Diceware, and EFF
                                   passphrases.
      -j, --json                 Output the passwords and meta in JSON format.
      -k, --keyboard             Collect random entropy from keyboard timings.
                                   See -u, --use-entropy.
      -m, --min-entropy NUMBER   Set a minimum entropy in bits. Default is 70.
      -M, --monero LANGUAGE      Choose a Monero language. Default is English.
                                   LANGUAGE must be one of:
                                    Chinese, Dutch, English, Esperanto, French,
                                    German, Italian, Japanese, Lojban, Portuguese,
                                    Russian, Spanish.
      -o, --only GENERATOR       Choose a generator instead of printing all six.
                                   GENERATOR must be one of:
                                     Alternate, Bitcoin, Diceware, EFF, Monero,
                                     Pseudowords, Random, System.
      -p, --pseudowords OPTION   Choose a Pseudowords option. Default is Apple.
                                   OPTION must be one of:
                                     Apple, Babble, Daefen, DIBELS, Koremutake,
                                     Lepron, Letterblock, Munemo, Proquints, Urbit.
      -r, --random SET           Choose from a string set. Default is Base94.
                                   SET must be one of:
                                     Base256, Base220, Base188, Base94, Base85,
                                     Base64, Base62, Base58, Base52, Base45, Base36,
                                     Base32, Base26, Base16, Base10, Base8, Base4,
                                     Base2, Emoji, Whitespace
      -s, --stats                Report collected keyboard entropy statistics.
                                   A "sample" is 16 bits long and can be a word,
                                   set, or character depending on the password type.
      -t, --traditional          Use Traditional Chinese with Bitcoin.
      -u, --use-entropy          Use previously saved entropy for generation.
                                   Must be used with -o, --only.
                                   See also -k, --keyboard.

Output can be valid JSON, meant to be both human and machine parseable. Default
is unformatted plaintext:

    $ nodepassgen
    Alternate(Common Words Only): budget injun outlast core juniper roper
    Bitcoin(English): limb effort shallow balance hill surface conduct jealous slab
    Diceware(English): craig caper septa vk caiman bible
    EFF(Short): brim swarm coral elope ozone life dense
    Pseudowords(Apple): supfa8-gomvok-vifcuF
    Random(Base94): 9W|4Bg`nTf4


    $ nodepassgen -j | jq
    [
      {
        "Entropy": 84,
        "Generator": "Alternate",
        "Wordlist": "Common Words Only",
        "Password": "hugs oat round safes moray moonscape",
        "Characters": 31
      },
      {
        "Generator": "Bitcoin",
        "Wordlist": "English",
        "Password": "process curtain powder prison interest merge trade purity key",
        "Characters": 53,
        "Entropy": 96,
        "Checksum": true
      },
      {
        "Generator": "Diceware",
        "Wordlist": "English",
        "Password": "plead mm thee mp voice r3",
        "Characters": 20,
        "Entropy": 78
      },
      {
        "Generator": "EFF",
        "Wordlist": "Short",
        "Password": "cope shed width quota kilt petty silo",
        "Characters": 31,
        "Entropy": 72
      },
      {
        "Generator": "Pseudowords",
        "Wordlist": "Apple",
        "Password": "rehqav-vyJzid-3okhuf",
        "Characters": 20,
        "Entropy": 72
      },
      {
        "Generator": "Random",
        "Wordlist": "Base94",
        "Password": "<G\"p*bRBr/_",
        "Characters": 11,
        "Entropy": 72
      }
    ]


## Dockerfile

To run this using Docker, run these commands.

	git clone https://github.com/atoponce/nodepassgen.git
	cd nodepassgen
	docker build -t nodepassgen .

Running nodepassgen.

	docker run --rm nodepassgen
	docker run --rm nodepassgen -h
	docker run --rm nodepassgen -j

To collect keyboard entropy, override the entrypoint like this.

	docker run -it --entrypoint /bin/bash nodepassgen

And inside of the container, run these commands.

	# nodepassgen -k
	...
	# nodepassgen -s
	You have 6 samples (96 bits) of entropy available.

#!/bin/bash

# Alternate tests
./nodepassgen -o alternate -a colors
./nodepassgen -o alternate -a elvish
./nodepassgen -o alternate -a klingon
./nodepassgen -o alternate -a pgp
./nodepassgen -o alternate -a rockyou
./nodepassgen -o alternate -a simpsons
./nodepassgen -o alternate -a trump
./nodepassgen -o alternate -a colors -H

# Bitcoin tests
./nodepassgen -o bitcoin -b chinese
./nodepassgen -o bitcoin -b chinese -t
./nodepassgen -o bitcoin -b english
./nodepassgen -o bitcoin -b french
./nodepassgen -o bitcoin -b italian
./nodepassgen -o bitcoin -b japanese
./nodepassgen -o bitcoin -b korean
./nodepassgen -o bitcoin -b spanish
./nodepassgen -o bitcoin -b english -H

# Diceware tests
./nodepassgen -o diceware -d Basque
./nodepassgen -o diceware -d Beale
./nodepassgen -o diceware -d Bulgarian
./nodepassgen -o diceware -d Catalan
./nodepassgen -o diceware -d Chinese
./nodepassgen -o diceware -d Czech
./nodepassgen -o diceware -d Danish
./nodepassgen -o diceware -d Dutch
./nodepassgen -o diceware -d Dutch-alt
./nodepassgen -o diceware -d English
./nodepassgen -o diceware -d Esperanto
./nodepassgen -o diceware -d Finnish
./nodepassgen -o diceware -d French
./nodepassgen -o diceware -d German
./nodepassgen -o diceware -d Hungarian
./nodepassgen -o diceware -d Italian
./nodepassgen -o diceware -d Japanese
./nodepassgen -o diceware -d Maori
./nodepassgen -o diceware -d Norwegian
./nodepassgen -o diceware -d Polish
./nodepassgen -o diceware -d Portuguese
./nodepassgen -o diceware -d Russian
./nodepassgen -o diceware -d Slovenian
./nodepassgen -o diceware -d Slovak
./nodepassgen -o diceware -d Spanish
./nodepassgen -o diceware -d Swedish
./nodepassgen -o diceware -d Turkish
./nodepassgen -o diceware -d English -H

# EFF tests
./nodepassgen -o eff -e distant
./nodepassgen -o eff -e long
./nodepassgen -o eff -e short
./nodepassgen -o eff -e short -H

# Pseudowords tests
./nodepassgen -o pseudowords # bubble babble by default - also, no option. fix?
./nodepassgen -o pseudowords -k
./nodepassgen -o pseudowords -n

# Random tests
./nodepassgen -o system -s
./nodepassgen -o system -s -H
./nodepassgen -o random -r Base94
./nodepassgen -o random -r Base85
./nodepassgen -o random -r Base64
./nodepassgen -o random -r Base64 -u
./nodepassgen -o random -r Base62
./nodepassgen -o random -r Base58
./nodepassgen -o random -r Base52
./nodepassgen -o random -r Base36
./nodepassgen -o random -r Base32
./nodepassgen -o random -r Base26
./nodepassgen -o random -r Base16
./nodepassgen -o random -r Base10
./nodepassgen -o random -r Base8
./nodepassgen -o random -r Base2
./nodepassgen -o random -r Coins
./nodepassgen -o random -r DNA
./nodepassgen -o random -r Emoji

# Entropy tests
./nodepassgen -o alternate -a trump -m 128 -H
./nodepassgen -o bitcoin -b korean -m 128 -H
./nodepassgen -o diceware -d Beale -m 128 -H
./nodepassgen -o eff -e long -m 128 -H
./nodepassgen -o pseudowords -k -m 128 -H
./nodepassgen -o system -s -m 128 -H
./nodepassgen -o random -r Coins -m 128

# JSON tests
./nodepassgen -j
./nodepassgen -j -H
./nodepassgen -j -m 128

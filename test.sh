#!/bin/bash
### Sanity checks to make sure everything works without error

# Alternate tests
./nodepassgen -o alternate -a afrikaans
./nodepassgen -o alternate -a belarusian
./nodepassgen -o alternate -a colors
./nodepassgen -o alternate -a common
./nodepassgen -o alternate -a croatian
./nodepassgen -o alternate -a deseret
./nodepassgen -o alternate -a elvish
./nodepassgen -o alternate -a everything
./nodepassgen -o alternate -a klingon
./nodepassgen -o alternate -a mongolian
./nodepassgen -o alternate -a pgp
./nodepassgen -o alternate -a pokerware
./nodepassgen -o alternate -a rockyou
./nodepassgen -o alternate -a serbian
./nodepassgen -o alternate -a shavian
./nodepassgen -o alternate -a simpsons
./nodepassgen -o alternate -a s/key
./nodepassgen -o alternate -a trump
./nodepassgen -o alternate -a ukranian
./nodepassgen -o alternate -a wordle
printf '\n' # blank line

# Bitcoin tests
./nodepassgen -o bitcoin -b chinese
./nodepassgen -o bitcoin -b chinese -t
./nodepassgen -o bitcoin -b english
./nodepassgen -o bitcoin -b french
./nodepassgen -o bitcoin -b italian
./nodepassgen -o bitcoin -b japanese
./nodepassgen -o bitcoin -b korean
./nodepassgen -o bitcoin -b spanish
./nodepassgen -o bitcoin -b portuguese
printf '\n' # blank line

# Monero tests
./nodepassgen -o monero -M chinese
./nodepassgen -o monero -M dutch
./nodepassgen -o monero -M english
./nodepassgen -o monero -M esperanto
./nodepassgen -o monero -M french
./nodepassgen -o monero -M german
./nodepassgen -o monero -M italian
./nodepassgen -o monero -M japanese
./nodepassgen -o monero -M lojban
./nodepassgen -o monero -M portuguese
./nodepassgen -o monero -M russian
./nodepassgen -o monero -M spanish
printf '\n' # blank line

# Diceware tests
./nodepassgen -o diceware -d Basque
./nodepassgen -o diceware -d Beale
./nodepassgen -o diceware -d Bulgarian
./nodepassgen -o diceware -d Catalan
./nodepassgen -o diceware -d Chinese
./nodepassgen -o diceware -d Czech
./nodepassgen -o diceware -d Danish
./nodepassgen -o diceware -d Dutch
./nodepassgen -o diceware -d English
./nodepassgen -o diceware -d Esperanto
./nodepassgen -o diceware -d Estonian
./nodepassgen -o diceware -d Finnish
./nodepassgen -o diceware -d French
./nodepassgen -o diceware -d German
./nodepassgen -o diceware -d Greek
./nodepassgen -o diceware -d Hebrew
./nodepassgen -o diceware -d Hungarian
./nodepassgen -o diceware -d Italian
./nodepassgen -o diceware -d Japanese
./nodepassgen -o diceware -d Latin
./nodepassgen -o diceware -d Maori
./nodepassgen -o diceware -d NLP
./nodepassgen -o diceware -d Norwegian
./nodepassgen -o diceware -d Polish
./nodepassgen -o diceware -d Portuguese
./nodepassgen -o diceware -d Romanian
./nodepassgen -o diceware -d Russian
./nodepassgen -o diceware -d Slovenian
./nodepassgen -o diceware -d Slovak
./nodepassgen -o diceware -d Spanish
./nodepassgen -o diceware -d Swedish
./nodepassgen -o diceware -d Turkish
printf '\n' # blank line

# EFF tests
./nodepassgen -o eff -e distant
./nodepassgen -o eff -e long
./nodepassgen -o eff -e short
./nodepassgen -o eff -e potter
./nodepassgen -o eff -e thrones
./nodepassgen -o eff -e trek
./nodepassgen -o eff -e wars
printf '\n' # blank line

# Pseudowords tests
./nodepassgen -o pseudowords -p apple
./nodepassgen -o pseudowords -p babble
./nodepassgen -o pseudowords -p lepron
./nodepassgen -o pseudowords -p letterblock
./nodepassgen -o pseudowords -p munemo
./nodepassgen -o pseudowords -p proquints
printf '\n' # blank line

# Random tests
./nodepassgen -o random -r Base256
./nodepassgen -o random -r Base220
./nodepassgen -o random -r Base188
./nodepassgen -o random -r Base94
./nodepassgen -o random -r Base85
./nodepassgen -o random -r Base64
./nodepassgen -o random -r Base62
./nodepassgen -o random -r Base58
./nodepassgen -o random -r Base52
./nodepassgen -o random -r Base45
./nodepassgen -o random -r Base36
./nodepassgen -o random -r Base32
./nodepassgen -o random -r Base26
./nodepassgen -o random -r Base16
./nodepassgen -o random -r Base10
./nodepassgen -o random -r Base8
./nodepassgen -o random -r Base4
./nodepassgen -o random -r Base2
./nodepassgen -o random -r Emoji
printf '\n' # blank line

# Entropy tests
./nodepassgen -o alternate -a trump -m 128 -H
./nodepassgen -o bitcoin -b korean -m 128 -H
./nodepassgen -o monero -b japanes -m 128 -H
./nodepassgen -o diceware -d Beale -m 128 -H
./nodepassgen -o eff -e long -m 128 -H
./nodepassgen -o pseudowords -p babble -m 128 -H
./nodepassgen -o random -r Base4 -m 128
printf '\n' # blank line

# JSON tests
./nodepassgen -j
./nodepassgen --json --hyphenate
./nodepassgen --json --min-entropy 128
printf '\n' # blank line

# Collected entropy test
mv -f /tmp/nodepassgen.json /tmp/nodepassgen.json.orig 2> /dev/null
printf '[13997,36649,2123,58827,44935,31730,57625,1752,25325,10942,17430,49713]' > /tmp/nodepassgen.json
./nodepassgen -s
./nodepassgen -u -o diceware
mv -f /tmp/nodepassgen.json.orig /tmp/nodepassgen.json 2> /dev/null
printf '\n' # blank line

# Collect some entropy as a final test
./nodepassgen -k
printf '\n' # blank line
./nodepassgen --stats
printf '\n' # blank line

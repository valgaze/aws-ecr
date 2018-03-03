// https://thenamegame-generator.com/the-name-game-rules.html

const isSpecial = (roster=[], letter) => {
    const values = roster.reduce((result, item) => {
      result[item] = 1;
      return result;
    }, {});

    return Boolean(values[letter.toLowerCase()]);
}

const isVowel = isSpecial.bind(null, ['a','e','i','o','u']);
const isBFM = isSpecial.bind(null, ['b', 'f', 'm']);


const cases = (firstLetter, remainder, fullname) => {
    // Vowel case
    if (isVowel(firstLetter)) {

        return `
${fullname}, ${fullname}, bo-${fullname.toLowerCase()}
Banana-fana fo-f${fullname.toLowerCase()}
Fee-fi-mo-m${fullname.toLowerCase()}
${fullname}! 	
`
    }

    // Billy/Felix/Mary case
    if (isBFM(firstLetter)) {
        return `
${fullname}, ${fullname}, bo-${remainder}
Banana-fana fo-${remainder}
Fee-fi-mo-m${remainder}
${fullname}!
`
    }

    // Regular joe
    return `
${fullname}, ${fullname}, bo-b${remainder}
Banana-fana fo-f${remainder}
Fee-fi-mo-m${remainder}
${fullname}! 	
`
}

const lyricsGenerator = (name = "Marsha") => {
    const firstLetter = name.charAt(0);
    const remainder = name.slice(1);
    return cases(firstLetter, remainder, name);
};

module.exports = lyricsGenerator;
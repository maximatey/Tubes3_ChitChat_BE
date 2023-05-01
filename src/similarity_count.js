// function to calculate the similarity between two strings using levenshtein distance algorithm
function levenshteinDistance(str1, str2) {
    // init matrix of size (str1.length + 1) * (str2.length + 1) and initialize with 0
    let matrix = Array(str1.length + 1).fill().map(() => Array(str2.length + 1).fill(0));

    // source prefixes can be transformed into empty string by
    // dropping all characters
    for (let i = 1; i <= str1.length; i++) {
        matrix[i][0] = i;
    }

    // target prefixes can be reached from empty source prefix
    // by inserting every character
    for (let j = 1; j <= str2.length; j++) {
        matrix[0][j] = j;
    }

    // fill the matrix
    for (let i = 1; i <= str1.length; i++) {
        for (let j = 1; j <= str2.length; j++) {
            let cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1, // deletion
                matrix[i][j - 1] + 1, // insertion
                matrix[i - 1][j - 1] + cost // substitution
            );

        }
    }
    return matrix[str1.length][str2.length];
}


// driver code
let str1 = "kitten";
let str2 = "sitting";
let dist = (levenshteinDistance(str1, str2));
console.log(dist);
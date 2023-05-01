function computeBorder(pattern) {
    let b = new Array(pattern.length);
    b[0] = 0;

    let m = pattern.length;
    let j = 0;
    let i = 1;

    while (i < m) {
        if (pattern.charAt(j) == pattern.charAt(i)) {
            // j+1 chars match
            b[i] = j + 1;
            i++;
            j++;
        } else if (j > 0) {     // j follows matching prefix
            j = b[j-1];
        } else {                // no match
            b[i] = 0;
            i++;
        }
    }
    return b;
}

function searchKMP(text, pattern) {
    let n = text.length;
    let m = pattern.length;

    let b = computeBorder(pattern);

    let i = 0;
    let j = 0;

    while (i < n) {
        if (pattern.charAt(j) == text.charAt(i)) {
            if (j == m-1) {
                return i - m + 1;       // match
            }
            i++;
            j++;
        } else if (j > 0) {
            j = b[j-1];
        } else {
            i++;
        }
    }
    return -1;                          // no match
}

// Driver Program untuk mengetes fungsi diatas
let text = "a pattern matching algorithm";
let pattern = "algorithm";
console.log(searchKMP(text, pattern));

// export { searchKMP };
module.exports = { searchKMP };
/* File yang berisi algoritma Boyer Moore dalam string matching dengan memanfaatkan bad character heuristic => L function untuk 
   mapping last occurence. Karakter yang digunakan adalah ASCII.
*/
let NO_OF_CHARS = 256;

// Preprocessing function untuk bad character heuristic dengan melakukan mapping pada last occurence dari setiap karakter
function mapLastOccurence(str, size, last) {
    // Inisialisasi semua nilai last occurence dengan -1
    for (let i = 0; i < NO_OF_CHARS; i++)
        last[i] = -1;

    // Isi nilai last occurence dari setiap karakter pada string
    for (i = 0; i < size; i++)
        last[str.charCodeAt(i)] = i;
}

/* Fungsi utama untuk melakukan pencarian pattern pada string txt dengan algoritma Boyer Moore menggunakan bad character heuristic */
/* Prekondisi pat.length <= txt.length */
function searchBM(txt, pat) {
    let m = pat.length;
    let n = txt.length;
    let i = m - 1;

    let last = new Array(NO_OF_CHARS);

    /* Preprocessing function untuk bad character heuristic */
    mapLastOccurence(pat, m, last);

    let j = m - 1;

    /* Pencarian pattern pada string txt */
    do {
        if (pat[j] == txt[i]) {
            if (j == 0) {
                return i; // match
            } else { // looking-glass technique
                i--;
                j--;
            }
        } else { // character jump technique
            let lo = last[txt.charCodeAt(i)];
            i += m - Math.min(j, 1 + lo);
            j = m - 1;
        }

    } while (i <= n - 1);
    return -1; // no match
}

/* Driver program to test above function */
let txt = "a pattern matching algorithm";
let pat = "algorithm";
console.log(searchBM(txt, pat));

// export { searchBM };
module.exports = { searchBM };
function classification(input) {
    if (/^.*(\d{1,2})\/(\d{1,2})\/(\d{4})\s*\?{0,1}$/i.test(input)) {
        return 1;
    } else if (/^[0-9+\-*/()?\s]+$/i.test(input)) {
        return 2;
    } else if (/Tambah pertanyaan (.+) dengan jawaban (.+)/i.test(input)) {
        return 3;
    } else if (/^Hapus pertanyaan (\w+)$/i.test(input)) {
        return 4;
    } else {
        return 5;
    }
}

// classification("Apa ibukota indonesia?");
// classification("Apa mata kuliah semester 4 IF yang paling seru?");
// classification("5 + 2 * 5 ?");
// classification("8 + 7 +2 + *5 ?");
// classification("Hari apa 25/02/2023");
// console.log(classification("31/01/2050?"));
// classification("Tambah pertanyaan x dengan jawaban y");
// classification("Tambah pertanyaan x dengan jawaban z");
// classification("Hapus pertanyaan x");


// export {classification}; // untuk export function jika terhubung frontend
module.exports = { classification } // untuk export function jika tidak terhubung frontend
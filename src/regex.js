function classification(input) {
    if (/^.*(\d{1,2})\/(\d{1,2})\/(\d{4})\s*\?{0,1}$/i.test(input)) {
        // panggil fungsi tanggal
        console.log("Tanggal");
        const check = input.split('/');
        const day = check[0].replace(/[^0-9]/g, '');;
        const month = check[1];
        const year = check[2];
        // console.log(checkDay(day, month, year));
    } else if (/^[0-9+\-*/()?\s]+$/i.test(input)) {
        // panggil fungsi kalkulator
        console.log("Kalkulator");
        // console.log(calculator(input.replace('?', '')));
    } else if (/Tambah pertanyaan (.+) dengan jawaban (.+)/i.test(input)) {
        // panggil fungsi tambah ke database dengan parameter question dan answer
        console.log("Tambah ke database");
    } else if (/^Hapus pertanyaan (\w+)$/i.test(input)) {
        // panggil fungsi hapus dari database
        console.log("Hapus dari database");
    } else {
        // panggil fungsi akses ke database
        console.log("Akses ke Database");
    }
}

// classification("Apa ibukota indonesia?");
// classification("Apa mata kuliah semester 4 IF yang paling seru?");
// classification("5 + 2 * 5 ?");
// classification("8 + 7 +2 + *5 ?");
// classification("Hari apa 25/02/2023");
// classification("31/01/2050?");
// classification("Tambah pertanyaan x dengan jawaban y");
// classification("Tambah pertanyaan x dengan jawaban z");
// classification("Hapus pertanyaan x");
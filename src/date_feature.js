function checkDay(day, month, year) {
    // Fungsi validasi
    if (year < 0 || month < 1 || month > 12 || day < 1) {
        return `Tanggal Invalid! Cek kembali tanggal pertanyaan anda.`;
    }

    if (month === 2 && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) && day > 29) {
        return `Tanggal Invalid! Pada tahun ${year} bulan ${month} hanya memiliki 29 hari.`;
    }

    const maxDay = new Date(year, month, 0).getDate();
    if (day > maxDay) {
        return `Tanggal Invalid! Pada tahun ${year} bulan ${month} hanya memiliki ${maxDay} hari.`;
    }
    
    const date = new Date(year, month-1, day+1);
    const date_string = date.toISOString().slice(0, 10);
    console.log(date_string);
    return getDay(date_string);
}

function getDay(date_string) {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const date = new Date(date_string);
    const day = days[date.getDay()];
    return day;
}

console.log(checkDay(31, 4, 2023));
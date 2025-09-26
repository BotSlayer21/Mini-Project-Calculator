// 🔹 Ambil elemen-elemen dari DOM
const displayHistory = document.querySelector(".display-history");  // Tampilan riwayat operasi
const display = document.querySelector(".display-input");           // tampilan angka yang sedang diketik
const tempResult = document.querySelector(".temp-result");          // tampilan hasil sementara
const numbers = document.querySelectorAll(".number");               // semua tombol angka
const operations = document.querySelectorAll(".operation")          // semua tombol operasi (+, -, x, /, %)
const equal = document.querySelector(".equal")                      // tombol sama dengan (=)
const clearAll = document.querySelector(".all-clear")               // tombol hapus semua (AC)
const clearLast = document.querySelector(".last-entity-clear")      // tombol hapus 1 karakter terakhir (CE)

// 🔹 Variabel untuk menyimpan state kalkulasi
let dis1Num ="";        // angka pertama (sebelum operasi)
let dis2Num ="";        // angka kedua (setelah operasi)
let result =null;       // hasil kalkulasi sementara
let lastOperation ="";  // operasi terakhir yang dipakai
let haveDot =false;     // penanda apakah sudah ada titik desimal

// 🔹 Event tombol angka
numbers.forEach((number) => {
    number.addEventListener("click", (e) => {
        // jika input berupa "." dan belum ada titik → boleh dipakai
        if (e.target.innerText === "." && !haveDot) {
            haveDot = true
        } 
        // jika sudah ada titik, jangan tambah titik lagi
        else if (e.target.innerText === "." && haveDot) {
            return;
        }
        // simpan angka ke dis2Num dan tampilkan
        dis2Num += e.target.innerText;
        display.innerText = dis2Num;
    })
});

// 🔹 Event tombol operasi (+, -, x, /, %)
operations.forEach((operation) => {
    operation.addEventListener("click", (e) => {
        if (!dis2Num) return; // tidak bisa operasi tanpa angka kedua
        haveDot = false;
        const operationName = e.target.innerText;

        // jika sudah ada angka sebelumnya → lakukan perhitungan
        if (dis1Num && dis2Num && lastOperation) {
            mathOperation()
        } else (
            result = parseFloat(dis2Num)
        )

        // update display dan variabel
        clearVar(operationName);
        lastOperation = operationName
    })
})

// 🔹 Fungsi untuk membersihkan input2 (reset tampilan untuk angka berikutnya)
function clearVar(name = "") {
    dis1Num += dis2Num + " " + name + " "; //Update riwayat
    displayHistory.innerText = dis1Num;
    display.innerText = "";
    dis2Num = "";
    tempResult.innerText = result; //Tampilkan hasil sementara
}

// 🔹 Fungsi utama operasi matematika
function mathOperation () {
    if (lastOperation === "x") {
        result = parseFloat(result) * parseFloat(dis2Num)
    } else if (lastOperation === "+") {
        result = parseFloat(result) + parseFloat(dis2Num)
    } else if (lastOperation === "-") {
        result = parseFloat(result) - parseFloat(dis2Num)
    } else if (lastOperation === "/") {
        result = parseFloat(result) / parseFloat(dis2Num)
    } else if (lastOperation === "%") {
        result = parseFloat(result) % parseFloat(dis2Num)
    } 
}

// 🔹 Event tombol sama dengan (=)
equal.addEventListener("click", () => {
    if (!dis1Num || !dis2Num) return; //Pastikan ada angka 1 & 2
    haveDot = false;
    mathOperation(); //lakukan perhitungan
    clearVar(); // reset tampilan riwayat
    display.innerText = result; // tampilkan hasil akhir
    tempResult.innerText ="";
    dis2Num = result; // simpan hasil agar bisa dipakai lagi
    dis1Num = "";
});


// 🔹 Event tombol hapus semua (AC)
clearAll.addEventListener("click", () => {
    if (!dis1Num && !dis2Num) return;
    dis1Num = "";
    dis2Num = "";
    haveDot = false;
    displayHistory.innerText = "0"; // reset tampilan riwayat
    display.innerText = "0"; // reset tampilan input
    tempResult.innerText = "0"; // reset tampilan hasil sementara
    result = "";
    lastOperation = "";
})

// 🔹 Event tombol hapus 1 karakter terakhir (CE)
clearLast.addEventListener("click", () => {
    if (!dis2Num) return;
    dis2Num = dis2Num.slice(0, -1);     // hapus 1 digit dari belakang
    display.innerText = dis2Num || "0"; // jika kosong -> tampilkan "0"
});

// 🔹 Event keyboard (tekan angka / operasi di keyboard)
window.addEventListener("keydown", (e) => {
    if (
        e.key === "0" ||
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9" ||
        e.key === "."
    ) {
        clickButton(e.key); // jika angka atau titik
    } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
        clickOperation(e.key); // jika operasi
    } else if (e.key === "*") {
        clickOperation("x"); // untuk tanda * (kali)
    } else if (e.key == "Enter" || e.key === "=") {
        clickEqual(); // jika enter atau =
    }
});

// 🔹 Fungsi bantu → klik tombol angka sesuai keyboard
function clickButton(key) {
    numbers.forEach((button) => {
        if (button.innerText === key) {
        button.click();
        }
    });
}

// 🔹 Fungsi bantu → klik tombol operasi sesuai keyboard
function clickOperation(key) {
    operations.forEach((operation) => {
        if (operation.innerText === key) {
        operation.click();
        }
    });
}

// 🔹 Fungsi bantu → klik tombol sama dengan
function clickEqual() {
    equal.click();
}

// 🔹 Fungsi bantu → klik tombol hapus semua
function clickClear() {
    clearAll.click();
}
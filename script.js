// Fungsi untuk menghitung dan menyimpan total gaji serta uang makan, dan memperbarui tampilan
function calculateAndSaveTotal() {
    var basicSalary = parseFloat(document.getElementById("basicSalary").value) || 0;
    var overtimeHours = parseFloat(document.getElementById("overtimeHours").value) || 0;
    var holidayOvertimeHours = parseFloat(document.getElementById("holidayOvertimeHours").value) || 0;
    var mealAllowance = parseFloat(document.getElementById("mealAllowance").value) || 0;

    var totalOvertime = overtimeHours * 24000; // Tarif overtime reguler
    var totalHolidayOvertime = holidayOvertimeHours * 29000; // Tarif overtime hari libur
    var totalSalary = basicSalary + totalOvertime + totalHolidayOvertime;

    saveSalaryData({ date: new Date().toDateString(), totalSalary: totalSalary, mealAllowance: mealAllowance });
    loadAndDisplaySalaryData();
}

// Fungsi untuk menyimpan data gaji dan uang makan ke Local Storage
function saveSalaryData(salaryEntry) {
    const monthYearKey = new Date().toLocaleDateString('default', { month: 'long', year: 'numeric' });
    let salaryData = JSON.parse(localStorage.getItem(monthYearKey)) || [];
    salaryData.push(salaryEntry);
    localStorage.setItem(monthYearKey, JSON.stringify(salaryData));
}

// Fungsi untuk memuat dan menampilkan data gaji bulanan dan uang makan dari Local Storage
function loadAndDisplaySalaryData() {
    const monthYearKey = new Date().toLocaleDateString('default', { month: 'long', year: 'numeric' });
    const salaryData = JSON.parse(localStorage.getItem(monthYearKey)) || [];
    const tableBody = document.getElementById('salaryTable').getElementsByTagName('tbody')[0];

    tableBody.innerHTML = '';

    salaryData.forEach(entry => {
        let row = tableBody.insertRow();
        let dateCell = row.insertCell(0);
        let salaryCell = row.insertCell(1);
        let mealAllowanceCell = row.insertCell(2); // Cell baru untuk uang makan
        dateCell.textContent = entry.date;
        salaryCell.textContent = `Rp ${entry.totalSalary.toLocaleString()}`;
        mealAllowanceCell.textContent = `Rp ${entry.mealAllowance.toLocaleString()}`; // Tampilkan uang makan
    });
}

// Fungsi untuk menghapus data gaji bulanan
function deleteSalaryData() {
    const monthYearKey = new Date().toLocaleDateString('default', { month: 'long', year: 'numeric' });
    if (confirm('Apakah Anda yakin ingin menghapus semua data gaji untuk ' + monthYearKey + '?')) {
        localStorage.removeItem(monthYearKey); // Hapus data dari Local Storage
        loadAndDisplaySalaryData(); // Memperbarui tampilan tabel setelah penghapusan
    }
}

// Setup awal dan event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Pastikan fungsi loadAndDisplaySalaryData dipanggil hanya jika elemen 'salaryTable' ada
    if (document.getElementById('salaryTable')) {
        loadAndDisplaySalaryData();
    }

    const deleteBtn = document.getElementById('deleteBtn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', deleteSalaryData);
    }
});


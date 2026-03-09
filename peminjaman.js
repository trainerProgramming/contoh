// skrip untuk halaman peminjam
function saveLoanToLocalStorage(
  namaPeminjam,
  judulBuku,
  tanggalPeminjaman,
  status
) {
  let loans = JSON.parse(localStorage.getItem("Daftar Peminjaman")) || [];

  const newLoan = {
    namaPeminjam: namaPeminjam,
    judulBuku: judulBuku,
    tanggalPeminjaman: tanggalPeminjaman,
    status: status,
  };

  loans.push(newLoan);
  localStorage.setItem("Daftar Peminjaman", JSON.stringify(loans));
  alert("Peminjaman berhasil ditambahkan!");
}

function getLoansFromLocalStorage() {
  return JSON.parse(localStorage.getItem("Daftar Peminjaman")) || [];
}

function deleteLoan(index) {
  let loans = getLoansFromLocalStorage();
  loans.splice(index, 1);
  localStorage.setItem("Daftar Peminjaman", JSON.stringify(loans));
  alert("Peminjaman berhasil dihapus!");
  displayLoans();
}

function displayLoans() {
  const loanList = document.querySelector(".loan-list");

  const loans = getLoansFromLocalStorage();
  loanList.innerHTML =
    "<tr><th>No.</th><th>Nama Peminjam</th><th>Judul Buku</th><th>Tanggal Peminjaman</th><th>Status</th><th>Aksi</th></tr>";

  loans.forEach((loan, index) => {
    const row = `<tr>
                                <td>${index + 1}</td>
                                <td>${loan.namaPeminjam}</td>
                                <td>${loan.judulBuku}</td>
                                <td>${loan.tanggalPeminjaman}</td>
                                <td>${loan.status}</td>
                                <td>
                                    <a href="#" class="btn btn-edit" onclick="editLoan(${index})">Edit</a>
                                    <a href="#" class="btn btn-delete" onclick="deleteLoan(${index})">Hapus</a>
                                </td>
                            </tr>`;
    loanList.insertAdjacentHTML("beforeend", row);
  });
}

function editLoan(index) {
  let loans = getLoansFromLocalStorage();
  const loan = loans[index];

  const namaPeminjamInput = document.getElementById("namaPeminjam");
  const judulBukuInput = document.getElementById("judulBuku");
  const tanggalPeminjamanInput = document.getElementById("tanggalPeminjaman");
  const statusInput = document.getElementById("status");
  const addLoanButton = document.getElementById("addLoan-button");

  namaPeminjamInput.value = loan.namaPeminjam;
  judulBukuInput.value = loan.judulBuku;
  tanggalPeminjamanInput.value = loan.tanggalPeminjaman;
  statusInput.value = loan.status;

  addLoanButton.textContent = "Simpan";
  addLoanButton.onclick = function () {
    loans[index] = {
      namaPeminjam: namaPeminjamInput.value,
      judulBuku: judulBukuInput.value,
      tanggalPeminjaman: tanggalPeminjamanInput.value,
      status: statusInput.value,
    };
    localStorage.setItem("Daftar Peminjaman", JSON.stringify(loans));
    alert("Peminjaman berhasil diupdate!");
    displayLoans();

    namaPeminjamInput.value = "";
    judulBukuInput.value = "";
    tanggalPeminjamanInput.value = "";
    statusInput.value = "";
    addLoanButton.textContent = "Tambah";
    addLoanButton.onclick = addLoan;
  };
}

function addLoan() {
  const namaPeminjamInput = document.getElementById("namaPeminjam");
  const judulBukuInput = document.getElementById("judulBuku");
  const tanggalPeminjamanInput = document.getElementById("tanggalPeminjaman");
  const statusInput = document.getElementById("status");

  const namaPeminjam = namaPeminjamInput.value;
  const judulBuku = judulBukuInput.value;
  const tanggalPeminjaman = tanggalPeminjamanInput.value;
  const status = statusInput.value;
  if (
    namaPeminjam == "" ||
    judulBuku == "" ||
    tanggalPeminjaman == "" ||
    status == ""
  ) {
    alert("Masukkan Data peminjaman dengan lengkap");
  } else {
    saveLoanToLocalStorage(namaPeminjam, judulBuku, tanggalPeminjaman, status);
    displayLoans();

    namaPeminjamInput.value = "";
    judulBukuInput.value = "";
    tanggalPeminjamanInput.value = "";
    statusInput.value = "";
  }
}

window.onload = function () {
  const addLoanButton = document.getElementById("addLoan-button");
  addLoanButton.onclick = addLoan;
  displayLoans();
};
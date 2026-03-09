// Fungsi untuk menambahkan buku melalui form pada inputan
function addBook() {
  const judulInput = document.getElementById("judul");
  const penulisInput = document.getElementById("penulis");
  const tahunInput = document.getElementById("tahun");

  const judul = judulInput.value;
  const penulis = penulisInput.value;
  const tahun = tahunInput.value;
  if (judul == "" || penulis == "" || tahun == "") {
    alert("Masukkan Data Buku dengan lengkap");
  } else {
    saveBookToLocalStorage(judul, penulis, tahun);
    displayBooks();

    judulInput.value = "";
    penulisInput.value = "";
    tahunInput.value = "";
  }
}
// Fungsi untuk menyimpan data pada local storage
function saveBookToLocalStorage(judul, penulis, tahun) {
  if (judul.value == "" || penulis.value == "" || tahun.value == "") {
    alert("Masukkan Data buku dengan lengkap");
  } else {
    let books = JSON.parse(localStorage.getItem("Daftar Buku")) || [];

    const newBook = {
      judul: judul,
      penulis: penulis,
      tahun: tahun,
    };

    books.push(newBook);
    localStorage.setItem("Daftar Buku", JSON.stringify(books));
    alert("Buku berhasil ditambahkan!");
  }
}
// Fungsi untuk mengambil data yang tersimpan pada local storage
function getBooksFromLocalStorage() {
  return JSON.parse(localStorage.getItem("Daftar Buku")) || [];
}
// fungsi untuk menampilkan data buku pada tabel
function displayBooks() {
  const bookList = document.querySelector(".book-list");

  const books = getBooksFromLocalStorage();
  bookList.innerHTML =
    "<tr><th>No.</th><th>Judul Buku</th><th>Penulis</th><th>Tahun Terbit</th><th>Aksi</th></tr>";

  books.forEach((book, index) => {
    const row = `<tr>
                                <td>${index + 1}</td>
                                <td>${book.judul}</td>
                                <td>${book.penulis}</td>
                                <td>${book.tahun}</td>
                                <td>
                                    <a href="#" class="btn btn-edit" onclick="editBook(${index})">Edit</a>
                                    <a href="#" class="btn btn-delete" onclick="deleteBook(${index})">Hapus</a>
                                </td>
                            </tr>`;
    bookList.insertAdjacentHTML("beforeend", row);
  });
}
// Fungsi untuk mengeksekusi semua elemen HTML
window.onload = function () {
  const addButton = document.getElementById("add-button");
  addButton.onclick = addBook;

  displayBooks();
};

// Fungsi untuk mengupdate data pada daftar buku
function editBook(index) {
  let books = getBooksFromLocalStorage();
  const book = books[index];

  const judulInput = document.getElementById("judul");
  const penulisInput = document.getElementById("penulis");
  const tahunInput = document.getElementById("tahun");
  const addButton = document.getElementById("add-button");

  judulInput.value = book.judul;
  penulisInput.value = book.penulis;
  tahunInput.value = book.tahun;

  addButton.textContent = "Simpan";
  addButton.onclick = function () {
    books[index] = {
      judul: judulInput.value,
      penulis: penulisInput.value,
      tahun: tahunInput.value,
    };
    localStorage.setItem("Daftar Buku", JSON.stringify(books));
    alert("Buku berhasil diupdate!");
    displayBooks();

    judulInput.value = "";
    penulisInput.value = "";
    tahunInput.value = "";
    addButton.textContent = "Tambah";
    addButton.onclick = addBook;
  };
}

// Fungsi untuk menghapus data 
function deleteBook(index) {
  let books = getBooksFromLocalStorage();
  books.splice(index, 1);
  alert("Buku berhasil dihapus!");
  localStorage.setItem("Daftar Buku", JSON.stringify(books));
  displayBooks();
}
// skrip untuk halaman anggota
function saveMemberToLocalStorage(nama, email, tanggalBergabung) {
  let members = JSON.parse(localStorage.getItem("Daftar Anggota")) || [];

  const newMember = {
    nama: nama,
    email: email,
    tanggalBergabung: tanggalBergabung,
  };

  members.push(newMember);
  localStorage.setItem("Daftar Anggota", JSON.stringify(members));
  alert("Anggota berhasil ditambahkan!");
}

function getMembersFromLocalStorage() {
  return JSON.parse(localStorage.getItem("Daftar Anggota")) || [];
}

function deleteMember(index) {
  let members = getMembersFromLocalStorage();
  members.splice(index, 1);
  localStorage.setItem("Daftar Anggota", JSON.stringify(members));
  alert("Anggota berhasil dihapus!");
  displayMembers();
}

function displayMembers() {
  const memberList = document.querySelector(".member-list");

  const members = getMembersFromLocalStorage();
  memberList.innerHTML =
    "<tr><th>No.</th><th>Nama</th><th>Email</th><th>Tanggal Bergabung</th><th>Aksi</th></tr>";

  members.forEach((member, index) => {
    const row = `<tr>
                                <td>${index + 1}</td>
                                <td>${member.nama}</td>
                                <td>${member.email}</td>
                                <td>${member.tanggalBergabung}</td>
                                <td>
                                    <a href="#" class="btn btn-edit" onclick="editMember(${index})">Edit</a>
                                    <a href="#" class="btn btn-delete" onclick="deleteMember(${index})">Hapus</a>
                                </td>
                            </tr>`;
    memberList.insertAdjacentHTML("beforeend", row);
  });
}

function editMember(index) {
  let members = getMembersFromLocalStorage();
  const member = members[index];

  const namaInput = document.getElementById("nama");
  const emailInput = document.getElementById("email");
  const tanggalBergabungInput = document.getElementById("tanggalBergabung");
  const addMemberButton = document.getElementById("addMember-button");

  namaInput.value = member.nama;
  emailInput.value = member.email;
  tanggalBergabungInput.value = member.tanggalBergabung;

  addMemberButton.textContent = "Simpan";
  addMemberButton.onclick = function () {
    members[index] = {
      nama: namaInput.value,
      email: emailInput.value,
      tanggalBergabung: tanggalBergabungInput.value,
    };
    localStorage.setItem("Daftar Anggota", JSON.stringify(members));
    alert("Anggota berhasil diupdate!");
    displayMembers();

    namaInput.value = "";
    emailInput.value = "";
    tanggalBergabungInput.value = "";
    addMemberButton.textContent = "Tambah";
    addMemberButton.onclick = addMember;
  };
}

function addMember() {
  const namaInput = document.getElementById("nama");
  const emailInput = document.getElementById("email");
  const tanggalBergabungInput = document.getElementById("tanggalBergabung");

  const nama = namaInput.value;
  const email = emailInput.value;
  const tanggalBergabung = tanggalBergabungInput.value;
  if (nama == "" || email == "" || tanggalBergabung == "") {
    alert("Masukkan Data Anggota dengan lengkap");
  } else {
    saveMemberToLocalStorage(nama, email, tanggalBergabung);
    displayMembers();

    namaInput.value = "";
    emailInput.value = "";
    tanggalBergabungInput.value = "";
  }
}

window.onload = function () {
  const addMemberButton = document.getElementById("addMember-button");
  addMemberButton.onclick = addMember;
  displayMembers();
};
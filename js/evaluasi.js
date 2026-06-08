console.log("JS aktif");

// ========================
function acakArray(arr){
  for(let i = arr.length - 1; i > 0; i--){
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

/*mulai evaluasi*/
function mulaiEvaluasi(){

    document.getElementById("start-screen").style.display = "none";

    document.getElementById("quiz-container").style.display = "block";

    tampilkanSoal();

    mulaiTimer();
}
// ========================
let soal = [
{ pertanyaan:"Topologi jaringan yang menggunakan satu kabel utama disebut?", opsi:["Bus","Star","Ring","Mesh"], benar:"Bus"},
{ pertanyaan:"Topologi yang menggunakan perangkat pusat (hub/switch) adalah?", opsi:["Star","Bus","Ring","Tree"], benar:"Star"},
{ pertanyaan:"Kelebihan topologi Star adalah?", opsi:["Mudah mendeteksi gangguan","Murah","Tidak perlu kabel","Paling cepat"], benar:"Mudah mendeteksi gangguan"},
{ pertanyaan:"Model jaringan yang terdiri dari 7 layer adalah?", opsi:["OSI","TCP/IP","LAN","WAN"], benar:"OSI"},
{ pertanyaan:"Layer yang bertanggung jawab mengatur pengiriman data pada model OSI adalah?", opsi:["Transport","Physical","Presentation","Session"], benar:"Transport"},
{ pertanyaan:"Layer paling bawah pada model OSI adalah?", opsi:["Physical","Network","Session","Application"], benar:"Physical"},
{ pertanyaan:"Protokol yang digunakan untuk mengirim halaman web adalah?", opsi:["HTTP","FTP","SMTP","IP"], benar:"HTTP"},
{ pertanyaan:"Model TCP/IP memiliki berapa layer?", opsi:["4","5","6","7"], benar:"4"},
{ pertanyaan:"Media transmisi yang menggunakan gelombang udara disebut?", opsi:["Nirkabel","Kabel UTP","Fiber Optik","Koaksial"], benar:"Nirkabel"},
{ pertanyaan:"Contoh media transmisi kabel adalah?", opsi:["UTP","WiFi","Bluetooth","Infrared"], benar:"UTP"},
{ pertanyaan:"Perangkat yang menghubungkan beberapa komputer dalam satu jaringan adalah?", opsi:["Switch","Monitor","Keyboard","Printer"], benar:"Switch"},
{ pertanyaan:"Perangkat yang menghubungkan jaringan lokal ke internet adalah?", opsi:["Router","Scanner","Speaker","Mouse"], benar:"Router"},
{ pertanyaan:"Fungsi Access Point adalah?", opsi:["Menghubungkan perangkat ke jaringan WiFi","Mencetak dokumen","Menyimpan data","Menampilkan gambar"], benar:"Menghubungkan perangkat ke jaringan WiFi"},
{ pertanyaan:"Alamat yang digunakan untuk mengidentifikasi perangkat dalam jaringan disebut?", opsi:["IP Address","URL","Domain","Hostname"], benar:"IP Address"},
{ pertanyaan:"Kepanjangan LAN adalah?", opsi:["Local Area Network","Large Area Network","Logical Area Network","Local Access Network"], benar:"Local Area Network"},
{ pertanyaan:"Kepanjangan WAN adalah?", opsi:["Wide Area Network","Wireless Area Network","Web Area Network","World Area Network"], benar:"Wide Area Network"},
{ pertanyaan:"Perangkat yang berfungsi mengubah sinyal digital dan analog adalah?", opsi:["Modem","Switch","Hub","Repeater"], benar:"Modem"},
{ pertanyaan:"Ancaman keamanan jaringan yang mencoba mencuri data pengguna disebut?", opsi:["Phishing","Booting","Browsing","Scanning"], benar:"Phishing"},
{ pertanyaan:"Firewall digunakan untuk?", opsi:["Melindungi jaringan dari akses tidak sah","Mempercepat internet","Menyimpan data","Menghubungkan komputer"], benar:"Melindungi jaringan dari akses tidak sah"},
{ pertanyaan:"Langkah pertama ketika jaringan tidak terhubung adalah?", opsi:["Memeriksa kabel dan koneksi","Mengganti komputer","Menghapus sistem operasi","Mematikan monitor"], benar:"Memeriksa kabel dan koneksi"}
];

// acak soal
acakArray(soal);

let nomor = 0;
let jawaban = [];

// ========================
function tampilkanSoal(){

  document.getElementById("nomor").innerText =
  `Soal ${nomor+1} dari ${soal.length}`;

  document.getElementById("pertanyaan").innerText =
  soal[nomor].pertanyaan;

  if(!soal[nomor].opsiAcak){
    soal[nomor].opsiAcak = [...soal[nomor].opsi];
    acakArray(soal[nomor].opsiAcak);
  }

  let html = "";

  soal[nomor].opsiAcak.forEach(opsi=>{
    html += `
    <label class="opsi-item">
      <input type="radio" name="jawaban" value="${opsi}"
      ${jawaban[nomor]==opsi ? "checked":""}>
      ${opsi}
    </label>`;
  });

  document.getElementById("opsi").innerHTML = html;
}

// ========================
function simpanJawaban(){
  let pilih = document.querySelector('input[name="jawaban"]:checked');
  if(pilih) jawaban[nomor] = pilih.value;
}

function nextSoal(){
  simpanJawaban();
  if(nomor < soal.length-1){
    nomor++;
    tampilkanSoal();
  }
}

function prevSoal(){
  simpanJawaban();
  if(nomor > 0){
    nomor--;
    tampilkanSoal();
  }
}

function selesai(){
  simpanJawaban();

  let skor = 0;
  for(let i=0;i<soal.length;i++){
    if(jawaban[i] === soal[i].benar){
      skor++;
    }
  }

  let nilai = Math.round((skor/soal.length)*100);

  document.querySelector(".card").innerHTML = `
  <h2>Hasil Evaluasi</h2>
  <h1>${nilai}</h1>
  <p>${skor} / ${soal.length} benar</p>
  <button onclick="location.reload()">Ulangi</button>
  `;
}

// ========================
// TIMER
let waktu = 600;
setInterval(()=>{
  let m = Math.floor(waktu/60);
  let d = waktu%60;

  document.getElementById("timer").innerText =
  `⏰ ${m}:${d<10?'0':''}${d}`;

  waktu--;

  if(waktu < 0){
    selesai();
  }
},1000);

// ========================
window.onload = tampilkanSoal;
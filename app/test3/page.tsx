"use client";

import React from 'react'

export default function page() {
  return (
/*Singkatnya, masalah pada kode ini:

SQL Injection → Query dibuat langsung dari input user ($"SELECT ... {request.Username} ..."), ini berbahaya.
Perbaikan: Gunakan parameterized query (@Username, @Password) untuk mencegah injection.

Password tidak di-hash → Password disimpan/dicek dalam bentuk plaintext.
Perbaikan: Simpan hash password di database dan gunakan hashing + salting saat verifikasi.

Koneksi tidak ditutup secara eksplisit → Meskipun using akan menutup koneksi, penempatan connection.Open() sebaiknya tetap dekat dengan eksekusi query dan pastikan using juga untuk SqlCommand dan SqlDataReader.

Cek login kurang aman → Hanya memeriksa HasRows tanpa validasi lebih lanjut.
Perbaikan: Pastikan data yang dibaca benar-benar valid dan cocok dengan user yang dimaksud.

Kalau mau, aku bisa buatkan versi kode yang sudah dibenarkan.*/

    <div>
      
    </div>
  )
}

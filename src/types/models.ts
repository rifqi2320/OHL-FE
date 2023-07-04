export type User = {
  username: string;
}

export type Barang = {
  id: string;
  nama: string;
  kode: string;
  harga: number;
  stok: number;
  perusahaan: string;
}

export type Perusahaan = {
  id: string;
  nama: string;
  kode: string;
  alamat: string;
  no_telp: string;
}
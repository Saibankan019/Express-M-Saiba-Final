# Muhammad Fadhlan Hakim || A11.2022.14619 || Pemrograman Sisi Server

# 📦 API Manajemen Inventaris

API ini dirancang untuk mengelola inventaris barang, kategori, pemasok, dan admin. API ini menyediakan fitur untuk membuat dan mengelola entitas-entitas tersebut, serta menampilkan ringkasan stok dan barang yang stoknya hampir habis. Aplikasi ini dibangun menggunakan **Node.js**, **Express**, **Prisma**, dan **PostgreSQL**.

## 📋 Prasyarat

- **Node.js** (minimal versi 14)
- **PostgreSQL** (database yang berjalan di `localhost`)
- **Prisma** (diinstal sebagai dependency development via npm)
- **Docker** dan **Docker Compose** (untuk menjalankan aplikasi dalam container)

## ⚙️ Instalasi

1. **Clone repository**:
   ```bash
   git clone https://github.com/Saibankan019/Express-M-Saiba-Final.git
   ```

2. **Masuk ke direktori proyek**:
   ```bash
   cd Express-M-Saiba-Final
   ```

3. **Build dan jalankan aplikasi menggunakan Docker Compose**:
   ```bash
   docker-compose up --build
   ```

4. **Lakukan migrasi database** setelah build selesai:
   ```bash
   docker compose exec app npx prisma migrate dev
   ```

## 🚀 Endpoint API

### Alur Pengelolaan Data

1. 🛂 **Admin**
   - **Buat Admin**
     ```http
     POST /api/admins
     ```
   - **Lihat Semua Admin**
     ```http
     GET /api/admins
     ```

2. 📂 **Kategori**
   - **Buat Kategori**
     ```http
     POST /api/categories
     ```
   - **Lihat Semua Kategori**
     ```http
     GET /api/categories
     ```

3. 🏢 **Pemasok**
   - **Buat Pemasok**
     ```http
     POST /api/suppliers
     ```
   - **Lihat Semua Pemasok**
     ```http
     GET /api/suppliers
     ```

4. 📦 **Barang**
   - **Buat Barang**
     ```http
     POST /api/items
     ```
   - **Lihat Semua Barang**
     ```http
     GET /api/items
     ```

### 📊 Endpoint Ringkasan Data

- 📑 **Ringkasan per Kategori**
  ```http
  GET /api/items/summary/category
  ```

- 📑 **Ringkasan Barang Berdasarkan Pemasok**
  ```http
  GET /api/items/summary/supplier
  ```

- ⚠️ **Barang Stok Rendah** (stok di bawah ambang batas 5 unit)
  ```http
  GET /api/items/low-stock
  ```

- 📂 **Barang Berdasarkan Kategori Tertentu**
  ```http
  GET /api/items/category/{categoryId}
  ```

- 📦 **Ringkasan Stok** (jumlah total stok, nilai, dan harga rata-rata)
  ```http
  GET /api/items/summary/stock
  ```

- 📝 **Ringkasan Sistem** (total barang, kategori, pemasok, dan nilai stok)
  ```http
  GET /api/items/summary/system
  ```

## 🛠️ Teknologi yang Digunakan

- **Node.js**: Runtime JavaScript server-side
- **Express**: Framework untuk membangun API
- **Prisma**: ORM untuk berinteraksi dengan database PostgreSQL
- **PostgreSQL**: Database relasional untuk menyimpan data
- **Docker** dan **Docker Compose**: Untuk containerization aplikasi


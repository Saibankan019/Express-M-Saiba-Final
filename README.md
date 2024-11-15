## Muhammad Fadhlan Hakim || A11.2022.14619 || Pemrograman Sisi Server

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
     POST http://localhost:3001/api/admins
     {
     "username": "saiba5",
     "password": "saibaNinteen",
     "email": "saiba199999@example.com"
      }
     ```
   - **Lihat Semua Admin**
     ```http
     GET http://localhost:3001/api/admins
     ```
     ~ example ~
     {
    "id": 1,
    "username": "saiba1",
    "password": "saibaNinteen",
    "email": "saiba19@example.com",
    "createdAt": "2024-11-14T15:48:15.103Z",
    "updatedAt": "2024-11-14T15:48:15.103Z"
     },

2. 📂 **Kategori**
   - **Buat Kategori**
     ```http
     POST http://localhost:3001/api/categories
      {
     "name": "Food and Drinks",
     "description": "Semua Makanan dan Minuman",
     "createdBy": 5
      }
     ```
   - **Lihat Semua Kategori**
     ```http
     GET http://localhost:3001/api/categories
     ```
     ~ example ~
     {
    "id": 1,
    "name": "Elektronik",
    "description": "semua elektronik",
    "createdBy": 2,
    "createdAt": "2024-11-15T08:44:05.716Z",
    "updatedAt": "2024-11-15T08:44:05.716Z",
      }
3. 🏢 **Supplier**
   - **Buat Pemasok**
     ```http
     POST http://localhost:3001/api/suppliers
     {
     "name": "saiba5",
     "contactInfo": "888-888-888",
     "createdBy": 5
      }
     ```
   - **Lihat Semua Pemasok**
     ```http
     GET http://localhost:3001/api/suppliers
     ```
     ~ example ~
     {
    "id": 1,
    "name": "saiba",
    "contactInfo": "888-888-888",
    "createdBy": 1,
    "createdAt": "2024-11-15T08:47:53.250Z",
    "updatedAt": "2024-11-15T08:47:53.250Z",
      }

4. 📦 **Barang**
   - **Buat Barang**
     ```http
     POST http://localhost:3001/api/items
     {
     "name": "dragon fruit tree",
     "description": "Dari Kebun Tetangga",
     "price": 10.99,
     "quantity": 1,
     "categoryId": 2,
     "supplierId": 4,
     "createdBy": 3
      }
     ```
   - **Lihat Semua Barang**
     ```http
     GET http://localhost:3001/api/items
     ```
     ~ example ~
     {
    "id": 1,
    "name": "Laptop",
    "description": "buatan saya sendiri",
    "price": "99.99",
    "quantity": 4,
    "categoryId": 1,
    "supplierId": 1,
    "createdBy": 1,
    "createdAt": "2024-11-15T08:49:24.767Z",
    "updatedAt": "2024-11-15T08:49:24.767Z",
     }   

### 📊 Endpoint Ringkasan Data

- 📑 **Ringkasan per Kategori**
  ```http
  GET http://localhost:3001/api/items/summary/category
  ```

- 📑 **Ringkasan Barang Berdasarkan Pemasok**
  ```http
  GET http://localhost:3001/api/items/summary/supplier
  ```

- ⚠️ **Barang Stok Rendah** (stok di bawah ambang batas 5 unit)
  ```http
  GET http://localhost:3001/api/items/low-stock
  ```

- 📂 **Barang Berdasarkan Kategori Tertentu**
  ```http
  GET http://localhost:3001/api/items/category/1 
  ```

- 📦 **Ringkasan Stok** (jumlah total stok, nilai, dan harga rata-rata)
  ```http
  GET http://localhost:3001/api/items/summary/stock
  ```

- 📝 **Ringkasan Sistem** (total barang, kategori, pemasok, dan nilai stok)
  ```http
  GET http://localhost:3001/api/items/summary/system
  ```

## 🛠️ Teknologi yang Digunakan

- **Node.js**: Runtime JavaScript server-side
- **Express**: Framework untuk membangun API
- **Prisma**: ORM untuk berinteraksi dengan database PostgreSQL
- **PostgreSQL**: Database relasional untuk menyimpan data
- **Docker** dan **Docker Compose**: Untuk containerization aplikasi


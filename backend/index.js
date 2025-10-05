// file-server/index.js

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Muat variabel dari .env
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;
const STORAGE_DIR = process.env.STORAGE_DIR;

// Buat folder penyimpanan jika belum ada
if (!fs.existsSync(STORAGE_DIR)) {
    fs.mkdirSync(STORAGE_DIR, { recursive: true });
}

// Middleware
// Izinkan request dari frontend Next.js Anda (ganti dengan URL production nanti)
app.use(cors({ origin: 'http://localhost:3000' }));

// Konfigurasi Multer untuk penyimpanan file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, STORAGE_DIR); // multer menangani pembuatan direktori
    },
    filename: (req, file, cb) => {
        // multer membuat nama file unik
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, 'file-' + uniqueSuffix + extension);
    },
});

const upload = multer({ storage: storage });

// Endpoint inilah yang akan dipanggil oleh FileDragger
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Tidak ada file yang diunggah.' });
    }

    // Server Express mengembalikan info penting ini ke frontend
    res.status(200).json({
        fileName: req.file.filename,      // Nama unik yang disimpan di disk
        originalName: req.file.originalname, // Nama asli file
        size: req.file.size,              // Ukuran file
    });
});

/**
 * @route   GET /files/:filename
 * @desc    Akses/Download file
 * @access  Public
 */
app.use('/files', express.static(path.join(__dirname, STORAGE_DIR)));

/**
 * @route   DELETE /delete/:filename
 * @desc    Hapus file fisik
 * @access  Public (PERINGATAN: Endpoint ini harus diamankan!)
 */
app.delete('/delete/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, STORAGE_DIR, filename);

    fs.unlink(filePath, (err) => {
        if (err) {
            // Jika file tidak ditemukan, mungkin sudah dihapus. Anggap berhasil.
            if (err.code === 'ENOENT') {
                return res.status(200).json({ message: 'File tidak ditemukan, dianggap sudah terhapus.' });
            }
            console.error("Error saat menghapus file:", err);
            return res.status(500).json({ error: 'Gagal menghapus file.' });
        }

        res.status(200).json({ message: `File ${filename} berhasil dihapus.` });
    });
});


// Jalankan server
app.listen(PORT, () => {
    console.log(`🚀 Server file berjalan di http://localhost:${PORT}`);
});
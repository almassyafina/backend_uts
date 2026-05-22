"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePembicara = exports.updatePembicara = exports.showpembicara = exports.createpembicara = exports.getpembicara = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// 1. menampilkan semua data pembicara
const getpembicara = async (req, res) => {
    try {
        const pembicara = await prisma.pembicara.findMany();
        res.status(200).json({ message: "data pembicara berhasil ditampilkan", data: pembicara });
    }
    catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan pada server", error });
    }
};
exports.getpembicara = getpembicara;
// 2. menyimpan data pembicara
const createpembicara = async (req, res) => {
    const { name, role, image } = req.body;
    if (!name || !role) {
        res.status(400).json({ message: "Nama dan role harus diisi" });
        return;
    }
    try {
        const newPembicara = await prisma.pembicara.create({
            data: {
                name: name,
                role: role,
                image: image, // Sesuaikan dengan nama field di schema.prisma Anda
            },
        });
        res.status(201).json({ message: "pembicara berhasil disimpan", data: newPembicara });
    }
    catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan pada server", error });
    }
};
exports.createpembicara = createpembicara;
// 3. menampilkan data pembicara berdasarkan id
const showpembicara = async (req, res) => {
    const pembicaraId = parseInt(req.params.id, 10);
    try {
        const pembicaraData = await prisma.pembicara.findUnique({
            where: { id: pembicaraId },
        });
        if (!pembicaraData) {
            res.status(404).json({ success: false, message: "Pembicara tidak ditemukan" });
            return;
        }
        res.status(200).json({ success: true, data: pembicaraData });
    }
    catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan pada server", error });
    }
};
exports.showpembicara = showpembicara;
// 4. mengupdate pembicara berdasarkan id
const updatePembicara = async (req, res) => {
    const pembicaraId = parseInt(req.params.id, 10);
    const { name, role, image } = req.body;
    try {
        // Cek apakah data ada di database
        const existingPembicara = await prisma.pembicara.findUnique({
            where: { id: pembicaraId },
        });
        if (!existingPembicara) {
            res.status(404).json({ success: false, message: "Pembicara tidak ditemukan" });
            return;
        }
        // Update data
        const updatedPembicara = await prisma.pembicara.update({
            where: { id: pembicaraId },
            data: {
                name: name || existingPembicara.name,
                role: role || existingPembicara.role,
                image: image || existingPembicara.image,
            },
        });
        res.status(200).json({ success: true, message: "pembicara berhasil diupdate", data: updatedPembicara });
    }
    catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan pada server", error });
    }
};
exports.updatePembicara = updatePembicara;
// 5. menghapus data pembicara berdasarkan id
const deletePembicara = async (req, res) => {
    const pembicaraId = parseInt(req.params.id, 10);
    try {
        // Cek eksistensi data sebelum menghapus
        const existingPembicara = await prisma.pembicara.findUnique({
            where: { id: pembicaraId },
        });
        if (!existingPembicara) {
            res.status(404).json({ success: false, message: "pembicara tidak ditemukan" });
            return;
        }
        // Proses hapus
        await prisma.pembicara.delete({
            where: { id: pembicaraId },
        });
        res.status(200).json({ success: true, message: "pembicara berhasil dihapus" });
    }
    catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan pada server", error });
    }
};
exports.deletePembicara = deletePembicara;
//# sourceMappingURL=pembicaraControllers.js.map
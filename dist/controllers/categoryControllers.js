"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.showCategory = exports.createCategories = exports.getCategories = void 0;
const db_1 = require("../db/db");
let categories = [];
//1. menampilkan list category
const getCategories = async (req, res) => {
    //mengambil data dari database
    try {
        //jika berhasil
        const allEvents = await db_1.prisma.category.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        //tampilkan datanya
        res.json(allEvents);
    }
    catch (error) {
        res.status(500).json({
            message: "Gagal mengambil data event",
            error,
        });
    }
};
exports.getCategories = getCategories;
//2. menyimpan data category
const createCategories = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: "Nama harus diisi" });
    }
    try {
        // Langsung deklarasikan dan isi nilainya di sini
        const newCategory = await db_1.prisma.category.create({
            data: {
                name,
            },
        });
        return res.status(201).json(newCategory);
    }
    catch (error) {
        return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};
exports.createCategories = createCategories;
//3. menampilkan data category berdasarkan id
const showCategory = async (req, res) => {
    const categoryId = parseInt(req.params.id, 10);
    // Atau jika masih array: categories.find((c) => c.id === categoryId);
    const categoryData = await db_1.prisma.category.findUnique({
        where: { id: categoryId }
    });
    if (!categoryData) {
        return res.status(404).json({ success: false, message: 'Category tidak ditemukan' });
    }
    return res.status(200).json({ success: true, data: categoryData });
};
exports.showCategory = showCategory;
//4. mengupdate data category berdasarkan id
const updateCategory = async (req, res) => {
    const categoryId = parseInt(req.params.id, 10);
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ success: false, message: 'Nama harus diisi' });
    }
    try {
        const updatedCategory = await db_1.prisma.category.update({
            where: { id: categoryId },
            data: { name }
        });
        return res.status(200).json({
            success: true,
            message: 'Category berhasil diupdate',
            data: updatedCategory
        });
    }
    catch (error) {
        return res.status(404).json({ success: false, message: 'Category tidak ditemukan' });
    }
};
exports.updateCategory = updateCategory;
//5. menghapus data category berdasarkan id
const deleteCategory = async (req, res) => {
    const categoryId = parseInt(req.params.id, 10);
    try {
        await db_1.prisma.category.delete({
            where: { id: categoryId }
        });
        return res.status(200).json({ success: true, message: 'Category berhasil dihapus' });
    }
    catch (error) {
        return res.status(404).json({ success: false, message: 'Category tidak ditemukan' });
    }
};
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=categoryControllers.js.map
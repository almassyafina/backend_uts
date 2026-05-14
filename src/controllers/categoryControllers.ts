import { Request, Response } from 'express';
import { Category } from '../types/category';
import { prisma } from '../db/db';

let categories: Category[] = [];

//1. menampilkan list category
export const getCategories = async (req: Request, res: Response) => {
    //mengambil data dari database
    try {
        //jika berhasil
        const allEvents = await prisma.category.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        
        //tampilkan datanya
        res.json(allEvents);
    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil data event",
            error,
        })
    }
};   

//2. menyimpan data category
export const createCategories = async (req: Request, res: Response) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Nama harus diisi" });
    }

    try {
        // Langsung deklarasikan dan isi nilainya di sini
        const newCategory = await prisma.category.create({
            data: {
                name,
            },
        });

        return res.status(201).json(newCategory);
    } catch (error) {
        return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};

//3. menampilkan data category berdasarkan id
export const showCategory = async (req: Request<{ id: string }>, res: Response) => {
    const categoryId = parseInt(req.params.id, 10);

    // Atau jika masih array: categories.find((c) => c.id === categoryId);
    const categoryData = await prisma.category.findUnique({
        where: { id: categoryId }
    });

    if (!categoryData) {
        return res.status(404).json({ success: false, message: 'Category tidak ditemukan' });
    }

    return res.status(200).json({ success: true, data: categoryData });
};

//4. mengupdate data category berdasarkan id
export const updateCategory = async (req: Request<{ id: string }>, res: Response) => {
    const categoryId = parseInt(req.params.id, 10);
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ success: false, message: 'Nama harus diisi' });
    }

    try {
        const updatedCategory = await prisma.category.update({
            where: { id: categoryId },
            data: { name }
        });

        return res.status(200).json({ 
            success: true, 
            message: 'Category berhasil diupdate', 
            data: updatedCategory 
        });
    } catch (error) {
        return res.status(404).json({ success: false, message: 'Category tidak ditemukan' });
    }
};

//5. menghapus data category berdasarkan id
export const deleteCategory = async (req: Request<{ id: string }>, res: Response) => {
    const categoryId = parseInt(req.params.id, 10);

    try {
        await prisma.category.delete({
            where: { id: categoryId }
        });

        return res.status(200).json({ success: true, message: 'Category berhasil dihapus' });
    } catch (error) {
        return res.status(404).json({ success: false, message: 'Category tidak ditemukan' });
    }
};
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 1. menampilkan semua data pembicara
export const getpembicara = async (req: Request, res: Response): Promise<void> => {
    try {
        const pembicara = await prisma.pembicara.findMany();
        res.status(200).json({ message: "data pembicara berhasil ditampilkan", data: pembicara });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan pada server", error });
    }
};

// 2. menyimpan data pembicara
export const createpembicara = async (req: Request, res: Response): Promise<void> => {
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
                foto: image, // Sesuaikan dengan nama field di schema.prisma Anda
            },
        });
        res.status(201).json({ message: "pembicara berhasil disimpan", data: newPembicara });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan pada server", error });
    }
};

// 3. menampilkan data pembicara berdasarkan id
export const showpembicara = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
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
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan pada server", error });
    }
};

// 4. mengupdate pembicara berdasarkan id
export const updatePembicara = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
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
                foto: image || existingPembicara.foto,
            },
        });

        res.status(200).json({ success: true, message: "pembicara berhasil diupdate", data: updatedPembicara });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan pada server", error });
    }
};

// 5. menghapus data pembicara berdasarkan id
export const deletePembicara = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
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
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan pada server", error });
    }
};
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();

// 1. menampilkan semua data user
export const getuser = async ( req: Request, res: Response): Promise<void> => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json({
            message: "Data user berhasil diambil",
            data: users
        });
    } catch (error) {
        res.status(500).json({
            message: "Terjadi kesalahan server",
            error: error
        });
    }
};


// 2. menyimpan data user
export const createuser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password, image } = req.body;

    if (!name || !email || !password || !image) {
        res.status(400).json({
            message: "Nama, email, password, dan image harus diisi"
        });
        return;
    }

    try { 
        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password,
                image: image,
            },
        });
        res.status(201).json({message: "User berhasil dibuat", data: newUser });
    } catch (error) {
        res.status(500).json({
            message: "Terjadi kesalahan server",
            error: error
        });
    }
};

// 3. menampilkan data user berdasarkan id
export const showuser = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const userId = parseInt(req.params.id, 10);

    try {
        const userData = await prisma.user.findUnique({
            where: { id: userId },
        });               
        if (!userData) {
            res.status(404).json({
                success: false,
                message: "User tidak ditemukan"
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: userData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan server",
            error: error
        });
    }
};


// 4. mengupdate user berdasarkan id
export const updateuser = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const userId = parseInt(req.params.id, 10);
    const { name, email, password, image } = req.body;  
    try {
        // Cek apakah data ada di database
        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
        });             

        if (!existingUser) {
            res.status(404).json({
                success: false,
                message: "User tidak ditemukan"
            });
            return;
        }

        // Update data
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                name: name || existingUser.name,
                email: email || existingUser.email,
                password: password || existingUser.password,
                image: image || existingUser.image
            }
        });
        res.status(200).json({
            success: true,
            message: "User berhasil diupdate",
            data: updatedUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan server",
            error: error
        });
    }
};

// 5. menghapus data user berdasarkan id
export const deleteuser = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const userId = parseInt(req.params.id, 10);     

    try {
        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
        });

        if(!existingUser) {
            res.status(404).json({
                success: false,
                message: "User tidak ditemukan"
            });
            return;
        }

        await prisma.user.delete({
            where: { id: userId }
        });
        res.status(200).json({
            success: true,
            message: "User berhasil dihapus"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan server",
            error: error
        });
    }
};

import { Request, Response } from "express";
import { prisma } from "../db/db";

// 1. Menampilkan semua data event dari database
export const getEvent = async (req: Request, res: Response) => {
    try {
        const events = await prisma.event.findMany();
        return res.status(200).json({ 
            success: true, 
            message: "Data event berhasil ditampilkan", 
            data: events 
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Gagal mengambil data event" });
    }
};

// 2. Menyimpan data event ke database
export const createEvent = async (req: Request, res: Response) => {
    const { name, date, location, description } = req.body;

    if (!name) {
        return res.status(400).json({ success: false, message: "Nama harus diisi" });
    }

    try {
        const newEvent = await prisma.event.create({
            data: {
                name,
                categoryId: Number("categoryId"),
                location,
                dateEvent: new Date(date),
                description,
            },
        });

        return res.status(201).json({ 
            success: true, 
            message: "Event berhasil disimpan", 
            data: newEvent 
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Gagal menyimpan event" });
    }
};

// 3. Menampilkan data event berdasarkan id
export const showEvent = async (req: Request<{ id: string }>, res: Response) => {
    const eventId = parseInt(req.params.id, 10);

    try {
        const event = await prisma.event.findUnique({
            where: { id: eventId }
        });

        if (!event) {
            return res.status(404).json({ success: false, message: 'Event tidak ditemukan' });
        }

        return res.status(200).json({ success: true, data: event });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Terjadi kesalahan server" });
    }
};

// 4. Mengupdate event berdasarkan id
export const updateEvent = async (req: Request<{ id: string }>, res: Response) => {
    const eventId = parseInt(req.params.id, 10);
    const { name, description, date, location } = req.body;

    try {
        const updatedEvent = await prisma.event.update({
            where: { id: eventId },
            data: {
                name,
                description,
                date: date ? new Date(date) : undefined,
                location
            }
        });

        return res.status(200).json({
            success: true,
            message: 'Event berhasil diperbarui',
            data: updatedEvent
        });
    } catch (error) {
        // Prisma melempar error jika record tidak ditemukan saat update
        return res.status(404).json({ success: false, message: 'Event tidak ditemukan atau gagal diupdate' });
    }
};

// 5. Menghapus event berdasarkan id
export const deleteEvent = async (req: Request<{ id: string }>, res: Response) => {
    const eventId = parseInt(req.params.id, 10);

    try {
        await prisma.event.delete({
            where: { id: eventId }
        });

        return res.status(200).json({
            success: true,
            message: 'Event berhasil dihapus'
        });
    } catch (error) {
        return res.status(404).json({ success: false, message: 'Event tidak ditemukan atau gagal dihapus' });
    }
};
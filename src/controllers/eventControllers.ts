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
    // 1. Ambil semua field yang dikirim dari body
    const { name, category_id, pembicara_id, location, date_event, description } = req.body;

    // 2. Validasi sederhana
    if (!name || !category_id || !pembicara_id) {
        return res.status(400).json({ success: false, message: "Field wajib harus diisi" });
    }

    try {
        const newEvent = await prisma.event.create({
            data: {
                name,
                // Gunakan nilai yang benar dari variabel, pastikan diubah ke Number
                categoryId: Number(category_id),
                pembicaraId: Number(pembicara_id),
                location,
                dateEvent: new Date(date_event), 
                description,
            },
        });

        return res.status(201).json({ 
            success: true, 
            message: "Event berhasil disimpan", 
            data: newEvent 
        });
    } catch (error) {
        console.error(error); // Penting untuk melihat log error sebenarnya di Railway
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
    const { name, description, dateEvent, location } = req.body;

    try {
        // 1. Tampung dulu data yang pasti bisa diupdate
        const dataToUpdate: any = {
            name,
            description,
            location
        };

        // 2. Cek apakah frontend mengirimkan dateEvent baru?
        // Jika iya, ubah formatnya ke Date object lalu masukkan ke dataToUpdate
        if (dateEvent) {
            dataToUpdate.dateEvent = new Date(dateEvent);
        }

        // 3. Eksekusi update di Prisma
        const updatedEvent = await prisma.event.update({
            where: { id: eventId },
            data: dataToUpdate
        });

        return res.status(200).json({
            success: true,
            message: 'Event berhasil diperbarui',
            data: updatedEvent
        });
    } catch (error) {
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
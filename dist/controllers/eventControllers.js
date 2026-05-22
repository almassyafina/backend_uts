"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.showEvent = exports.createEvent = exports.getEvent = void 0;
const db_1 = require("../db/db");
// 1. Menampilkan semua data event dari database
const getEvent = async (req, res) => {
    try {
        const events = await db_1.prisma.event.findMany();
        return res.status(200).json({
            success: true,
            message: "Data event berhasil ditampilkan",
            data: events
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Gagal mengambil data event" });
    }
};
exports.getEvent = getEvent;
// 2. Menyimpan data event ke database
const createEvent = async (req, res) => {
    const { name, date, location, description } = req.body;
    if (!name) {
        return res.status(400).json({ success: false, message: "Nama harus diisi" });
    }
    try {
        const newEvent = await db_1.prisma.event.create({
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
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Gagal menyimpan event" });
    }
};
exports.createEvent = createEvent;
// 3. Menampilkan data event berdasarkan id
const showEvent = async (req, res) => {
    const eventId = parseInt(req.params.id, 10);
    try {
        const event = await db_1.prisma.event.findUnique({
            where: { id: eventId }
        });
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event tidak ditemukan' });
        }
        return res.status(200).json({ success: true, data: event });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Terjadi kesalahan server" });
    }
};
exports.showEvent = showEvent;
// 4. Mengupdate event berdasarkan id
const updateEvent = async (req, res) => {
    const eventId = parseInt(req.params.id, 10);
    const { name, description, dateEvent, location } = req.body;
    try {
        // 1. Tampung dulu data yang pasti bisa diupdate
        const dataToUpdate = {
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
        const updatedEvent = await db_1.prisma.event.update({
            where: { id: eventId },
            data: dataToUpdate
        });
        return res.status(200).json({
            success: true,
            message: 'Event berhasil diperbarui',
            data: updatedEvent
        });
    }
    catch (error) {
        return res.status(404).json({ success: false, message: 'Event tidak ditemukan atau gagal diupdate' });
    }
};
exports.updateEvent = updateEvent;
// 5. Menghapus event berdasarkan id
const deleteEvent = async (req, res) => {
    const eventId = parseInt(req.params.id, 10);
    try {
        await db_1.prisma.event.delete({
            where: { id: eventId }
        });
        return res.status(200).json({
            success: true,
            message: 'Event berhasil dihapus'
        });
    }
    catch (error) {
        return res.status(404).json({ success: false, message: 'Event tidak ditemukan atau gagal dihapus' });
    }
};
exports.deleteEvent = deleteEvent;
//# sourceMappingURL=eventControllers.js.map
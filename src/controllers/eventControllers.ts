import { Request, Response } from "express";
import { Event } from "../types/event";

let events: Event[] = [];
let nextId = 1;


//1 menampilkan data event
export const getEvent = (req: Request, res: Response) => {
    res.status(200).json({ message: "data event berhasil ditampilkan", data: events });
    };

//2 menyimpan data event
export const createEvent = (req: Request, res: Response) => {
    const { name, date, location, description } = req.body;
    let newEvent: Event;
    if (!name) {
        res.status(500).json({ message: "nama belum diisi" });
        return; 
    }

    newEvent = {
        id: Date.now(), 
        name: name,
        date: date,
        location: location,
        description: description
    };
    
    events.push(newEvent);
    res.status(201).json({ message: "event berhasil disimpan", data: newEvent });
    };

//3 menampilkan data event berdasarkan id
export const showEvent = (req: Request<{ id: string }>, res: Response): void => {
    const eventId = parseInt(req.params.id, 10);
    const event = events.find((e) => e.id === eventId);

    if (!event) {
        res.status(404).json({ success: false, message: 'Event tidak ditemukan' });
        return;
    }

    res.status(200).json({ success: true, data: event });
};



//4 mengupdate event berdasarkan id
export const updateEvent = (req: Request<{ id: string }>, res: Response) => {
    const eventId = parseInt(req.params.id, 10);
    const eventIndex = events.findIndex((e) => e.id === eventId);

    if (eventIndex === -1) {
        res.status(404).json({ success: false, message: 'Event tidak ditemukan' });
        return;
    }

    const existingEvent = events[eventIndex];

    if (!existingEvent) {
        res.status(404).json({ success: false, message: 'Event tidak valid' });
        return;
    }

    const { name, description, date, location } = req.body;

    const updatedEvent: Event = {
        id: existingEvent.id, 
        name: name || existingEvent.name,
        description: description || existingEvent.description,
        date: date || existingEvent.date,
        location: location || existingEvent.location
    };

    events[eventIndex] = updatedEvent;

    res.status(200).json({
        success: true,
        message: 'Event berhasil diperbarui',
        data: updatedEvent
    });

        
    };



//5 menghapus event berdasarkan id
export const deleteEvent = (req: Request<{ id: string }>, res: Response) => {
        const eventId = parseInt(req.params.id, 10);
        const eventIndex = events.findIndex((e) => e.id === eventId);
    
        if (eventIndex === -1) {
            res.status(404).json({ success: false, message: 'Event tidak ditemukan' });
            return;
        }

        const deletedEvent = events.splice(eventIndex, 1);
    
        res.status(200).json({
            success: true,
            message: 'Event berhasil dihapus',
            data: deletedEvent[0]
        });
        
    };
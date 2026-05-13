import { Request, Response } from "express";
import { Pembicara } from "../types/pembicara";

let pembicara : Pembicara[] = [];



//1 menampilkan data pembicara
export const getpembicara = (req : Request, res : Response) => {
    res.status(200).json({message: "data pembicara berhasil ditampilkan", data: pembicara});
};

//2 menyimpan data pembicara
export const createpembicara = (req : Request, res : Response) => {
    const { name, role, image } = req.body;
    let newPembicara: Pembicara;
    if (!name || !role) {
        res.status(500).json({ message: "Nama dan role harus diisi" });
        return;
    }
    newPembicara = {
        id: Date.now(),
        name: name,
        role: role,
        foto: image
    };
    pembicara.push(newPembicara);
    res.status(201).json({ message: "pembicara berhasil disimpan", data: newPembicara });
};

//3 menampilkan data pembicara berdasarkan id
export const showpembicara = (req: Request<{ id: string }>, res: Response ): void => {
    const pembicaraId = parseInt(req.params.id, 10);
    const pembicaraData = pembicara.find((p) => p.id === pembicaraId);

    if (!pembicaraData) {
        res.status(404).json({ success: false, message: 'Pembicara tidak ditemukan' });
        return;
    }

    res.status(200).json({ success : true, data : pembicaraData})
};

//4 mengupdate pembicara berdasarkan id
export const updatePembicara = (req: Request< { id: string }>, res : Response) => {
    const pembicaraId = parseInt(req.params.id, 10);
    const pembicaraIndex = pembicara.findIndex((p) => p.id === pembicaraId);

    if (pembicaraIndex === -1) {
        res.status(404).json({ success : false, message : 'Pembicara tidak ditemukan' });
        return;
    };

    const existingPembicara = pembicara[pembicaraIndex];

    if (!existingPembicara) {
        res.status(404).json({ success : false, message : 'pembicara tidak valid' });
        return;
    };

    const {name, role, image } = req.body;

    const updatePembicara : Pembicara = {
        id : pembicaraId,
        name : name || existingPembicara.name,
        role : role || existingPembicara.role,
        foto : image || existingPembicara.foto
    };

    pembicara[pembicaraIndex] = updatePembicara;

    res.status(200).json({ success : true, message : 'pembicara berhasil diupdate', data : updatePembicara });
};

//5 menghapus data pembicara berdasarkan id
export const deletePembicara = (req : Request<{ id: string} >, res : Response) => {
    const pembicaraId = parseInt(req.params.id, 10);
    const pembicaraIndex = pembicara.findIndex((p) => p.id = pembicaraId);

    if (pembicaraIndex === -1) {
        res.status(404).json({success : false, message : 'pembicara tidak ditemukan' });
    };

    pembicara.splice(pembicaraIndex, 1);
    
    res.status(200).json({ success : true, message : 'pembicara berhasil dihapus' });


    };
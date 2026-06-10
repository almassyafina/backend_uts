import { Request, Response } from "express";
import { prisma } from "../db/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async(req: Request, res: Response) => {
    const {email, password} = req.body;

    //Validasi input user
    if(!email || !password ){
        return res.status(400)
        .json({message: 'Email dan password harus diisi'});
    }

    //cek existing user
    const existingUser = await prisma.user.findUnique({
        where:{
            email
        }
    })

    //jika user tidak ditemukan, kembalikan respon error
    if (!existingUser) {
        return res.status(401)
        .json({message: "Email tidak ditemukan"});
    }

    //verifikasi password
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
        return res.status(400)
        .json({message: "password salah",
        });
    }

    const token = jwt.sign(
        {
            userId: existingUser.id,
            email: existingUser.email,
        },
        process.env.JWT_SECRET!,
        {expiresIn: "1h"}
    );

    //jika password benar, kembalikan respon sukses
    res.status(200).json({
        message: "Login berhasil",
        user: {
            name: existingUser.name,
            email: existingUser.email,
        },
        token,
    });
}


//REGISTER USER BARU
export const register = async(req: Request, res: Response) => {
    //MENANGKAP DATA YANG DIKRIM CILENT
try {
    const {name, email, password, image} = req.body;

    //Validasi input user
    if(!name || !email || !password || !image){
        return res.status(400)
        .json({message: 'Nama, email, dan password harus diisi'});
    }

    //cek existing user
    //

    const existingUser = await prisma.user.findUnique({
        where:{
            email
        }
    })

    if (existingUser) {
        return res.status(409).json
        ({
        message: "Email sudah digunakan",
        });
 }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: { 
            name,
            email,
            password: hashedPassword,
            image
        }
    })

    return res.status(201).json({
        message: "Register berhasil",
    data: { 
        id: newUser.id, 
        email: newUser.email, 
        name: newUser.name,
        password: newUser.password,
        image: newUser.image
    },
 });
    } catch (error) {
        return res.status(500).json({
        message: "Terjadi kesalahan server",
        });
    }
};
 


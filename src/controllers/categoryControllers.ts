import { Request, Response } from 'express';
import { Category } from '../types/category';

let categories: Category[] = [];

//1. menampilkan list category
export const getCategories = (req: Request, res: Response) => {
    res.json(categories);
        
    };
//2. menyimpan data category
export const createCategories = (req: Request, res: Response) => {
    const {name} = req.body;
    let newCategory: Category;
    if (!name){
        res.status(500).json({message: "Nama harus diisi"});
        return;
    }
    newCategory = {
        id: Date.now(),
        name: name
    };
    categories.push(newCategory);
    res.status(201).json({message: "Category berhasil disimpan", data: newCategory});
    
};

//3. menampilkan data category berdasarkan id
export const showCategory = (req: Request< {id :string} > , res: Response) => {
    const categoryId = parseInt(req.params.id, 10);
    const categoryData = categories.findIndex((c) => c.id === categoryId);

    if (!categoryData) {
        res.status(404).json({ success: false, message : 'Category tidak ditemukan' });
        return;
    };

    res.status(200).json({ success: true, data: categoryData });
        
};
//4. mengupdate data category berdasarkan id
export const updateCategory = (req: Request<{id: string}>, res: Response) => {
    const categoryId = parseInt(req.params.id, 10);
    const categoryIndex = categories.findIndex((c) => c.id === categoryId);

    if (categoryIndex === -1) {
        res.status(404).json({ success: false, message: 'Category tidak ditemukan' });
        return;
    };

    const existingCategory = categories[categoryIndex];

    if (!existingCategory) {
        res.status(404).json({ success: false, message: 'Category tidak valid' });
        return;
    };

    const { name } = req.body;
    if (!name){
        res.status(500).json({message: 'Nama harus diisi'});
        return;
    };

    const updateCategory : Category = {
        id: categoryId,
        name: name || existingCategory.name
    };

    categories[categoryIndex] = updateCategory;
        res.status(200).json({ success : true, message: 'Category berhasil diupdate', data: updateCategory });
};

//5. menghapus data category berdasarkan id
export const deleteCategory= (req: Request<{id: string}>, res: Response) => {
    const categoryId = parseInt(req.params.id, 10);
    const categoryIndex = categories.findIndex((c) => c.id === categoryId);

    if (categoryIndex === -1) {
        res.status(404).json({ success: false, message : 'Category tidak ditemukan' });
        return;
    };

    categories.splice(categoryIndex, 1);
    res.status(200).json({ success: true, message: 'Category berhasil dihapus' });

        
};
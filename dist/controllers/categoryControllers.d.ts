import { Request, Response } from 'express';
export declare const getCategories: (req: Request, res: Response) => Promise<void>;
export declare const createCategories: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const showCategory: (req: Request<{
    id: string;
}>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateCategory: (req: Request<{
    id: string;
}>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteCategory: (req: Request<{
    id: string;
}>, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=categoryControllers.d.ts.map
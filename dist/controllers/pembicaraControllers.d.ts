import { Request, Response } from "express";
export declare const getpembicara: (req: Request, res: Response) => Promise<void>;
export declare const createpembicara: (req: Request, res: Response) => Promise<void>;
export declare const showpembicara: (req: Request<{
    id: string;
}>, res: Response) => Promise<void>;
export declare const updatePembicara: (req: Request<{
    id: string;
}>, res: Response) => Promise<void>;
export declare const deletePembicara: (req: Request<{
    id: string;
}>, res: Response) => Promise<void>;
//# sourceMappingURL=pembicaraControllers.d.ts.map
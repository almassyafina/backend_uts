import { Request, Response } from "express";
export declare const getEvent: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createEvent: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const showEvent: (req: Request<{
    id: string;
}>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateEvent: (req: Request<{
    id: string;
}>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteEvent: (req: Request<{
    id: string;
}>, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=eventControllers.d.ts.map
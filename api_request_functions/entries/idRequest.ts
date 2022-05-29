import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../database";
import { Entry } from "../../interfaces";
import { EntryModel } from "../../models";

type Data = 
|{message: string} 
| Entry
        

export const updateEntry=async(req: NextApiRequest, res: NextApiResponse<Data>)=>{
    
    const {id}=req.query as {id:string};


    try {
        /*{*/ await db.connect();
                const entryToUpdate= await EntryModel.findById(id);
                if(!entryToUpdate) return res.status(400).json({message:'No existe la entrada'})
        
                const {
                    status=entryToUpdate.status,
                    description=entryToUpdate.description,
                }=req.body as Entry
        
                try {                           //actualización de los datos

                    const updated = await EntryModel.findByIdAndUpdate(id, { status, description}, { runValidators:true, new:true})
                    
                    /*}*/await db.disconnect();

                    return res.status( 200 ).json( updated! )

                }catch (error) {
                /*}*/await db.disconnect();
                console.log(error);
                return res.status(500).json({message:'Error al actualizar, estamos trabajando en ello'});
            }       
    
} catch (error) {
        console.log(error);
        return res.status(500).json({message:'No hay conexión a la base de datos'})
    }
}


export const getEntry=async(req:NextApiRequest, res:NextApiResponse<Data>)=>{

    const {id}= req.query as {id:string};

    try {
       await db.connect();
    
            const findEntry= await EntryModel.findById(id);
            
            await db.disconnect();
            
        if(!findEntry) return res.status(400).json({message:'Entrada no encontrada'});

        return res.status(200).json(findEntry)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'No se pudo conectar a la base de datos'});
    }
}

export const deleteEntry=async(req:NextApiRequest, res:NextApiResponse<Data> )=>{

    const {id}= req.query as {id:string};

    try {

        await db.connect();

            const findEntry= await EntryModel.findById(id);
            if(!findEntry) return res.status(400).json({message:'Entrada no encontrada'});
            await EntryModel.findByIdAndDelete(id);

            res.status(200).json({
                message:'Entrada eliminada'
            });

        await db.disconnect();
        
    } catch (error) {
        
    }

}
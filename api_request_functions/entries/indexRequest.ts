import { NextApiResponse, NextApiRequest } from "next";
import { db } from "../../database";
import { Entry, ISeedEntry } from "../../interfaces";
import { EntryModel } from "../../models";
import { IEntry } from "../../models/Entry";

type Data = 
|{message: string} 
| IEntry[] 
| Entry

export const getEntries=async(res:NextApiResponse<Data>)=>{
    try{
        await db.connect();
            const entries = await EntryModel.find().sort({createdAt:'ascending'});
        await db.disconnect();
        return res.status(200).json(entries)
    }
    catch(err){
        return res.status(400).json({
            message:'failed'
        })
    }
}
 
export const newEntry=async(req:NextApiRequest, res:NextApiResponse<Data>)=>{
    try{
        await db.connect();
            const {description='', status}:ISeedEntry = req.body
            const newEntry= new EntryModel({
                description,
                createAt:Date.now(),
                status
            });
            await newEntry.save();
        await db.disconnect();

        return res.status(201).json({description, createAt:Date.now(), _id:newEntry._id, status});
        
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message:'Algo salio mal estamos trabajando para solucionarlo'})
    }
}
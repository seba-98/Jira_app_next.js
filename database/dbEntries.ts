import {isValidObjectId} from "mongoose";
import { db } from "."
import { EntryModel } from "../models";
import { IEntry } from "../models/Entry";

export const getEntryById = async(id:string):Promise <IEntry | null>=>{

    if(!isValidObjectId(id)) return null;

    await db.connect();
        const findEntry= await EntryModel.findById(id).lean();
    await db.disconnect();

    if(!findEntry) return null

    return {...findEntry, _id:id };

}
'use server'

import connectDB from "@/database"
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";

export async function createProfileAction(formData, pathToRevalidate){
    await connectDB();
    await Profile.create(formData);
    revalidatePath(pathToRevalidate);
}

export async function fetchProfileAction(id){
    await connectDB();
    const result = await Profile.findOne({userId : id})
    return JSON.parse(JSON.stringify(result));
}
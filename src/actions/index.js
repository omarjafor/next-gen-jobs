'use server'

import connectDB from "@/database"
import Application from "@/models/application";
import Job from "@/models/job";
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

export async function postNewJobAction(formData, pathToRevalidate){
    await connectDB();
    await Job.create(formData);
    revalidatePath(pathToRevalidate);
}

export async function fetchJobsForRecruiterAction(id){
    await connectDB();
    const result = await Job.find({recruiterId: id});
    return JSON.parse(JSON.stringify(result));
}

export async function fetchAllJobsAction(){
    await connectDB();
    const result = await Job.find({});
    return JSON.parse(JSON.stringify(result));
}

export async function createJobApplicationAction(data, pathToRevalidate){
    await connectDB();
    await Application.create(data);
    revalidatePath(pathToRevalidate);
}

export async function fetchJobApplicationForCandidateAction(id) {
    await connectDB();
    const result = await Application.find({ candidateUserId: id });
    return JSON.parse(JSON.stringify(result));
}

export async function fetchJobApplicationForRecruiterAction(id) {
    await connectDB();
    const result = await Application.find({ recruiterUserId: id });
    return JSON.parse(JSON.stringify(result));
}

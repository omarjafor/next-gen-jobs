'use server'

import connectDB from "@/database"
import Application from "@/models/application";
import Job from "@/models/job";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";

export async function createProfileAction(formData, pathToRevalidate) {
    await connectDB();
    await Profile.create(formData);
    revalidatePath(pathToRevalidate);
}

export async function fetchProfileAction(id) {
    await connectDB();
    const result = await Profile.findOne({ userId: id })
    return JSON.parse(JSON.stringify(result));
}

export async function postNewJobAction(formData, pathToRevalidate) {
    await connectDB();
    await Job.create(formData);
    revalidatePath(pathToRevalidate);
}

export async function fetchJobsForRecruiterAction(id) {
    await connectDB();
    const result = await Job.find({ recruiterId: id });
    return JSON.parse(JSON.stringify(result));
}

export async function fetchAllJobsAction(filterParams = {}) {
    await connectDB();
    let updatedParams = {};
    Object.keys(filterParams).forEach(filterKey => {
        updatedParams[filterKey] = { $in: filterParams[filterKey].split(',') }
    })
    const result = await Job.find(filterParams && Object.keys(filterParams).length > 0 ? updatedParams : {});
    return JSON.parse(JSON.stringify(result));
}

export async function createJobApplicationAction(data, pathToRevalidate) {
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

export async function getCandidateDetailsAction(id) {
    await connectDB();
    const result = await Profile.findOne({ userId: id });
    return JSON.parse(JSON.stringify(result));
}

export async function updateJobApplicantAction(data, pathToRevalidate) {
    await connectDB();
    const { status, _id } = data;
    await Application.findOneAndUpdate({
        _id: _id
    }, { status }, { new: true })
    revalidatePath(pathToRevalidate);
}

export async function filterCategoryAction() {
    await connectDB();
    const result = await Job.find({});
    return JSON.parse(JSON.stringify(result));
}

export async function updateProfileAction(data, pathToRevalidate) {
    await connectDB();
    const { recruiterInfo, candidateInfo, _id } = data;
    await Profile.findOneAndUpdate({ _id: _id }, { recruiterInfo, candidateInfo }, { new: true });
    revalidatePath(pathToRevalidate);
}
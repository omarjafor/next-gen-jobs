'use server'

import connectDB from "@/database"
import Application from "@/models/application";
import Feed from "@/models/feed";
import Job from "@/models/job";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";

const stripe = require('stripe')(process.env.Stripe_Sk)

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
    const { isPremiumUser, memberShipType,  memberShipStartDate, memberShipEndDate, recruiterInfo, candidateInfo, _id } = data;
    await Profile.findOneAndUpdate({ _id: _id }, { isPremiumUser, memberShipType, memberShipStartDate, memberShipEndDate, recruiterInfo, candidateInfo }, { new: true });
    revalidatePath(pathToRevalidate);
}

// create stripe price id based on tier Selection
export async function createPriceIdAction(data){
    const session = await stripe.prices.create({
        currency: 'BDT',
        unit_amount: data?.amount * 100,
        recurring: {
            interval : 'year'
        },
        product_data: {
            name: 'Premium Plan'
        }
    });

    return {
        success: true,
        id: session?.id
    }
}

// create payment logic stripe
export async function createStripePaymentAction(data){
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: data?.lineItems,
        mode: 'subscription',
        success_url: `${process.env.URL}/membership`+'?status=success',
        cancel_url: `${process.env.URL}/membership`+'?status=cancel'
    });
    return{
        success: true,
        id: session?.id
    }
}

// create post action 
export async function createFeedPostAction(data, pathToRevalidate) {
    await connectDB();
    await Feed.create(data);
    revalidatePath(pathToRevalidate);
}

// fetch all posts action 
export async function fetchAllPostsAction() {
    await connectDB();
    const posts = await Feed.find({});
    return JSON.parse(JSON.stringify(posts));
}
// update feed post action
export async function updateFeedPostAction(data, pathToRevalidate) {
    await connectDB();
    const { userId, userName, message, image, likes, _id } = data;
    await Feed.findOneAndUpdate({_id: _id}, {userId, userName, message, image, likes}, {new: true});
    revalidatePath(pathToRevalidate);
}
// delete feed post action
export async function deleteFeedPostAction(id, pathToRevalidate) {
    await connectDB();
    await Feed.findByIdAndDelete({_id: id});
    revalidatePath(pathToRevalidate);
}
'use client'

import { useEffect, useState } from "react";
import CommonForm from "../common-form";
import { candidateOnboardFormControls, initialCandidateFormData, initialRecruiterFormData, recruiterOnboardFormControls } from "@/utils";
import { updateProfileAction } from "@/actions";
import { useToast } from "../ui/use-toast";

const AccountInfo = ({ profile }) => {
    const { toast } = useToast()
    const [candidateData, setCandidateData] = useState(initialCandidateFormData)
    const [recruiterData, setRecruiterData] = useState(initialRecruiterFormData)

    useEffect( () => {
        profile?.role === 'candidate' ? setCandidateData(profile?.candidateInfo) : setRecruiterData(profile?.recruiterInfo)
    } , [profile])

    async function handleUpdateAccount(){
        await updateProfileAction(profile?.role === 'candidate' ? { _id: profile?._id, candidateInfo: { ...candidateData, resume: profile?.candidateInfo?.resume } } : { _id: profile?._id, recruiterInfo: {...recruiterData}}, '/account');
        toast({ title: "Profile Update Successfully" });
    }
    return (
        <div className="mx-auto max-w-7xl">
            <div className="flex items-baseline justify-between pb-6 border-b dark:border-white pt-24">
                <h1 className="text-4xl font-bold tracking-tight">Account Details</h1>
            </div>
            <div className="py-20 pb-24 pt-6">
                <div className="container mx-auto p-0 space-y-8">
                    <CommonForm 
                    action={handleUpdateAccount}
                    formControls={profile?.role === 'candidate' ? candidateOnboardFormControls.filter(item => item.name !== 'resume'): recruiterOnboardFormControls }
                        formData={profile?.role === 'candidate' ? candidateData : recruiterData }
                        setFormData={profile?.role === 'candidate' ? setCandidateData : setRecruiterData}
                        buttonText={'Update Profile'}
                    />
                </div>
            </div>
        </div>
    );
};

export default AccountInfo;
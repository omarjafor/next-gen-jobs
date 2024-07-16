'use client'

import { useEffect, useState } from "react";
import CommonForm from "../common-form";
import { candidateOnboardFormControls, initialCandidateFormData, initialRecruiterFormData, recruiterOnboardFormControls } from "@/utils";

const AccountInfo = ({ profile }) => {
    const [candidateData, setCandidateData] = useState(initialCandidateFormData)
    const [recruiterData, setRecruiterData] = useState(initialRecruiterFormData)

    useEffect( () => {
        profile?.role === 'candidate' ? setCandidateData(profile?.candidateInfo) : setRecruiterData(profile?.recruiterInfo)
    } , [profile])

    async function handleUpdateAccount(){
        
    }
    return (
        <div className="mx-auto max-w-7xl">
            <div className="flex items-baseline justify-between pb-6 border-b pt-24">
                <h1 className="text-4xl font-bold tracking-tight text-gray-950">Account Details</h1>
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
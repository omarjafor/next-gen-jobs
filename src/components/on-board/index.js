'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import CommonForm from "../common-form";
import { candidateOnboardFormControls, initialCandidateFormData, initialRecruiterFormData, recruiterOnboardFormControls } from "@/utils";
import { useUser } from "@clerk/nextjs";
import { createProfileAction } from "@/actions";
import { useToast } from "../ui/use-toast";
import { supabaseClient } from "@/utils/supabase";

const OnBoard = () => {
    const { user } = useUser();
    const { toast } = useToast()
    const [currentTab, setCurrentTab] = useState('candidate');
    const [recruiterFormData, setRecruiterFromData] = useState(initialRecruiterFormData);
    const [candidateFormData, setCandidateFromData] = useState(initialCandidateFormData);
    const [file, setFile] = useState(null);

    function handleTabChange(value) {
        setCurrentTab(value);
    }

    function candidateButtonValid() {
        return Object.keys(candidateFormData).every(key => candidateFormData[key].trim() !== '')
    }

    function recruiterButtonValid() {
        return Object.keys(recruiterFormData).every(key => recruiterFormData[key].trim() !== '')
    }

    async function createProfile() {
        const data = currentTab === 'candidate' ? {
            candidateInfo: candidateFormData,
            role: 'candidate',
            isPremiumUser: false,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress
        } : {
            recruiterInfo: recruiterFormData,
            role: 'recruiter',
            isPremiumUser: false,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress
        };
        await createProfileAction(data, '/onboard')
        toast({ title: "Your onboarding completed" })
    }

    function handleFileChange(e) {
        e.preventDefault();
        setFile(e.target.files[0]);
    }

    async function handleUploadToSupabase(){
        const {data, error} = await supabaseClient.storage.from('NextGen-Jobs').upload(`/public/${file.name}`, file, {
            cacheControl: '3600',
            upsert: false,
        });
        console.log(data, error);
        if(data){
            setCandidateFromData({
                ...candidateFormData,
                resume: data.path
            })
        }
    }

    useEffect(() => {
        if(file) handleUploadToSupabase()
    } , [file])

    return (
        <div>
            <Tabs value={currentTab} onValueChange={handleTabChange}>
                <div className="w-full px-20">
                    <div className="flex items-baseline justify-between border-b pb-6 pt-24">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Welcome to onboarding...</h1>
                        <TabsList>
                            <TabsTrigger value='candidate'>Candidate</TabsTrigger>
                            <TabsTrigger value='recruiter'>Recruiter</TabsTrigger>
                        </TabsList>
                    </div>
                </div>
                <TabsContent value='candidate'>
                    <CommonForm
                        action={createProfile}
                        formControls={candidateOnboardFormControls}
                        buttonText={'Onboard as Candidate'}
                        formData={candidateFormData}
                        setFormData={setCandidateFromData}
                        handleFileChange={handleFileChange}
                        isBtnDisabled={!candidateButtonValid()}
                    />
                </TabsContent>
                <TabsContent value='recruiter'>
                    <CommonForm
                        formControls={recruiterOnboardFormControls}
                        buttonText={'Onboard as Recruiter'}
                        formData={recruiterFormData}
                        setFormData={setRecruiterFromData}
                        isBtnDisabled={!recruiterButtonValid()}
                        action={createProfile}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default OnBoard;
'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import CommonForm from "../common-form";
import { candidateOnboardFormControls, initialCandidateFormData, initialRecruiterFormData, recruiterOnboardFormControls } from "@/utils";
import { useUser } from "@clerk/nextjs";
import { createProfileAction } from "@/actions";
import { useToast } from "../ui/use-toast";

const OnBoard = () => {
    const {user} = useUser();
    const { toast } = useToast()
    const [currentTab, setCurrentTab] = useState('candidate');
    const [recruiterFormData, setRecruiterFromData] = useState(initialRecruiterFormData);
    const [candidateFormData, setCandidateFromData] = useState(initialCandidateFormData);
    function handleTabChange(value){
        setCurrentTab(value);
    }

    function handleButtonValid() {
        return Object.keys(recruiterFormData).every(key => recruiterFormData[key].trim() !== '')
    }

    async function createProfile(){
        const data = {
            recruiterInfo: recruiterFormData,
            role: 'recruiter',
            isPremiumUser: false,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress
        };
        await createProfileAction(data, '/onboard')
        toast({title: "Your onboarding completed"})
    }

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
                    formControls={candidateOnboardFormControls}
                    buttonText={'Onboard as Candidate'}
                    formData={candidateFormData}
                    setFormData={setCandidateFromData}
                    />
                </TabsContent>
                <TabsContent value='recruiter'>
                    <CommonForm
                    formControls={recruiterOnboardFormControls}
                    buttonText={'Onboard as Recruiter'}
                    formData={recruiterFormData}
                    setFormData={setRecruiterFromData}
                    isBtnDisabled={!handleButtonValid()}
                    action={createProfile}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default OnBoard;
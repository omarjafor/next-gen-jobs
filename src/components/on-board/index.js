'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import CommonForm from "../common-form";
import { candidateOnboardFormControls, initialCandidateFormData, initialRecruiterFormData, recruiterOnboardFormControls } from "@/utils";

const OnBoard = () => {
    const [currentTab, setCurrentTab] = useState('candidate');
    const [recruiterFormData, setRecruiterFromData] = useState(initialRecruiterFormData);
    const [candidateFormData, setCandidateFromData] = useState(initialCandidateFormData);
    function handleTabChange(value){
        setCurrentTab(value);
    }
    return (
        <div>
            <Tabs value={currentTab} onValueChange={handleTabChange}>
                <div className="w-full">
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
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default OnBoard;
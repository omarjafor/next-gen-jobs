'use client'

import { Tabs, TabsList } from "../ui/tabs";

const CandidateActivity = ({ jobList, jobApplicationList }) => {
    
    return (
        <div className="mx-auto max-w-7xl">
            <Tabs defaultValue="Applied" className="w-full">
                <div className="flex items-center justify-between border-b pb-6 pt-24">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-950">Your Activity</h1>
                    <TabsList>

                    </TabsList>
                </div>
            </Tabs>
        </div>
    );
};

export default CandidateActivity;
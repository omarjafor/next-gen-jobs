'use client'

import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const CandidateActivity = ({ jobList, jobApplicationList }) => {
    const uniqueStatus = [...new Set(jobApplicationList.map(jobItem => jobItem.status).flat(1))]
    
    return (
        <div className="mx-auto max-w-7xl">
            <Tabs defaultValue="Applied" className="w-full">
                <div className="flex items-center justify-between border-b pb-6 pt-24">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-950">Your Activity</h1>
                    <TabsList>
                        {
                            uniqueStatus.map((status, index) => <TabsTrigger key={index} value={status}>{status}</TabsTrigger>)
                        }
                    </TabsList>
                </div>
                <div className="pb-24 pt-6">
                    <div className="container mx-auto space-y-8">
                        <div className="flex flex-col gap-8">
                            {
                                uniqueStatus.map((status, index) => (
                                    <TabsContent key={index} value={status}>
                                        {
                                            jobList.filter((jobItem) => jobApplicationList.filter(jobApp => jobApp.status.indexOf(status) > -1).findIndex(filterItemByStatus => jobItem._id === filterItemByStatus.jobId) > -1).map(finalJobItem => <CommonCard
                                            key={index}
                                            icon={<JobIcon/>}
                                            title={finalJobItem?.title}
                                            description={finalJobItem?.description || finalJobItem?.companyName}
                                            />)
                                        }
                                    </TabsContent>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </Tabs>
        </div>
    );
};

export default CandidateActivity;
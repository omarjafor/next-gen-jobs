import { Fragment, useState } from "react";
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { createJobApplicationAction } from "@/actions";

const CandidateJobCard = ({ jobItem, profile, jobApplication }) => {
    const [showJobDetails, setShowJobDetails] = useState(false);
    
    async function handleJobApply() {
        const data = {
            recruiterUserId: jobItem?.recruiterId,
            name: profile?.candidateInfo?.name,
            email: profile?.email,
            candidateUserId: profile?.userId,
            status: ['Applied'],
            jobId: jobItem?._id,
            jobAppliedDate: new Date().toLocaleDateString()
        }
        await createJobApplicationAction(data, '/jobs');
        setShowJobDetails(false);
    }

    return (
        <Fragment>
            <Drawer
                open={showJobDetails}
                onOpenChange={setShowJobDetails}
            >
                <CommonCard
                    icon={<JobIcon />}
                    title={jobItem?.title}
                    description={jobItem?.companyName || jobItem?.description}
                    footerContent={<Button
                        onClick={() => setShowJobDetails(true)}
                        className=" dark:bg-[#fffa27] disabled:opacity-55 flex h-11 items-center justify-center px-5"
                    >
                        View Details
                    </Button>}
                />
                <DrawerContent className="p-6">
                    <DrawerHeader className="px-0">
                        <div className="flex justify-between">
                            <DrawerTitle className="text-4xl dark:text-white font-extrabold text-gray-800">
                                {jobItem?.title}
                            </DrawerTitle>
                            <div className="flex gap-3">
                                <Button
                                    disabled={
                                        jobApplication.findIndex(job => job.jobId === jobItem?._id) > -1 ? true : false
                                    }
                                    onClick={handleJobApply}
                                    className="disabled:opacity-65 flex h-11 items-center justify-center px-5">
                                    {
                                        jobApplication.findIndex(job => job.jobId === jobItem?._id) > -1 ? 'Applied' : 'Apply'
                                    }
                                </Button>
                                <Button
                                    className=" flex h-11 items-center justify-center px-5"
                                    onClick={() => setShowJobDetails(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </DrawerHeader>
                    <DrawerDescription className="text-2xl dark:text-white  font-medium text-gray-600">
                        {jobItem?.description}
                        <span className="text-xl dark:text-white  ml-4 font-normal text-gray-500">
                            {jobItem?.location}
                        </span>
                    </DrawerDescription>
                    <div className="w-[150px] mt-6 flex justify-center dark:bg-white  items-center h-[40px] bg-black rounded-[4px]">
                        <h2 className="text-xl font-bold dark:text-black  text-white">
                            {jobItem?.type}
                        </h2>
                    </div>
                    <h3 className="text-2xl font-medium text-black mt-3">
                        Experience: {jobItem?.experience} year
                    </h3>
                    <div className="flex gap-4 mt-6">
                        {jobItem?.skills.split(",").map((skillItem) => (
                            <div className="w-[100px] flex justify-center items-center h-[35px] dark:bg-white  bg-black rounded-[4px]">
                                <h2 className="text-[13px] font-medium text-white dark:text-black ">
                                    {skillItem}
                                </h2>
                            </div>
                        ))}
                    </div>
                    <div className="my-3 flex justify-center items-center h-[35px] dark:bg-white  bg-blue-400 rounded-[4px]">
                        <h2 className="text-[16px] font-bold text-black dark:text-white ">
                            {jobItem?.companyName}
                        </h2>
                    </div>
                </DrawerContent>
            </Drawer>
        </Fragment>
    );
};

export default CandidateJobCard;
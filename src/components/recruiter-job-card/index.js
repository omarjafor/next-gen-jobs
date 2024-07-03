'use client'

import { useState } from "react";
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import JobApplicants from "../job-applicants";

const RecruiterJobCard = ({ jobItem, profile, jobApplication }) => {
    const [showApplicant, setShowApplicant] = useState(false);
    const [candidateDetails, setCandidateDetails] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    return (
        <div>
            <CommonCard
                icon={<JobIcon />}
                title={jobItem?.title}
                description={jobItem?.description}
                footerContent={
                    <Button
                        onClick={() => setShowApplicant(true)}
                        disabled={jobApplication.filter(job => job.jobId === jobItem?._id).length === 0}
                        className=" dark:bg-[#fffa27] disabled:opacity-55 flex h-11 items-center justify-center px-5"
                    >
                        {
                            jobApplication.filter(job => job.jobId === jobItem?._id).length
                        } Applicants
                    </Button>}
            />
            <JobApplicants
                showApplicant={showApplicant}
                setShowApplicant={setShowApplicant}
                candidateDetails={candidateDetails}
                setCandidateDetails={setCandidateDetails}
                showDetailsModal={showDetailsModal}
                setShowDetailsModal={setShowDetailsModal}
                jobItem={jobItem}
                jobApplication={jobApplication.filter(job => job.jobId === jobItem?._id)}
            />
        </div>
    );
};

export default RecruiterJobCard;
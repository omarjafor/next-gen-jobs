'use client'

import { Fragment } from "react";
import { Button } from "../ui/button";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent } from "../ui/dialog";
import { getCandidateDetailsAction, updateJobApplicantAction } from "@/actions";
import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient('https://ldqlmidmuhvnmivwqgew.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkcWxtaWRtdWh2bm1pdndxZ2V3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk4NTcxMTEsImV4cCI6MjAzNTQzMzExMX0.7kS6R_nHBVPNKYXJxXs0dgmvmBeP8klW25Z220cMM2A');

const CandidateList = ({ candidateDetails, setCandidateDetails, showDetailsModal, setShowDetailsModal, jobApplication }) => {
    async function handleCadidateDetails(id){
        const data = await getCandidateDetailsAction(id);
        
        if(data){
            setCandidateDetails(data);
            setShowDetailsModal(true);
        }
    }
    function handlePreviewResume(){
        const {data} = supabaseClient.storage.from('NextGen Jobs').getPublicUrl(candidateDetails?.candidateInfo?.resume);
        const a = document.createElement('a');
        a.href = data?.publicUrl;
        a.setAttribute('download', `${candidateDetails?.candidateInfo?.name}.pdf`);
        a.setAttribute('target', '_blank');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    async function handleUpdateJobStatus(status){
        const applicant = jobApplication?.find(item => item.candidateUserId === candidateDetails?.userId)
        const updateData = {...applicant, status: applicant.status.concat(status)}
        await updateJobApplicantAction(updateData, '/jobs');
        setShowDetailsModal(false);
    }
    return (
        <Fragment>
            <div className="grid grid-cols-1 gap-3 p-10 md:grid-cols-2 lg:grid-cols-3">
                {jobApplication && jobApplication.length > 0
                    ? jobApplication.map((jobApplicantItem) => (
                        <div className="bg-white shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
                            <div className="px-4 my-6 flex justify-between items-center">
                                <h3 className="text-lg font-bold dark:text-black">
                                    {jobApplicantItem?.name}
                                </h3>
                                <Button
                                    onClick={() => handleCadidateDetails(jobApplicantItem?.candidateUserId)}
                                    className="dark:bg-[#fffa27]  flex h-11 items-center justify-center px-5"
                                >
                                    View Profile
                                </Button>
                            </div>
                        </div>
                    ))
                    : null}
            </div>
            <Dialog open={showDetailsModal} onOpenChange={() => {
                setCandidateDetails(null)
                setShowDetailsModal(false)
            }}>
                <DialogContent>
                    <div>
                        <h1 className="text-2xl font-bold dark:text-white text-black">
                            {candidateDetails?.candidateInfo?.name},{" "}
                            <span className="text-gray-500">{candidateDetails?.email}</span>
                        </h1>
                        <p className="text-xl font-medium dark:text-white text-black">
                            {candidateDetails?.candidateInfo?.currentCompany}
                        </p>
                        <p className="text-sm font-normal dark:text-white text-black">
                            {candidateDetails?.candidateInfo?.currentJobLocation}
                        </p>
                        <p className="dark:text-white">
                            Total Experience:
                            {candidateDetails?.candidateInfo?.totalExperience} Years
                        </p>
                        <p className="dark:text-white">
                            Salary: {candidateDetails?.candidateInfo?.currentSalary}{" "}
                            LPA
                        </p>
                        <p className="dark:text-white">
                            Notice Period:{" "}
                            {candidateDetails?.candidateInfo?.noticePeriod} Days
                        </p>
                        <div className="gap-4 my-2">
                            <h1 className="dark:text-white">Previous Companies :</h1>
                            <div className="flex flex-wrap items-center gap-4 my-2">
                                {candidateDetails?.candidateInfo?.previousCompanies
                                    .split(",")
                                    .map((skillItem) => (
                                        <div className="w-[100px] dark:bg-white flex justify-center items-center h-[35px] bg-black rounded-[4px]">
                                            <h2 className="text-[13px]  dark:text-black font-medium text-white">
                                                {skillItem}
                                            </h2>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <h1 className="dark:text-white">Candidate Skills : </h1>
                        <div className="flex flex-wrap gap-4 my-2">
                            {candidateDetails?.candidateInfo?.skills
                                .split(",")
                                .map((skillItem) => (
                                    <div className="w-[100px] dark:bg-white flex justify-center items-center h-[35px] bg-black rounded-[4px]">
                                        <h2 className="text-[13px] dark:text-black font-medium text-white">
                                            {skillItem}
                                        </h2>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            onClick={handlePreviewResume}
                            className=" flex h-11 items-center justify-center px-5"
                        >
                            Resume
                        </Button>
                        <Button
                            onClick={() => handleUpdateJobStatus('selected')}
                            className=" disabled:opacity-65 flex h-11 items-center justify-center px-5"
                            disabled={
                                jobApplication
                                    .find(
                                        (item) =>
                                            item.candidateUserId === candidateDetails?.userId
                                    )
                                    ?.status.includes("selected") ||
                                    jobApplication
                                        .find(
                                            (item) =>
                                                item.candidateUserId === candidateDetails?.userId
                                        )
                                        ?.status.includes("rejected")
                                    ? true
                                    : false
                            }
                        >
                            {jobApplication
                                .find(
                                    (item) =>
                                        item.candidateUserId === candidateDetails?.userId
                                )
                                ?.status.includes("selected")
                                ? "Selected"
                                : "Select"}
                        </Button>
                        <Button
                            onClick={() => handleUpdateJobStatus('rejected')}
                            className=" disabled:opacity-65 flex h-11 items-center justify-center px-5"
                            disabled={
                                jobApplication
                                    .find(
                                        (item) =>
                                            item.candidateUserId === candidateDetails?.userId
                                    )
                                    ?.status.includes("selected") ||
                                    jobApplication
                                        .find(
                                            (item) =>
                                                item.candidateUserId === candidateDetails?.userId
                                        )
                                        ?.status.includes("rejected")
                                    ? true
                                    : false
                            }
                        >
                            {jobApplication
                                .find(
                                    (item) =>
                                        item.candidateUserId === candidateDetails?.userId
                                )
                                ?.status.includes("rejected")
                                ? "Rejected"
                                : "Reject"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
};

export default CandidateList;
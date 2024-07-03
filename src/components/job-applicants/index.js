'use client'

import CandidateList from "../candidate-list";
import { Drawer, DrawerContent } from "../ui/drawer";
import { ScrollArea } from "../ui/scroll-area";

const JobApplicants = ({ showApplicant, setShowApplicant, candidateDetails, setCandidateDetails, showDetailsModal, setShowDetailsModal, jobItem, jobApplication }) => {
    return (
        <Drawer open={showApplicant} onOpenChange={setShowApplicant}>
            <DrawerContent className='max-h-[50vh]'>
                <ScrollArea className='h-auto overflow-y-auto'>
                    <CandidateList 
                        jobApplication={jobApplication}
                        candidateDetails={candidateDetails}
                        setCandidateDetails={setCandidateDetails}
                        showDetailsModal={showDetailsModal}
                        setShowDetailsModal={setShowDetailsModal}
                    />
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    );
};

export default JobApplicants;
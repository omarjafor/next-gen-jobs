import { fetchAllJobsAction, fetchJobApplicationForCandidateAction } from "@/actions";
import CandidateActivity from "@/components/candidate-activity";
import { currentUser } from "@clerk/nextjs/server";


const ActivityPage = async() => {
    const user = await currentUser();
    const jobList = await fetchAllJobsAction();
    const jobApplicationList = await fetchJobApplicationForCandidateAction(user?.id);
    
    return (
        <CandidateActivity jobList={jobList} jobApplicationList={jobApplicationList} />
    );
};

export default ActivityPage;
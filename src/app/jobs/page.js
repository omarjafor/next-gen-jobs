import { fetchAllJobsAction, fetchJobApplicationForCandidateAction, fetchJobApplicationForRecruiterAction, fetchJobsForRecruiterAction, fetchProfileAction, filterCategoryAction } from "@/actions";
import JobListing from "@/components/job-listing";
import { currentUser } from "@clerk/nextjs/server";


const Jobs = async () => {
    const user = await currentUser();
    const profile = await fetchProfileAction(user?.id);
    const jobList = profile?.role === 'candidate' ? await fetchAllJobsAction() : await fetchJobsForRecruiterAction(user?.id);
    const jobApplicationList = profile?.role === 'candidate' ? await fetchJobApplicationForCandidateAction(user?.id) : await fetchJobApplicationForRecruiterAction(user?.id);
    const filterCategories = await filterCategoryAction();
    return <JobListing
        user={JSON.parse(JSON.stringify(user))}
        profile={profile}
        jobList={jobList}
        jobApplication={jobApplicationList}
        filterCategories={filterCategories}
    />
};

export default Jobs;
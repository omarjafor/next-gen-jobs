import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";


const CandidateJobCard = ({ jobItem }) => {
    return (
        <div>
            <CommonCard
                icon={<JobIcon />}
                title={jobItem?.title}
                description={jobItem?.description}
                footerContent={<Button
                    className=" dark:bg-[#fffa27] disabled:opacity-55 flex h-11 items-center justify-center px-5"
                >
                    View Details
                </Button>}
            />
        </div>
    );
};

export default CandidateJobCard;
'use client'

import PostNewJob from "../post-new-job";

const JobListing = ({ user, profile }) => {
    return (
        <div>
            <div className="mx-auto max-w-7xl">
                <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                        {
                            profile?.role === 'candidate' ? 'Explore All Jobs' : 'Jobs Dashboard'
                        }
                    </h1>
                    <div className="flex items-center">
                        {
                            profile?.role === 'candidate' ? <p>Filter</p> : <PostNewJob user={user} profile={profile} />
                        }
                    </div>
                </div>
                <div>
                    Job Listing
                </div>
            </div>
        </div>
    );
};

export default JobListing;
'use client'

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useEffect } from "react";

const HomeButton = ({ user, profile }) => {
    const router = useRouter();
    useEffect(() => {
        router.refresh();
    }, [])
    return (
        <div className="flex space-x-4">
            <Button
                onClick={() => router.push('/jobs')}
                className='flex h-11 items-center justify-center px-5'>
                {
                    user ? profile?.role === 'candidate' ? 'Browse Jobs' : 'Dashboard' : 'Find Jobs'
                }
            </Button>
            <Button
                onClick={() => router.push(user ? profile?.role === 'candidate' ? '/activity' : '/jobs' : '/sign-up')}
                className='flex h-11 items-center justify-center px-5'>
                {
                    user ? profile?.role === 'candidate' ? 'Your Activity' : 'Post New Job' : 'SignUp Now'
                }
            </Button>
        </div>
    );
};

export default HomeButton;
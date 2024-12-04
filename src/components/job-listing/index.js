'use client'

import { filterMenuData, formUrlQuery } from "@/utils";
import CandidateJobCard from "../candidate-job-card";
import PostNewJob from "../post-new-job";
import RecruiterJobCard from "../recruiter-job-card";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "../ui/menubar";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const JobListing = ({ user, profile, jobList, jobApplication, filterCategories }) => {

    const [filterParams, setFilterParams] = useState({})
    const searchParams = useSearchParams();
    const router = useRouter();

    function handleFilter(id, option){
        let params = { ...filterParams };
        const indexOfCurrentSection = Object.keys(params).indexOf(id);
        if(indexOfCurrentSection === -1){
            params = {
                ...params, [id]:[option]
            }
        }else {
            const indexOfCurrentOption = params[id].indexOf(option);
            if(indexOfCurrentOption === -1) params[id].push(option);
            else params[id].splice(indexOfCurrentOption, 1)
        }
        setFilterParams(params);
        sessionStorage.setItem('filterParams', JSON.stringify(params))
    }

    useEffect(() => {
        setFilterParams(JSON.parse(sessionStorage.getItem('filterParams')))
    }, [])

    useEffect( () => {
        if(filterParams && Object.keys(filterParams).length > 0){
            let url = '';
            url = formUrlQuery({
                params: searchParams.toString(),
                dataToAdd: filterParams
            });
            router.push(url, { scroll: false});
        }
    } , [filterParams, searchParams])

    const filterMenus = filterMenuData.map((item) => ({
        id: item.id,
        name: item.label,
        options: [
            ...new Set(filterCategories.map(listItem => listItem[item.id]))
        ]
    }));
    
    return (
        <div>
            <div className="mx-auto max-w-7xl">
                <div className="flex items-baseline justify-between border-b dark:border-white pb-6 pt-24">
                    <h1 className="text-4xl font-bold tracking-tight">
                        {
                            profile?.role === 'candidate' ? 'Explore All Jobs' : 'Jobs Dashboard'
                        }
                    </h1>
                    <div className="flex items-center">
                        {
                            profile?.role === 'candidate' ? (
                                <Menubar>
                                    {
                                        filterMenus.map(filterMenu => 
                                            <MenubarMenu>
                                                <MenubarTrigger>
                                                    {filterMenu.name}
                                                </MenubarTrigger>
                                                <MenubarContent>
                                                    {
                                                        filterMenu.options.map((option, optionIdx) => (
                                                            <MenubarItem key={optionIdx} className='flex items-center' onClick={() => handleFilter(filterMenu.id, option)}>
                                                            <div className={`size-4 border rounded border-gray-900 dark:border-white text-indigo-600 ${filterParams && Object.keys(filterParams).length > 0 && filterParams[filterMenu.id] && filterParams[filterMenu.id].indexOf(option) > -1 ? 'bg-black' : ''}`} />
                                                            <Label className='ml-3 cursor-pointer text-sm'>{option}</Label>
                                                            </MenubarItem>
                                                        ))
                                                    }
                                                </MenubarContent>
                                            </MenubarMenu>
                                        )
                                    }
                                </Menubar>
                            ) : (<PostNewJob user={user} profile={profile} />)
                        }
                    </div>
                </div>
                <div className="pt-6 pb-24">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
                        <div className="lg:col-span-4">
                            <div className="container mx-auto p-0 space-y-8">
                                <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                                    {
                                        jobList && jobList.length > 0 ? jobList.map(jobItem => profile.role === 'candidate' ? (<CandidateJobCard jobItem={jobItem} profile={profile} jobApplication={jobApplication} />) : (<RecruiterJobCard jobItem={jobItem} profile={profile} jobApplication={jobApplication} />)) : <p>No Job Found</p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobListing;
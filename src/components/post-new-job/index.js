'use client'

import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { initialJobFormData, jobFormControls } from "@/utils";
import CommonForm from "../common-form";

const PostNewJob = ({ user, profile }) => {
    const [showDialog, setShowDialog] = useState(false);
    const [jobFormData, setJobFormData] = useState({
        ...initialJobFormData, companyName: profile?.recruiterInfo?.companyName
    })

    function handleAddNewJob(){
        setShowDialog(true);
    }

    function handleButtonValid() {
        return Object.keys(jobFormData).every(key => jobFormData[key].trim() !== '')
    }

    function createNewJob(){
        
    }
    return (
        <div>
            <Button
                onClick={handleAddNewJob}
                className='disabled:opacity-60 flex h-11 items-center justify-center px-5'
            >Post A Job</Button>
            <Dialog
                open={showDialog}
                onOpenChange={() => {
                    setShowDialog(false)
                    setJobFormData({
                        ...initialJobFormData, companyName: profile?.recruiterInfo?.companyName
                    })
                }}
            >
                <DialogContent className='sm:max-w-screen-md h-[600px] overflow-auto'>
                    <DialogHeader>
                        <DialogTitle>Post New Job</DialogTitle>
                        <div className="grid gap-4 py-4">
                            <CommonForm
                                buttonText={"Add"}
                                formData={jobFormData}
                                setFormData={setJobFormData}
                                formControls={jobFormControls}
                                isBtnDisabled={!handleButtonValid()}
                                action={createNewJob}
                            />
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PostNewJob;
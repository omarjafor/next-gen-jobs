import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";


const CommonForm = ({action, formControls, buttonText, isBtnDisabled, btnType, formData, setFormData, handleFileChange}) => {
    function renderInputByComponentType(getControl){
        let content = null;
        switch (getControl.componentType) {
            case 'input':
                content = (<div className="relative flex items-center mt-8">
                    <Input
                    type='text'
                    disabled={getControl.disabled}
                    placeholder={getControl.placeholder}
                    name={getControl.name}
                    id={getControl.name}
                    value={formData[getControl.name]}
                    onChange={(e) => setFormData({
                        ...formData, [e.target.name]:e.target.value
                    })}
                        className='w-full rounded-md h-[60px] px-4 border bg-gray-100 dark:bg-black text-lg outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                    />
                </div>);
                break;
            case 'file':
                content = (
                    <Label
                        for={getControl.name}
                        className='flex bg-gray-100 dark:bg-black items-center px-3 py-3 mx-auto mt-6 text-center border-2 border-dashed rounded-lg cursor-pointer'
                    >
                        <h2 className="mr-4">{getControl.label} : </h2>
                        <Input
                            onChange={handleFileChange}
                            id={getControl.name}
                            type='file'
                            className='w-1/2'
                        />
                    </Label>
                )
                break;
            default:
                content = (<div className="relative flex items-center mt-8">
                    <Input
                        type='text'
                        disabled={getControl.disabled}
                        placeholder={getControl.placeholder}
                        name={getControl.name}
                        id={getControl.name}
                        value={formData[getControl.name]}
                        onChange={(e) => setFormData({
                            ...formData, [e.target.name]: e.target.value
                        })}
                        className='w-full rounded-md h-[60px] px-4 border bg-gray-100 dark:bg-black text-lg outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                    />
                </div>);
                break;
        }
        return content;
    }
    return (
        <form action={action} className="w-3/4 mx-auto">
            {formControls.map((control) => renderInputByComponentType(control))}
            <div className="mt-6 w-full">
                <Button
                type={btnType || 'submit'}
                    className='disabled:opacity-60 dark:bg-black dark:text-white flex h-11 items-center justify-center px-5'
                disabled={isBtnDisabled}
                >
                    {buttonText}
                </Button>
            </div>
        </form>
    );
};

export default CommonForm;
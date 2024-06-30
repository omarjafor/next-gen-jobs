'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { AlignJustify } from "lucide-react"
import Link from "next/link"

const menuItem = [
    {
        label: 'Home',
        path: '/',
        show: true
    },
    {
        label: 'Login',
        path: '/signin',
        show: true
    },
    {
        label: 'Sign Up',
        path: '/signup',
        show: true
    }
]
const Header = () => {
    return (
        <div>
            <header className="flex h-16 w-full shrink-0 items-center">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button>
                            <AlignJustify className="h-6 w-6" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side='left'>
                        <Link className="mr-6 hidden lg:flex" href={'#'}><h3>JOBSCO</h3></Link>
                        <div className="grid gap-2 py-6">
                            {
                                menuItem.map(item => item.show ?
                                    <Link href={item.path} className="flex w-full items-center py-2 text-lg font-semibold">{item.label}</Link>
                                    : null)
                            }
                        </div>
                    </SheetContent>
                </Sheet>
            </header>
        </div>
    );
};

export default Header;
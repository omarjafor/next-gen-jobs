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
import { UserButton } from "@clerk/nextjs"
import { AlignJustify } from "lucide-react"
import Link from "next/link"

const Header = ({user}) => {
    const menuItem = [
        {
            label: 'Home',
            path: '/',
            show: true
        },
        {
            label: 'Login',
            path: '/sign-in',
            show: !user
        },
        {
            label: 'Sign Up',
            path: '/sign-up',
            show: !user
        },
        {
            label: 'Jobs',
            path: '/jobs',
            show: user
        },
        {
            label: 'Activity',
            path: '/activity',
            show: user
        },
        {
            label: 'Membership',
            path: '/membership',
            show: user
        },
        {
            label: 'Account',
            path: '/account',
            show: user
        }
    ]

    return (
        <div>
            <header className="flex h-16 w-full shrink-0 items-center">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button className='lg:hidden'>
                            <AlignJustify className="h-6 w-6" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side='left'>
                        <Link className="mr-6 hidden lg:flex" href={'#'}><h3>NextGen Jobs</h3></Link>
                        <div className="grid gap-2 py-6">
                            {
                                menuItem.map(item => item.show ?
                                    <Link href={item.path} className="flex w-full items-center py-2 text-lg font-semibold">{item.label}</Link>
                                    : null)
                            }
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    </SheetContent>
                </Sheet>
                <Link className="hidden lg:flex mr-6" href={'/'}>NextGen Jobs</Link>
                <nav className="ml-auto hidden lg:flex gap-6">
                    {
                        menuItem.map(item => item.show ?
                            <Link href={item.path} className="group inline-flex h-9 w-max items-center rounded-md bg-white px-4 py-3 text-sm font-medium">{item.label}</Link>
                            : null)
                    }
                    <UserButton afterSignOutUrl="/" />
                </nav>
            </header>
        </div>
    );
};

export default Header;
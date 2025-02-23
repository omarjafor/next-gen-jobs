'use client'
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { UserButton } from "@clerk/nextjs"
import { AlignJustify, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"

const Header = ({ user, profile }) => {
    const { theme, setTheme } = useTheme();
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
            label: 'Feed',
            path: '/feed',
            show: profile
        },
        {
            label: 'Activity',
            path: '/activity',
            show: profile?.role === 'candidate'
        },
        {
            label: 'Companies',
            path: '/companies',
            show: profile?.role === 'candidate'
        },
        {
            label: 'Jobs',
            path: '/jobs',
            show: profile
        }, 
        {
            label: 'Membership',
            path: '/membership',
            show: profile
        },
        {
            label: 'Account',
            path: '/account',
            show: profile
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
                        <Link className="mr-6 hidden lg:flex" href={'#'}><h3 className="font-bold text-3xl">NextGen Jobs</h3></Link>
                        <div className="grid gap-2 py-6">
                            {
                                menuItem.map(item => item.show ?
                                    <Link href={item.path} className="flex w-full items-center py-2 text-lg font-semibold">{item.label}</Link>
                                    : null)
                            }
                            <Moon className="cursor-pointer mb-4" fill={theme === 'dark' ? 'light' : 'dark'} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    </SheetContent>
                </Sheet>
                <Link className="hidden lg:flex mr-6 font-bold text-3xl" href={'/'}>NextGen Jobs</Link>
                <nav className="ml-auto hidden lg:flex gap-6 items-center">
                    {
                        menuItem.map(item => item.show ?
                            <Link href={item.path} onClick={() => sessionStorage.removeItem("filterParams")}
                            className="group inline-flex h-9 w-max items-center rounded-md px-4 py-3 text-sm font-medium">{item.label}</Link>
                            : null)
                    }
                    <Moon className="cursor-pointer" fill={theme === 'dark' ? 'light' : 'dark'} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
                    <UserButton afterSignOutUrl="/" />
                </nav>
            </header>
        </div>
    );
};

export default Header;
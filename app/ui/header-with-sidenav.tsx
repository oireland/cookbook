"use client"

import {useEffect, useState} from "react"
import Link from "next/link"
import {usePathname} from "next/navigation"
import {Button} from "@/components/ui/button"
import {ChefHat, CalendarDays, LogOut, Menu, X, House} from "lucide-react"
import Logo from "@/app/ui/logo";
import {ModeToggle} from "@/components/mode-toggle";
import {signOut, useSession} from "next-auth/react";

export default function HeaderWithSidebar({children}: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const pathname = usePathname()
    const [showSidebar, setShowSidebar] = useState(false)
    const [logoUrl, setLogoUrl] = useState<string>("/")
    const session = useSession()

    useEffect(() => {
        let show = true;
        switch (pathname) {
            case "/login":
            case '/signup':
            case "/":
                show = false;
                break;

        }
        if (session.status === "unauthenticated") {
            show = false;
        }
        setShowSidebar(show);
        setIsSidebarOpen(false)
        setLogoUrl(session.status === "authenticated" ? '/dashboard' : '/')
    }, [pathname, session])

    const navItems = [
        {name: "Dashboard", href: "/dashboard", icon: House},
        {name: "Kitchen", href: "/dashboard/kitchen", icon: ChefHat},
        {name: "Bookings", href: "/dashboard/bookings", icon: CalendarDays},

    ]

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

    return (
        <div className="flex flex-col min-h-screen">
            {/* Main Header */}
            <header className="bg-background z-10 sticky top-0">
                <div className="flex items-center justify-between px-4 h-12 lg:h-16 border-b">
                    <div className="flex items-center">
                        {showSidebar && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="mr-2 lg:hidden"
                                onClick={toggleSidebar}
                            >
                                <Menu className="h-6 w-6"/>
                                <span className="sr-only">Toggle Sidebar</span>
                            </Button>
                        )}
                        <Link href={logoUrl}>
                            <Logo/>
                        </Link>
                    </div>
                    <ModeToggle/>

                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                {showSidebar && (
                    <aside
                        className={`
              sticky inset-y-0 left-0 top-12 lg:top-16 z-50 w-64 bg-background transform transition-transform duration-200 ease-in-out
              flex flex-col
              lg:sticky lg:translate-x-0 lg:h-[calc(100vh-4rem)] lg:pt-0
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
              ${isSidebarOpen ? 'shadow-lg' : ''} lg:shadow-none
            `}
                    >
                        <div className="flex justify-between items-center p-4 lg:hidden">
                            <span className="text-xl font-bold text-primary">Menu</span>
                            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                                <X className="h-6 w-6"/>
                                <span className="sr-only">Close Sidebar</span>
                            </Button>
                        </div>
                        <nav className="flex-1 overflow-y-auto p-4">
                            <div className="space-y-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center space-x-2 p-2 rounded-md transition-colors ${
                                            pathname === item.href
                                                ? "bg-primary text-primary-foreground"
                                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                        }`}
                                        onClick={() => setIsSidebarOpen(false)}
                                    >
                                        <item.icon className="h-5 w-5"/>
                                        <span>{item.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </nav>
                        <div className="p-4 border-t">
                            <Button
                                variant="outline"
                                className="w-full flex items-center justify-center space-x-2"
                                onClick={() => signOut({redirect: true,  callbackUrl: '/'})}
                            >
                                <LogOut className="h-4 w-4"/>
                                <span>Sign Out</span>
                            </Button>
                        </div>
                    </aside>
                )}

                {/* Main Content */}
                <main>
                    {children}
                </main>

            </div>

        </div>
    )
}
"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChefHat, CalendarDays, LogOut, Menu, X } from "lucide-react"

export default function SideNav() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    const navItems = [
        { name: "Kitchen", href: "/kitchen", icon: ChefHat },
        { name: "Bookings", href: "/bookings", icon: CalendarDays },
    ]

    const toggleSidebar = () => setIsOpen(!isOpen)

    return (
        <>
            <Button
                variant="outline"
                size="icon"
                className={`fixed top-4 left-4 z-50 lg:hidden transition-opacity duration-200 ${
                    isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
                onClick={toggleSidebar}
            >
                <Menu className="h-4 w-4" />
                <span className="sr-only">Open Sidebar</span>
            </Button>
            <div
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-background shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <nav className="h-full flex flex-col justify-between p-4">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between mb-6">
                            <div className="text-xl font-bold text-primary">Dashboard</div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="lg:hidden"
                                onClick={toggleSidebar}
                            >
                                <X className="h-4 w-4" />
                                <span className="sr-only">Close Sidebar</span>
                            </Button>
                        </div>
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center space-x-2 p-2 rounded-md transition-colors ${
                                    pathname === item.href
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                }`}
                            >
                                <item.icon className="h-5 w-5" />
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </div>
                    <Button
                        variant="outline"
                        className="w-full flex items-center justify-center space-x-2"
                        onClick={() => console.log("Sign out clicked")}
                    >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                    </Button>
                </nav>
            </div>
        </>
    )
}
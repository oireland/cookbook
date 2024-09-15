import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link";

export default function LandingPageCard() {
    return (
        <div className="p-3 w-1/2 mx-auto">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Welcome to CookBook</CardTitle>
                    <CardDescription>Book the oven and hob in your uni kitchen</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Get started by logging in or signing up.
                    </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button asChild variant="outline">
                        <Link href={'/login'} >Login</Link>
                    </Button>
                    <Button asChild>
                        <Link href={'/signup'} >Sign Up</Link>

                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
import {oswald} from "@/app/ui/fonts";
import {CookingPot} from "lucide-react";


export default function Logo() {
    return <div className="relative flex items-center space-x-1 h-10">
        <CookingPot className="h-6 w-6 lg:h-9 lg:w-9  text-destructive"/>
        <p className={`${oswald.className} text-foreground text-2xl lg:text-4xl`}>CookBook</p>
    </div>

};
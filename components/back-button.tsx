'use client'
import React from 'react';
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

function BackButton() {

    const router = useRouter();

    return (
        <Button type="button" onClick={router.back}>Back</Button>
    );
}

export default BackButton;
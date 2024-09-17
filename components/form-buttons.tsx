import React from 'react';
import BackButton from "@/components/back-button";
import {Button} from "@/components/ui/button";

function FormButtons() {
    return (
        <div className="flex justify-between w-full">
            <BackButton/>
            <Button type="submit" variant="destructive">Submit</Button>
        </div>
    );
}

export default FormButtons;
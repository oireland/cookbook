import React, {useState, useEffect, useRef} from 'react'
import {Input} from "@/components/ui/input"
import {Clock} from "lucide-react"
import {addLeadingZeros} from "@/lib/utils";


export default function DurationPicker({name = 'duration', onMillisChange, value}: {
    name?: string,
    onMillisChange: (milliseconds: number) => void,
    value: number
}) {
    const [hours, setHours] = useState('')
    const [minutes, setMinutes] = useState('')
    const hoursInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const hoursMs = parseInt(hours || '0') * 60 * 60 * 1000
        const minutesMs = parseInt(minutes || '0') * 60 * 1000
        onMillisChange(hoursMs + minutesMs)
    }, [hours, minutes, onMillisChange])

    useEffect(() => {
        const newHours = Math.floor(value / 1000 / 60 / 60).toString()
        const newMins = Math.floor(value / 1000 / 60 % 60).toString()
        setHours(addLeadingZeros(newHours, 2))
        setMinutes(addLeadingZeros(newMins, 2))
    }, [value]);

    const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value).toString()
        if (value === '' || (/^\d\d?$/.test(value) && parseInt(value) >= 0)) {
            setHours(addLeadingZeros(value, 2))
        }
    }

    const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value).toString()
        if (value === '' || (/^\d\d?$/.test(value) && parseInt(value) >= 0 && parseInt(value) < 60)) {
            setMinutes(addLeadingZeros(value, 2))
        }
    }

    const focusHoursInput = () => {
        hoursInputRef.current?.focus()
    }

    return (
        <div className="space-y-2">
            <div className="flex items-center space-x-2">
                <Clock
                    className="text-muted-foreground cursor-pointer"
                    size={20}
                    onClick={focusHoursInput}
                    aria-label="Focus duration input"
                />
                <div className="flex items-center space-x-2">
                    <Input
                        type="tel"
                        value={hours}
                        onChange={handleHoursChange}
                        placeholder="HH"
                        aria-label="Hours"
                        className="w-12 h-12 text-center p-0"
                        ref={hoursInputRef}
                    />
                    <span className="text-muted-foreground self-center font-bold">:</span>
                    <Input
                        type="tel"
                        value={minutes}
                        onChange={handleMinutesChange}
                        placeholder="MM"
                        aria-label="Minutes"
                        className="w-12 h-12 text-center p-0"
                        max="59"
                    />
                </div>
            </div>
            <input type="hidden" name={name} value={value}/>
        </div>
    )
}

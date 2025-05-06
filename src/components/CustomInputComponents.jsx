"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
// import { Calendar } from "@/components/ui/calendar"
import {formatDate} from "@/utils/date-formatter"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export const Select = ({ onResetHandler, onChange, name, value, filterType = "sport" }) => {

    const sportOptions = [
        { option: "Select Sport", val: "" },
        { option: "Football", val: "Football" },
        { option: "Badminton", val: "Badminton" },
        { option: "Cricket", val: "Cricket" },
    ]


    return (
        <div className="relative inline-block w-64">
            <select
                key={value}
                name={name}
                value={value}
                onChange={onChange}
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-2xl leading-tight focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-200 transition-all duration-200"
            >
                {filterType === "sport" && sportOptions.map(item => (
                    <option key={item.option} value={item.val} > {item.option} </option>
                ))}
            </select>

            {value && (
                <button
                    type="button"
                    onClick={onResetHandler}
                    className="absolute cursor-pointer inset-y-0 right-4  text-gray-400 hover:text-red-500"
                >
                    ✕
                </button>
            )}

            {/* Dropdown arrow */}
            {!value && (
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            )}

        </div>
    )
}

export const Input = ({ value, onChange, onResetHandler, name, placeholder, type = "text" }) => {
    return (
        <div className="relative inline-block w-64">
            <input
                name={name}
                value={value}
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-2xl leading-tight focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-200 transition-all duration-200"
            />

        </div>
    )
}



export const DatePicker = ({date, onSelect, varient = "outline", placeholder = "Pick a date"}) => {

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={varient}
                    className={cn(
                        "w-64 h-12 rounded-2xl justify-start text-left",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon />
                    {date ? formatDate(date) : <span> {placeholder} </span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                {/* <Calendar
                    mode="single"
                    selected={date}
                    onSelect={onSelect}
                    initialFocus
                /> */}
            </PopoverContent>
        </Popover>
    )
}
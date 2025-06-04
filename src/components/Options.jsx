"use client"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"


// const data = [
//     { id: 1, name: "Beginner", value: "BEGINNER" },
//     { id: 2, name: "Intermediate", value: "INTERMEDIATE" },
//     { id: 3, name: "Advanced", value: "ADVANCED" },
// ]


export function Options({ placeholder, className, options, name, id }) {
    const [value, setValue] = useState("")
    return (
        <>
            <Select onValueChange={setValue}>
                <SelectTrigger className={`${className}`}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {options.map((item) =>
                            <SelectItem key={item.id} value={item.value}> {item.name} </SelectItem>
                        )}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <input type="hidden" id={id} name={name} value={value} />
        </>
    )
}

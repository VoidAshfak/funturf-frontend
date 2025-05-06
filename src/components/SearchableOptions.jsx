"use client"

import * as React from "react"
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandGroup,
} from "@/components/ui/command"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

export function SearchableOptions({ placeholder, className, options }) {
  const [open, setOpen] = React.useState(false)
  const [selectedValues, setSelectedValues] = React.useState([]) // Array to hold selected values (just values)
  const triggerRef = React.useRef(null)
  const [contentWidth, setContentWidth] = React.useState("auto")

  React.useEffect(() => {
    if (triggerRef.current) {
      setContentWidth(`${triggerRef.current.offsetWidth}px`)
    }
  }, [open])

  // This function handles selecting or deselecting an item
  const toggleSelection = (value) => {
    setSelectedValues((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value) // Remove if already selected
        : [...prev, value] // Add if not selected
    )
  }

  // Get the names of the selected items to display on the button
  const selectedItems = options.filter((item) => selectedValues.includes(item.value))

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between text-white", className)}
        >
          {selectedItems.length > 0
            ? selectedItems.map((item) => item.name).join(", ")
            : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="p-0"
        style={{ width: contentWidth }}
      >
        <Command>
          <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} />
          <CommandList>
            <CommandGroup>
              {options.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.value}
                  onSelect={() => toggleSelection(item.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValues.includes(item.value) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

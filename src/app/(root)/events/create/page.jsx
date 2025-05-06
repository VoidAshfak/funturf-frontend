import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Options } from "@/components/Options";
import { SearchableOptions } from "@/components/SearchableOptions";

const CreateEvent = () => {
  const sports = [
    { id: 1, name: "Football", value: "FOOTBALL", playerAmt: 12 },
    { id: 2, name: "Badminton", value: "BADMINTON", playerAmt: 4 },
  ];

  const venue = [
    { id: 1, name: "Turf-1", value: "TURF-1" },
    { id: 2, name: "Turf-2", value: "TURF-2" },
    { id: 3, name: "Turf-3", value: "TURF-3" },
  ];

  function createSlot(id, startTime, endTime, date) {
    return {
      id,
      startTime,
      endTime,
      date,
      name: `${startTime} to ${endTime}`,
      value: `${startTime} TO ${endTime}`,
    };
  }

  const slots = [
    createSlot(1, "07:00 PM", "08:30 PM", "2025-05-05T10:00:00Z"),
    createSlot(2, "09:00 PM", "10:30 PM", "2025-05-05T10:00:00Z"),
    createSlot(3, "11:00 PM", "01:00 AM", "2025-05-05T10:00:00Z"),
  ];

  const players = [
    { id: 1, name: "Rizwan", value: "RIZWAN" },
    { id: 2, name: "Asif", value: "ASIF" },
    { id: 3, name: "Bappi", value: "BAPPI" },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Fixed background image */}
      <img
        src="/assets/images/login.png"
        alt="Background"
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
      />

      {/* Scrollable content on top */}
      <div className="relative z-10 min-h-screen flex justify-center px-4 py-10">
        <div className="bg-white bg-opacity-90 p-10 rounded-2xl shadow-lg w-full max-w-4xl overflow-y-auto">
          <form className={cn("flex flex-col gap-6")}>
            {/* Heading */}
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold">Create Your Event</h1>
              <p className="text-muted-foreground text-sm text-balance">
                Enter your information below to create your event
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid gap-3 col-span-2">
                <Label htmlFor="eventTitle">Event Title *</Label>
                <Input id="eventTitle" type="text" placeholder="Event Title" required />
              </div>

              <div className="md:col-span-2 grid gap-3">
                <Label htmlFor="eventDescription">Event Details</Label>
                <Textarea id="eventDescription" rows="15" placeholder="Write the event's details here" />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="venue">Venue *</Label>
                <Options
                  label="Venue"
                  placeholder={"Select a venue for the event"}
                  className={"w-full"}
                  options={venue}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="date">Date *</Label>
                <Input id="date" type="date" required />
              </div>

              <div className="grid gap-3 col-span-2">
                <Label htmlFor="slot">Slot *</Label>
                <Options
                  label="Slot"
                  placeholder={"Select your suitable slot"}
                  className={"w-full"}
                  options={slots}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="sport">Sport *</Label>
                <Options
                  label="Sport"
                  placeholder={"Select a sport"}
                  className={"w-full"}
                  options={sports}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="playerAmount">Player Amount *</Label>
                <Input
                  id="playerAmount"
                  type="text"
                  placeholder="How many players"
                  required
                />
              </div>

              <div className="md:col-span-2 grid gap-3">
                <Label htmlFor="addPlayers">Add Players</Label>
                <SearchableOptions
                  placeholder="Select players you want to add to the event"
                  className="w-full"
                  options={players}
                />
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 text-center text-sm">
              <Button type="submit" className="w-1/3">
                Create Event
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;

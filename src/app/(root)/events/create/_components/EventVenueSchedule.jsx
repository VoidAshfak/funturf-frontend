'use client';

import InputField from "@/components/InputField";
import RequiredSign from "@/components/RequiredSign";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Controller } from "react-hook-form";

export default function EventVenueSchedule({
    register,
    control,
    errors,
    venues,
    grounds,
    setGrounds,
    sports,
    setSports,
    watchVenue,
    watchGround,
    watchDate,
    setValue,
    handleBack,
    availableSlots,
    loadingSlots,
    selectedSlot,
    handleSlotSelect
}) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Venue & Schedule</h2>

            {/* Venue & Ground */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label>Venue <RequiredSign /></Label>
                    <InputField errors={errors}>
                        <Controller
                            name="venue_id"
                            control={control}
                            rules={{ required: "Select a venue" }}
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={(value) => {
                                        field.onChange(value);
                                        const venue = venues.find(v => v.id === value);
                                        setGrounds(venue?.grounds || []);
                                        setValue("ground_id", "");
                                        setValue("sport_type", "");
                                        setSports([]);
                                    }}
                                >
                                    <SelectTrigger><SelectValue placeholder="Select Venue" /></SelectTrigger>
                                    <SelectContent>
                                        {venues.map((venue) => (
                                            <SelectItem key={venue.id} value={venue.id}>{venue.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </InputField>
                </div>

                <div className="space-y-2">
                    <Label>Ground <RequiredSign /></Label>
                    <InputField errors={errors}>
                        <Controller
                            name="ground_id"
                            control={control}
                            rules={{ required: "Select a ground" }}
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    disabled={!watchVenue}
                                    onValueChange={(value) => {
                                        field.onChange(value);
                                        const ground = grounds.find(g => g.id === value);
                                        const s = ground?.sport_type;
                                        setSports(Array.isArray(s) ? s : (s ? [s] : []));
                                        setValue("sport_type", "");
                                    }}
                                >
                                    <SelectTrigger><SelectValue placeholder="Select Ground" /></SelectTrigger>
                                    <SelectContent>
                                        {grounds.map((ground) => (
                                            <SelectItem key={ground.id} value={ground.id}>{ground.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </InputField>
                </div>
            </div>

            {/* Sport & Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label>Sport <RequiredSign /></Label>
                    <InputField errors={errors}>
                        <Controller
                            name="sport_type"
                            control={control}
                            rules={{ required: "Select a sport" }}
                            render={({ field }) => (
                                <Select value={field.value} onValueChange={field.onChange} disabled={!watchGround}>
                                    <SelectTrigger><SelectValue placeholder="Select Sport" /></SelectTrigger>
                                    <SelectContent>
                                        {sports.map((sport) => (
                                            <SelectItem key={sport} value={sport}>{sport}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </InputField>
                </div>

                <div className="space-y-2">
                    <Label>Date <RequiredSign /></Label>
                    <InputField errors={errors}>
                        <Controller
                            name="event_date"
                            control={control}
                            rules={{ required: "Pick a date" }}
                            render={({ field }) => (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"}`}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) => date < new Date().setHours(0, 0, 0, 0)}
                                        />
                                    </PopoverContent>
                                </Popover>
                            )}
                        />
                    </InputField>
                </div>
            </div>

            {/* Slots Selection */}
            <div className="space-y-4">
                <Label>Select Time Slot <RequiredSign /></Label>

                {!watchVenue || !watchGround || !watchDate ? (
                    <div className="p-8 text-center bg-gray-50 border border-dashed rounded-lg text-gray-500">
                        Select Venue, Ground, and Date to view slots.
                    </div>
                ) : loadingSlots ? (
                    <div className="p-12 flex justify-center items-center bg-gray-50 border rounded-lg">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : availableSlots.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {availableSlots.map((slot) => (
                            <div
                                key={slot.id}
                                onClick={() => handleSlotSelect(slot)}
                                className={`
                                    p-3 rounded-lg border-2 text-center cursor-pointer transition-all
                                    ${!slot.available ? 'bg-gray-100 border-gray-200 opacity-50 cursor-not-allowed' :
                                        selectedSlot?.id === slot.id ? 'bg-primary/10 border-primary ring-1 ring-primary' :
                                            'bg-white border-gray-200 hover:border-primary/50 hover:bg-gray-50'}
                                `}
                            >
                                <div className="text-sm font-semibold">{slot.start} - {slot.end}</div>
                                <div className="text-xs text-gray-500 mt-1">৳{slot.price}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-8 text-center bg-gray-50 border rounded-lg text-gray-500">
                        No slots available for this date.
                    </div>
                )}

                {/* Hidden inputs for start/end time validation mapping */}
                <input type="hidden" {...register("start_time", { required: "Select a slot" })} />
                <input type="hidden" {...register("end_time", { required: "Select a slot" })} />
                {errors.start_time && <p className="text-sm text-red-500">Please select a time slot</p>}
            </div>

            <div className="flex justify-between pt-6">
                <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                >
                    Back
                </Button>
                <Button
                    type="submit"
                    disabled={!selectedSlot} // Disable if no slot selected
                    className="min-w-[120px]"
                >
                    Create Event
                </Button>
            </div>
        </div>
    );
}

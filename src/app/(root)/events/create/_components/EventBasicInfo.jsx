'use client';

import InputField from "@/components/InputField";
import MultiSelect from "@/components/MultiSelect";
import RequiredSign from "@/components/RequiredSign";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Controller } from "react-hook-form";

const players = [
    { id: 1, label: "Rizwan", value: "RIZWAN" },
    { id: 2, label: "Asif", value: "ASIF" },
    { id: 3, label: "Bappi", value: "BAPPI" },
];

export default function EventBasicInfo({ register, control, errors, watch, handleNext }) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Details</h2>

            {/* Title */}
            <div className="space-y-2">
                <Label>Event Title <RequiredSign /></Label>
                <InputField errors={errors}>
                    <Input
                        id="title"
                        placeholder="Enter Event Title"
                        {...register("title", { required: "Event title is required" })}
                    />
                </InputField>
            </div>

            {/* Description */}
            <div className="space-y-2">
                <Label>Description</Label>
                <InputField errors={errors}>
                    <Textarea
                        placeholder="Enter Event Details Here"
                        {...register("description")}
                    />
                </InputField>
            </div>

            {/* Types & Skill */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label>Event Type <RequiredSign /></Label>
                    <InputField errors={errors}>
                        <Controller
                            name="event_type"
                            control={control}
                            rules={{ required: "Select a type" }}
                            render={({ field }) => (
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger><SelectValue placeholder="Select Event Type" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="friendly">Friendly</SelectItem>
                                        <SelectItem value="tournament">Tournament</SelectItem>
                                        <SelectItem value="practice">Practice</SelectItem>
                                        <SelectItem value="league">League</SelectItem>
                                        <SelectItem value="pickup">Pickup</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </InputField>
                </div>
                <div className="space-y-2">
                    <Label>Skill Level <RequiredSign /></Label>
                    <InputField errors={errors}>
                        <Controller
                            name="skill_level_required"
                            control={control}
                            rules={{ required: "Select a skill" }}
                            render={({ field }) => (
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger><SelectValue placeholder="Select Skill Level" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="any">Any</SelectItem>
                                        <SelectItem value="beginner">Beginner</SelectItem>
                                        <SelectItem value="intermediate">Intermediate</SelectItem>
                                        <SelectItem value="advanced">Advanced</SelectItem>
                                        <SelectItem value="professional">Professional</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </InputField>
                </div>
            </div>

            {/* Players */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label>Minimum Players <RequiredSign /></Label>
                    <InputField errors={errors}>
                        <Input
                            type="number"
                            {...register('min_Players', {
                                required: "Required",
                                min: { value: 1, message: "At least 1" }
                            })}
                        />
                    </InputField>
                </div>
                <div className="space-y-2">
                    <Label>Maximum Players <RequiredSign /></Label>
                    <InputField errors={errors}>
                        <Input
                            type="number"
                            {...register('max_players', {
                                required: "Required",
                                min: { value: 1, message: "At least 1" },
                                validate: (value) => Number(value) >= Number(watch("min_Players")) || "Must be >= Min Players"
                            })}
                        />
                    </InputField>
                </div>
            </div>

            {/* Costs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label>Total Cost (BDT) <RequiredSign /></Label>
                    <InputField errors={errors}>
                        <Input
                            type="number"
                            {...register('total_cost', {
                                required: "Enter cost",
                                min: { value: 1, message: "Must be > 0" }
                            })}
                        />
                    </InputField>
                </div>
                <div className="space-y-2">
                    <Label>Cost Split <RequiredSign /></Label>
                    <InputField errors={errors}>
                        <Controller
                            name="cost_split_type"
                            control={control}
                            rules={{ required: "Select split type" }}
                            render={({ field }) => (
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="equal">Equal</SelectItem>
                                        <SelectItem value="organizer_pays">Organizer Pays</SelectItem>
                                        <SelectItem value="custom">Custom</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </InputField>
                </div>
            </div>

            {/* Invite Players */}
            <div className="space-y-2">
                <Label>Invite Players</Label>
                <Controller
                    name="current_players"
                    control={control}
                    render={({ field }) => (
                        <MultiSelect
                            options={players}
                            values={field.value}
                            onChange={field.onChange}
                            placeholder="Search and select names..."
                        />
                    )}
                />
            </div>

            <div className="flex justify-end pt-4">
                <Button type="button" onClick={handleNext} className="w-full md:w-auto">
                    Next Step
                </Button>
            </div>
        </div>
    );
}

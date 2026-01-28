'use client';

import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon, MapPin, Trophy, Users, Banknote, ClipboardCheck } from "lucide-react";

export default function EventSummary({ formData, venues, grounds, handleBack }) {
    // Helper to find label by value
    const getVenueName = (id) => venues.find(v => v.id === id)?.name || "Unknown Venue";
    const getGroundName = (id) => {
        // We might need to search across all venues or pass the specific grounds array
        // Assuming 'grounds' prop contains the grounds for the selected venue
        return grounds.find(g => g.id === id)?.name || "Unknown Ground";
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center space-x-2 text-2xl font-bold text-gray-900 mb-6">
                <ClipboardCheck className="h-8 w-8 text-primary" />
                <h2>Review Event Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Details Card */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 space-y-4">
                    <h3 className="font-semibold text-gray-700 border-b pb-2">Event Information</h3>

                    <div className="space-y-3">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Title</p>
                            <p className="font-medium text-lg">{formData.title}</p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Description</p>
                            <p className="text-sm text-gray-600 line-clamp-3">
                                {formData.description || "No description provided."}
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Type</p>
                                <div className="flex items-center mt-1">
                                    <Trophy className="h-4 w-4 mr-1 text-primary" />
                                    <span className="capitalize">{formData.event_type}</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Skill</p>
                                <span className="capitalize inline-block mt-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-semibold">
                                    {formData.skill_level_required}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Logistics Card */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 space-y-4">
                    <h3 className="font-semibold text-gray-700 border-b pb-2">Logistics & Schedule</h3>

                    <div className="space-y-3">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Location</p>
                            <div className="flex items-start mt-1">
                                <MapPin className="h-4 w-4 mr-1 text-primary mt-0.5" />
                                <div>
                                    <p className="font-medium">{getVenueName(formData.venue_id)}</p>
                                    <p className="text-sm text-gray-500">{getGroundName(formData.ground_id)}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Date & Time</p>
                            <div className="flex items-center mt-1">
                                <CalendarIcon className="h-4 w-4 mr-1 text-primary" />
                                <span>{formData.event_date ? format(formData.event_date, "PPP") : "N/A"}</span>
                            </div>
                            <div className="ml-5 text-sm font-medium text-gray-700">
                                {formData.start_time} - {formData.end_time}
                            </div>
                        </div>

                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Sport</p>
                            <p className="capitalize">{formData.sport_type}</p>
                        </div>
                    </div>
                </div>

                {/* Costs & Players Card */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 space-y-4 md:col-span-2">
                    <h3 className="font-semibold text-gray-700 border-b pb-2">Players & Costs</h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Total Cost</p>
                            <div className="flex items-center mt-1 font-semibold text-green-700">
                                <Banknote className="h-4 w-4 mr-1" />
                                ৳{formData.total_cost}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Split Type</p>
                            <p className="capitalize mt-1">{formData.cost_split_type?.replace('_', ' ')}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Players</p>
                            <div className="flex items-center mt-1">
                                <Users className="h-4 w-4 mr-1 text-gray-400" />
                                {formData.min_Players} - {formData.max_players}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Invited</p>
                            <p className="mt-1">{formData.current_players?.length || 0} players</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between pt-6">
                <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                >
                    Back to Edit
                </Button>
                <Button
                    type="submit"
                    className="min-w-[140px]"
                >
                    Confirm & Create
                </Button>
            </div>
        </div>
    );
}

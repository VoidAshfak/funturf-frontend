import React from 'react';
import { MapPin } from "lucide-react"


const HeaderText = ({ title, subtitle, className, center = false, mapIcon = false }) => {
    return (
        <div className={`pb-10 ${center ? 'text-center' : 'text-left'} ${className}`}>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-700 tracking-widest">
                {title}
            </h2>
            {subtitle && (
                <div className={`flex items-center pt-4 ${mapIcon ? "" : "justify-center"}`}>
                    {mapIcon && <MapPin className="w-5 h-5 mr-2" />}
                    <p className={`text-lg text-gray-600 ${mapIcon ? "" : "mt-2"}`}>
                        {subtitle}
                    </p>
                </div>
            )}
        </div>
    );
};

export default HeaderText;

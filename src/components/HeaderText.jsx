import React from 'react';

const HeaderText = ({ title, subtitle, className, center = false }) => {
    return (
        <div className={`pb-10 ${center ? 'text-center' : 'text-left'} ${className}`}>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-700 tracking-widest">
                {title}
            </h2>
            {subtitle && (
                <p className="mt-2 text-lg text-gray-600">
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default HeaderText;

import React from 'react';

const Loader = () => {
    return (
        <div className="flex-col gap-4 w-full flex items-center justify-center h-screen">
            <div className="w-20 h-20 border-4 border-transparent text-green-300 text-4xl animate-spin flex items-center justify-center border-t-green-200 rounded-full">
                <div className="w-16 h-16 border-4 border-transparent text-black text-2xl animate-spin flex items-center justify-center border-t-black rounded-full" />
            </div>
        </div>
    );
}

export default Loader;

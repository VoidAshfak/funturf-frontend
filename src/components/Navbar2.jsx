import React from 'react'

const Navbar2 = () => {
    return (
        <header className="py-4 bg-white sm:py-5" x-data="{expanded: false}">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <nav className="flex items-center justify-between">
                    <div className="flex shrink-0">
                        <a href="#" title="" className="flex"><img className="w-auto h-8" src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/logo.svg" alt="logo" /></a>
                    </div>
                    <div className="flex md:hidden">
                        <button type="button" className="text-gray-900">
                            <span x-show="!expanded" aria-hidden="true"
                            ><svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path></svg
                                ></span>
                            <span x-show="expanded" aria-hidden="true"
                            ><svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg
                                ></span>
                        </button>
                    </div>
                    <div className="hidden md:items-center md:justify-start md:ml-16 md:mr-auto md:space-x-10 md:flex">
                        <a href="#" title="" className="text-base font-medium text-gray-900 transition-all duration-200 hover:text-indigo-600">Features</a> <a href="#" title="" className="text-base font-medium text-gray-900 transition-all duration-200 hover:text-indigo-600">Pricing</a>
                        <a href="#" title="" className="text-base font-medium text-gray-900 transition-all duration-200 hover:text-indigo-600">Support</a>
                    </div>
                    <div className="hidden md:block">
                        <a
                            href="#"
                            title=""
                            className="inline-flex items-center justify-center px-6 py-2 sm:py-2.5 text-base font-semibold text-white transition-all duration-200 bg-gray-900 rounded-lg sm:text-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                            role="button"
                        >Join Email List</a
                        >
                    </div>
                </nav>
                <nav x-show="expanded" x-collapse="">
                    <div className="px-1 pt-8 pb-4">
                        <div className="grid gap-y-6">
                            <a href="#" title="" className="flex items-center text-base font-medium text-gray-900 transition-all duration-200 focus:outline-none focus:ring-0">Features</a>
                            <a href="#" title="" className="flex items-center text-base font-medium text-gray-900 transition-all duration-200 focus:outline-none focus:ring-0">Pricing</a>
                            <a href="#" title="" className="flex items-center text-base font-medium text-gray-900 transition-all duration-200 focus:outline-none focus:ring-0">Support</a>
                            <a
                                href="#"
                                title=""
                                className="inline-flex items-center justify-center px-6 py-2 text-base font-semibold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-lg hover:bg-gray-600 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                role="button"
                            >Join Email List</a
                            >
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Navbar2
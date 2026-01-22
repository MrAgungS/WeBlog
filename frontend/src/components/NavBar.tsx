import Link from "next/link";

export default function NavBar() {
  return (
    <div>
        <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <nav className="flex h-16 items-center justify-between lg:h-20">
                    <div className="flex items-center gap-10">
                        <div className="shrink-0">
                            <Link href="#" title="" className="flex items-center text-xl">
                                <span className="font-bold dark:text-white">We</span>
                                <span className="font-bold text-lime-600 dark:text-lime-500">Blog</span>
                                {/* <span className="ml-1 rounded-lg border-2 border-lime-600 px-1 text-base font-medium text-lime-600 dark:border-lime-500 dark:text-lime-500">2.0</span> */}
                            </Link>
                            
                        </div>

                        <div className="mx-auto hidden lg:flex lg:items-center lg:space-x-10">
                            <Link href="#" title="" className="text-base font-medium text-black transition-all duration-200 hover:text-lime-600 focus:text-lime-600 dark:text-white dark:hover:text-lime-500 dark:focus:text-lime-500"> Features </Link>
                            <Link href="#" title="" className="text-base font-medium text-black transition-all duration-200 hover:text-lime-600 focus:text-lime-600 dark:text-white dark:hover:text-lime-500 dark:focus:text-lime-500"> Solutions </Link>
                            <Link href="#" title="" className="text-base font-medium text-black transition-all duration-200 hover:text-lime-600 focus:text-lime-600 dark:text-white dark:hover:text-lime-500 dark:focus:text-lime-500"> Resources </Link>
                            <Link href="#" title="" className="text-base font-medium text-black transition-all duration-200 hover:text-lime-600 focus:text-lime-600 dark:text-white dark:hover:text-lime-500 dark:focus:text-lime-500"> Pricing  </Link>
                        </div>
                    </div>

                    <div className="hidden lg:flex lg:items-center lg:space-x-4">
                        <Link href="#" className="relative text-base font-semibold text-lime-600 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-lime-600 after:transition-all after:duration-300 hover:after:w-full dark:text-lime-400 dark:after:bg-lime-400">Login</Link>
                        <Link href="#" className="relative text-base font-bold text-lime-700 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-lime-700 after:transition-all after:duration-300 hover:after:w-full hover:text-lime-800dark:text-lime-500 dark:after:bg-lime-500">Sign Up</Link>
                    </div>
                </nav>
            </div>
        </header>
    </div>
  );
}

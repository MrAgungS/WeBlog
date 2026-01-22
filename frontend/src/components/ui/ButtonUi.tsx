import React from "react"

type ButtonUiProps ={
    children? : React.ReactNode
}
export function ButtonUi({children}: ButtonUiProps) {
    return (
        <div>
            <button className="px-6 py-3 border-2 border-lime-600 text-lime-600 font-semibold rounded-lg hover:bg-lime-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 transition-all duration-200 dark:border-lime-400 dark:text-lime-400 dark:hover:bg-lime-500 dark:hover:text-white">
                {children}
            </button>
        </div>
    );
};
export function ButtonUiDelete({ children }: ButtonUiProps) {
  return (
    <div>
        <button className="px-6 py-3 rounded-lg border-2 border-red-600 text-red-600 font-semibold transition-all duration-200 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-white">
            {children}
        </button>
    </div>
  );
};

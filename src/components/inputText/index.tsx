import React, { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLElement> {
  label: string;
}

export const InputText = ({ label, ...props }: Props) => {
  return (
    <label>
      <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        {label}
      </span>
      <input
        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="text"
        {...props}
      />
    </label>
  );
};

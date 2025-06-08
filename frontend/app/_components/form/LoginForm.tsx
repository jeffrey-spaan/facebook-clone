'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fields = [
    {
      id: "emailOrUsername",
      name: "emailOrUsername",
      placeholder: "Email or username",
      type: "text",
      autoComplete: "emailOrUsername",
      required: true,
    },
    {
      id: "password",
      name: "password",
      placeholder: "Password",
      type: "password",
      autoComplete: "current-password",
      required: true,
    },
  ];

  return (
    <>
      <form className="space-y-4 w-full">
        <div>
          {fields.map((field) => (
            <div key={field.id} className="mt-4">
                <input
                  id={field.id}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                  autoComplete={field.autoComplete}
                  className="block w-full rounded-md bg-white/80 dark:bg-black/20 px-3 py-3 outline-1 -outline-offset-1 outline-black/20 placeholder:text-gray-400 hover:outline-blue-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6 focus:bg-black/5 dark:focus:bg-black/40"
                />
              </div>
          ))}
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-3 text-neutral-100 text-xl font-semibold shadow-xs hover:bg-blue-600/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 active:shadow-black/50 active:shadow-inner cursor-pointer"
          >
            {isLoading ? 'Loading...' : 'Log In'}
          </button>
        </div>
      </form>
    </>
  )
}

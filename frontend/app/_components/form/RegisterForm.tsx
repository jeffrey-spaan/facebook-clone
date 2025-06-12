'use client'

import { FormEvent, useState } from 'react'
import { constants } from '@/app/_lib/constants'
import { useAuth } from '@/app/_context/AuthContext'
import { useRouter } from 'next/navigation'
import type { AuthRegisterDto } from '@/app/_lib/types';
import { register } from '@/app/_lib/api/auth'
import Snackbar from '@/app/_components/snackbar/Snackbar'

export default function RegisterForm() {
  const { useAuthLogin } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [status, setStatus] = useState<number | null>(null)
  const [detail, setDetail] = useState<string | null>(null)

async function onSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setIsLoading(true);

  try {
    const formData = new FormData(e.currentTarget);

    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const year = formData.get('year') as string;
    const month = formData.get('month') as string;
    const day = formData.get('day') as string;
    const gender = formData.get('gender') as 'M' | 'F' | 'O';

    const dateOfBirth = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const payload: AuthRegisterDto = {
      person: {
        firstName,
        lastName,
        dateOfBirth,
        gender,
      },
      username,
      email,
      password,
    };

    const { accessToken, data } = await register(payload);

      setStatus(data.status);
      setDetail(data.detail);
      if (accessToken && data.status === 200) {
        useAuthLogin(accessToken);
        setTimeout(() => {
          router.push(constants.ROUTER_PATH.APP);  // Redirect after the delay
        }, 2000);
      }
    } finally {
      setIsLoading(false);
    }
  }

  // DOB dropdown state
  const [selectedMonth, setSelectedMonth] = useState<number>(1)
  const [selectedYear, setSelectedYear] = useState<number>(2025)
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const years = Array.from({ length: 2025 - 1920 + 1 }, (_, i) => 1920 + i);

  // Get days in month
  function getDaysInMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate();
  }
  const days = Array.from({ length: getDaysInMonth(selectedMonth, selectedYear) }, (_, i) => i + 1);

  const nameFields = [
    {
      id: "firstName",
      name: "firstName",
      placeholder: "First name",
      type: "text",
      autoComplete: "firstName",
      required: true,
    },
    {
      id: "lastName",
      name: "lastName",
      placeholder: "Last name",
      type: "text",
      autoComplete: "lastName",
      required: true,
    },
  ];

  const userFields = [
    {
      id: "username",
      name: "username",
      placeholder: "Username",
      type: "text",
      autoComplete: "username",
      required: true,
    },
    {
      id: "email",
      name: "email",
      placeholder: "Email",
      type: "text",
      autoComplete: "email",
      required: true,
    },
    {
      id: "password",
      name: "password",
      placeholder: "Password",
      type: "password",
      autoComplete: "password",
      required: true,
    },
  ];

  const genderOptions = [
    {
      id: "male",
      name: "M",
      placeholder: "Male",
      type: "text",
      autoComplete: "male",
      required: true,
    },
    {
      id: "female",
      name: "F",
      placeholder: "Female",
      type: "text",
      autoComplete: "female",
      required: false,
    },
    {
      id: "other",
      name: "O",
      placeholder: "Other",
      type: "text",
      autoComplete: "other",
      required: false,
    },
  ];

  return (
    <>
      <Snackbar status={status} detail={detail} />
      <form onSubmit={onSubmit} className="space-y-4 w-full">
        <div className='flex flex-col sm:flex-row gap-x-4'>
          {nameFields.map((nameField) => (
            <div key={nameField.id} className="mt-4">
                <input
                  id={nameField.id}
                  name={nameField.name}
                  type={nameField.type}
                  placeholder={nameField.placeholder}
                  required={nameField.required}
                  autoComplete={nameField.autoComplete}
                  className="block w-full rounded-md bg-white/80 dark:bg-black/20 px-3 py-3 outline-1 -outline-offset-1 outline-black/20 placeholder:text-gray-400 hover:outline-blue-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6 focus:bg-black/5 dark:focus:bg-black/40"
                />
              </div>
          ))}
        </div>

        <label htmlFor="dateOfBirth" className="block text-xs ml-1 -mb-2 font-medium text-gray-700 dark:text-gray-400">
          Birthday
        </label>
        <div className="flex gap-2 mt-4">
          {/* Month dropdown */}
          <div className="flex-1">
            <select
              id="month"
              name="month"
              value={selectedMonth}
              onChange={e => setSelectedMonth(Number(e.target.value))}
              required
              className="rounded-md bg-white/80 dark:bg-black/20 px-2 py-3 border border-black/20 hover:outline-blue-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6 focus:bg-black/5 dark:focus:bg-gray-800 w-full cursor-pointer"
            >
              <option value="" disabled>Month</option>
              {months.map((month, idx) => (
                <option key={month} value={idx + 1}>{month}</option>
              ))}
            </select>
          </div>
          {/* Day dropdown */}
          <div className="flex-1">
            <select
              id="day"
              name="day"
              required
              className="rounded-md bg-white/80 dark:bg-black/20 px-2 py-3 border border-black/20 hover:outline-blue-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6 focus:bg-black/5 dark:focus:bg-gray-800 w-full cursor-pointer"
            >
              <option value="" disabled>Day</option>
              {days.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>
          {/* Year dropdown */}
          <div className="flex-1">
            <select
              id="year"
              name="year"
              value={selectedYear}
              onChange={e => setSelectedYear(Number(e.target.value))}
              required
              className="rounded-md bg-white/80 dark:bg-black/20 px-2 py-3 border border-black/20 hover:outline-blue-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6 focus:bg-black/5 dark:focus:bg-gray-800 w-full cursor-pointer"
            >
              <option value="" disabled>Year</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        <label htmlFor="gender" className="block text-xs ml-1 -mb-1 font-medium text-gray-700 dark:text-gray-400">
          Gender
        </label>
        <div className="flex gap-4 mt-2">
          {genderOptions.map((option) => (
            <label key={option.id} className="flex flex-1 items-center justify-between cursor-pointer border border-black/20 dark:border-gray-900 rounded-md p-3 hover:bg-black/5 hover:border-blue-500">
              <span className="text-sm text-gray-700 dark:text-gray-300">{option.placeholder}</span>
              <input
                type="radio"
                id={option.id}
                name="gender"
                value={option.name}
                required={option.required}
                className="accent-blue-500 ml-2"
              />
            </label>
          ))}
        </div>
              
        <div>
          {userFields.map((userField) => (
            <div key={userField.id} className="mt-4">
                <input
                  id={userField.id}
                  name={userField.name}
                  type={userField.type}
                  placeholder={userField.placeholder}
                  required={userField.required}
                  autoComplete={userField.autoComplete}
                  className="block w-full rounded-md bg-white/80 dark:bg-black/20 px-3 py-3 outline-1 -outline-offset-1 outline-black/20 placeholder:text-gray-400 hover:outline-blue-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6 focus:bg-black/5 dark:focus:bg-black/40"
                />
              </div>
          ))}
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-green-600 px-3 py-3 text-neutral-100 text-xl font-semibold shadow-xs hover:bg-green-700/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 active:bg-green-700 active:shadow-black/50 active:shadow-inner cursor-pointer"
          >
            {isLoading ? 'Loading...' : 'Sign Up'}
          </button>
        </div>
      </form>
    </>
  )
}

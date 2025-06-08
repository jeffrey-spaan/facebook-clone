import Link from "next/link";
import { constants } from "@/app/_lib/constants";
import Card from "@/app/_components/card/Card";
import LoginForm from "@/app/_components/form/LoginForm";
import Logo from "@/app/_components/logo/Logo";

export default function LoginPage() {
  return (
    <>
      <div className="h-screen flex flex-col sm:justify-center items-center bg-gray-100 dark:bg-gray-900">
        <div className="w-full sm:max-w-md">
          <div className="flex justify-center my-6">
          <Logo width={200}/>
        </div>
        <Card>
          <div className="flex flex-col items-center mb-4">
            <p className="text-xl font-semibold pt-2">Log Into Facebook</p>
            <LoginForm />
            <div className="flex flex-row items-center pt-4">
              
              <p className="text-sm text-blue-500 hover:underline cursor-pointer mr-2">Forgot account?</p>
              <Link href={constants.ROUTER_PATH.REGISTER}>
                <p className="text-sm text-blue-500 hover:underline cursor-pointer">Sign up for Facebook</p>
              </Link>
            </div>
          </div>
        </Card>
        </div>
      </div>
    </>
  )
}
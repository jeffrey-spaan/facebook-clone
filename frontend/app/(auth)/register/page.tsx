import Link from "next/link";
import { constants } from "@/app/_lib/constants";
import Card from "@/app/_components/card/Card";
import Logo from "@/app/_components/logo/Logo";
import RegisterForm from "@/app/_components/form/RegisterForm";

export default function RegisterPage() {
  return (
    <>
      <div className="h-screen flex flex-col sm:justify-center items-center bg-gray-100 dark:bg-gray-900">
        <div className="w-full sm:max-w-md">
          <div className="flex justify-center my-6">
            <Logo width={200}/>
          </div>
          <Card>
            <div className="flex flex-col items-center mb-4">
              <p className="text-xl font-semibold pt-2">Create a new account</p>
              <p className="text-md text-neutral-500 dark:text-neutral-400">It's quick and easy</p>
              <RegisterForm />
              <div className="flex flex-row items-center pt-4">
                <Link href={constants.ROUTER_PATH.LOGIN}>
                  <p className="text-sm text-blue-500 hover:underline cursor-pointer">Already have an account?</p>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
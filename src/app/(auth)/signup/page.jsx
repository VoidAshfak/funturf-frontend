import { SignupForm } from "@/components/signup-form"


const SignupPage = () => {
    return (
        <div className="grid min-h-svh lg:grid-cols-5 backdrop-blur-sm">
            <div className="col-span-3 flex flex-col gap-4 p-6 md:p-10">
                <div className="flex flex-1 justify-center">
                    <div className="w-full gap-4">
                        <SignupForm />
                    </div>
                </div>
            </div>
            <div className="col-span-2 bg-muted relative hidden lg:block">
                <img
                    src="/assets/images/login.png"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
            </div>
        </div>
    )
}

export default SignupPage
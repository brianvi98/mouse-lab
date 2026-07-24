import { SignIn } from "@clerk/react";

function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn />
    </div>
  );
}

export default SignInPage;

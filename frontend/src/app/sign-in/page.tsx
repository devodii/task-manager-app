import { signIn } from "@/actions/user";
import { AuthForm } from "@/components/auth-form";

export default async function SignInPage() {
  return <AuthForm variant="sign-in" action={signIn} />;
}

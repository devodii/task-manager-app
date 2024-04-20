import { signUp } from "@/actions/user";
import { AuthForm } from "@/components/auth-form";

export default async function SignUpPage() {
  return <AuthForm variant="sign-up" action={signUp} />;
}

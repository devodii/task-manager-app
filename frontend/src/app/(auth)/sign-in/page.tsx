import { signIn } from "@/actions/user";
import { AuthForm } from "@/components/auth-form";

interface Props {
  searchParams?: {
    next: string;
  };
}

export default async function SignInPage({ searchParams }: Props) {
  return (
    <AuthForm variant="sign-in" action={signIn} next={searchParams?.next} />
  );
}

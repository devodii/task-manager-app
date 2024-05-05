import { signUp } from "@/actions/user";
import { AuthForm } from "@/components/auth-form";

interface Props {
  searchParams?: {
    next: string;
  };
}

export default async function SignUpPage({ searchParams }: Props) {
  return (
    <AuthForm variant="sign-up" action={signUp} next={searchParams?.next} />
  );
}

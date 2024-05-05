import { Button } from "@/components/ui/button";
import { Wrapper } from "@/components/wrapper";
import { CreateProfile } from "@profile/create-profile";

export default function OnboardingPage() {
  return (
    <Wrapper className="flex-col gap-4">
      <div>Youre almost set</div>

      <CreateProfile>
        <Button>create profile</Button>
      </CreateProfile>
    </Wrapper>
  );
}

import { createProfile } from "@/actions/profile";
import { SubmitButton } from "@/components/submit-button";
import { Wrapper } from "@/components/wrapper";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { ImageUploader } from "./image-uploader";

export const CreateProfile = () => {
  return (
    <Wrapper
      className="justify-start my-12 md:my-16 lg:my-20 flex-col gap-12"
      as="section"
    >
      <h2 className="text-2xl md:text-3xl font-semibold text-center">
        Create your profile
      </h2>

      <form
        action={createProfile}
        className="w-full max-w-2xl mx-auto space-y-6"
      >
        <ImageUploader />

        <div className="space-y-1">
          <Label htmlFor="username">Your username</Label>
          <Input required name="username" id="username" />
        </div>

        <SubmitButton>Submit</SubmitButton>
      </form>
    </Wrapper>
  );
};

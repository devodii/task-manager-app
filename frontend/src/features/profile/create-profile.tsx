import { createProfile } from "@/actions/profile";
import { Wrapper } from "@/components/wrapper";
import { Button } from "@ui/button";

export const CreateProfile = () => {
  return (
    <Wrapper>
      <form action={createProfile}>
        <input type="file" name="image" placeholder="Upload an image" />
        <Button type="submit">Submit</Button>
      </form>
    </Wrapper>
  );
};

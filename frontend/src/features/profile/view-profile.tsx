import { BlurImage } from "@/components/blur-image";
import { Profile } from "@/types";

interface Props {
  data: Profile;
}

export const ViewProfile = ({ data: profile }: Props) => {
  return (
    <section className="w-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <figure className="flex items-center justify-center flex-col gap-2">
          <figcaption>Photo</figcaption>
          <BlurImage
            src={profile?.imageUrl!}
            alt={`${profile?.username} on task manager app`}
            width={150}
            height={150}
            quality={80}
            className="rounded-full size-[150px] object-cover text-[50px]"
            fallbackText={profile.username[0]}
          />
        </figure>

        <div className="flex gap-2 items-center">
          <span>Name:</span>
          <span>{profile?.username}</span>
        </div>
      </div>
    </section>
  );
};

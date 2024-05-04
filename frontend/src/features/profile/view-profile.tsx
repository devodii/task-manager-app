import { BlurImage } from "@/components/blur-image";
import { Profile } from "@/types";

interface Props {
  data: Profile;
}

export const ViewProfile = ({ data }: Props) => {
  return (
    <section className="min-h-full justify-start my-12 md:my-16 lg:my-20 flex-col gap-12">
      <h2 className="text-2xl md:text-3xl font-semibold text-center">
        Your Profile
      </h2>

      <div className="flex flex-col items-center justify-center gap-4">
        <figure className="flex items-center justify-center flex-col gap-2">
          <figcaption>Photo</figcaption>
          <BlurImage
            src={data.imageUrl!}
            alt="user on task manager app"
            width={150}
            height={150}
            quality={80}
            className="rounded-full size-[150px] object-cover"
          />
        </figure>

        <div className="flex gap-2 items-center">
          <span>Name:</span>
          <span>{data.username}</span>
        </div>
      </div>
    </section>
  );
};

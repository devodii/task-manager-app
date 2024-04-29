import { Wrapper } from "@/components/wrapper";

export default function NotFoundPage() {
  return (
    <Wrapper>
      <section className="flex flex-col gap-4">
        <div className="text-2xl md:text-3xl text-center">
          404: Page Not Found
        </div>
        <span className="text-xl text-gray-800 text-center">
          Sorry, the page you are looking for could not be found.
        </span>
      </section>
    </Wrapper>
  );
}

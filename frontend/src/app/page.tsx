import { Button } from "@ui/button";
import { Input } from "@ui/input";

export default function Index() {
  return (
    <div className="min-h-screen container flex flex-col items-center justify-center gap-4">
      <h2 className="text-4xl md:text-5xl font-semibold">
        Better productivity ahead
      </h2>
      <p className="text-xl">You set your task and achieve it.</p>

      <form className="flex items-center flex-wrap gap-4 w-full max-w-4xl ">
        <Input
          className="w-4/5 placeholder:text-md text-md"
          name="task"
          placeholder="Add authentication..."
        />
        <Button className="flex-1 py-5">Set task</Button>
      </form>
    </div>
  );
}

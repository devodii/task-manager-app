import { HomeLayout } from "@/components/home-layout";
import logs from "./changelog";

export default function ChangeLogPage() {
  return (
    <HomeLayout>
      <h2 className="text-3xl md:text-4xl font-semibold mt-24 text-start w-full">
        Changelog
      </h2>

      <p className="text-gray-600 text-[17px] border-b w-full pb-3">
        All the latest updates, improvements, and fixes to the Task Manager App
      </p>

      <ul className="divide-y grid grid-cols-1 gap-2 w-full">
        {logs.map((log, i) => (
          <div key={i}>
            <p className="text-[16px] text-gray-600 mt-8">{log.date}</p>
            <h4 className="text-xl font-medium text-center mt-4">
              {log.title}
            </h4>
            <p className="text-[16px] text-center text-gray-700 mb-4">
              {log.description}
            </p>
          </div>
        ))}
      </ul>
    </HomeLayout>
  );
}

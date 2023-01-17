import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction, LoaderArgs } from "@remix-run/node";
import { useState, useEffect } from "react";
import { paramsToZoneArray, getLocalTime } from "~/utils";
import Link from "~/components/Link";
import ZoneTable from "~/components/ZoneTable";
import type { ZoneRow } from "~/types";

function useTime() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

interface LoaderData {
  zones: ZoneRow[];
  paramString: string;
}

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const params = new URL(request.url).searchParams;
  const zones: ZoneRow[] = paramsToZoneArray(params).map((z) => ({
    id: z.id,
    tz: z.tz,
    days: [
      z.d0 === "on",
      z.d1 === "on",
      z.d2 === "on",
      z.d3 === "on",
      z.d4 === "on",
      z.d5 === "on",
      z.d6 === "on",
    ],
    times: [
      getLocalTime(z.h0, z.tz, localTz),
      getLocalTime(z.h1, z.tz, localTz),
      getLocalTime(z.h2, z.tz, localTz),
      getLocalTime(z.h3, z.tz, localTz),
    ],
  }));

  return json({
    zones,
    paramString: params.toString(),
  });
};

export default function Zones() {
  const { zones, paramString }: LoaderData = useLoaderData();
  const time = useTime();

  return (
    <div className="sm:px-8 px-2">
      <div className="fixed top-0 left-0 right-0 bg-gray-900 z-20">
        <nav className="w-full text-xs px-2 sm:px-8 text-gray-400">
          <div className="py-3 border-b border-gray-700 flex justify-between items-center">
            <p>
              <Link href={`/editor?${paramString}`}>← Edit zone</Link>
            </p>
            <p>
              <Link href="#" external>
                <span className="flex gap-1 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1"
                    stroke="currentColor"
                    className="w-3 h-3"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
                    />
                  </svg>
                  Share jamzone
                </span>
              </Link>
            </p>
          </div>
        </nav>
      </div>
      <div className="py-16">
        <ZoneTable zones={zones} time={time} />
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900">
        <div className="px-2 sm:px-8">
          <nav className="w-full text-xs py-3 text-gray-400 flex justify-between items-center border-t border-gray-700">
            <p>
              Made by{" "}
              <Link href="https://alexpage.dev" external>
                Alex Page
              </Link>
            </p>
            <p>
              ★ Star on{" "}
              <Link href="https://github.com/alex-page/jamzone.today" external>
                GitHub
              </Link>
            </p>
          </nav>
        </div>
      </div>
    </div>
  );
}

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction, LoaderArgs } from "@remix-run/node";
import { paramsToZoneArray } from "~/utils/index.server";
import { localizeZones } from "~/utils";
import Link from "~/components/Link";
import ZoneTable from "~/components/ZoneTable";
import type { Zone, ZoneRow } from "~/types";
import { useCopyToClipboard } from "~/hooks";

interface LoaderData {
  zones: Zone[];
  paramString: string;
}

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const params = new URL(request.url).searchParams;
  const zones = paramsToZoneArray(params);

  return json({
    zones,
    paramString: params.toString(),
  });
};

export default function Zones() {
  const { zones: unlocalisedZones, paramString }: LoaderData = useLoaderData();
  const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const zones: ZoneRow[] = localizeZones(unlocalisedZones, localTz);

  const url = typeof window === "undefined" ? "" : window.location.href;
  const [copy, status] = useCopyToClipboard(url, 2500);

  return (
    <div className="px-8 pt-4 pb-16">
      <ZoneTable zones={zones} />
      <div className="fixed z-20 bottom-0 left-0 right-0 bg-gray-900">
        <div className="px-8">
          <nav className="w-full text-xs py-3 text-gray-400 flex justify-between items-center border-t border-gray-700">
            <p className="flex gap-2">
              <Link href={`/editor?${paramString}`}>← Edit zone</Link>
              <button
                className="font-medium rounded text-gray-100 focus:outline-offset-2 focus:outline-2 focus:outline-blue-500"
                onClick={copy}
              >
                <span className="flex gap-1 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1"
                    stroke="currentColor"
                    className="w-3 h-3"
                  >
                    {status === "resolved" ? (
                      <path
                        fill-rule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clip-rule="evenodd"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
                      />
                    )}
                  </svg>
                  {status === "resolved" ? "Copied!" : "Share jamzone"}
                </span>
              </button>
            </p>
            <p className="flex gap-2">
              <span>
                Made by{" "}
                <Link href="https://alexpage.dev" external>
                  Alex Page
                </Link>
              </span>
              <span>
                ★ Star on{" "}
                <Link
                  href="https://github.com/alex-page/jamzone.today"
                  external
                >
                  GitHub
                </Link>
              </span>
            </p>
          </nav>
        </div>
      </div>
    </div>
  );
}

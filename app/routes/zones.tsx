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
    <div className="p-8">
      <ZoneTable zones={zones} />
      <div className="fixed z-20 bottom-0 left-0 right-0 bg-gray-900">
        <div className="px-8">
          <nav className="w-full text-xs py-5 text-gray-400 flex justify-between items-center border-t border-gray-700">
            <p className="flex gap-3">
              <Link href={`/editor?${paramString}`}>
                <span className="flex gap-1 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-3 h-3"
                  >
                    <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                    <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                  </svg>
                  <span>Edit zone</span>
                </span>
              </Link>
              <button
                className="font-medium rounded text-gray-100 focus:outline-offset-2 focus:outline-2 focus:outline-blue-500"
                onClick={copy}
              >
                <span className="flex gap-1 items-center">
                  {status === "resolved" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      strokeWidth="1"
                      stroke="currentColor"
                      className="w-3 h-3"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-3 h-3"
                    >
                      <path d="M13 4.5a2.5 2.5 0 11.702 1.737L6.97 9.604a2.518 2.518 0 010 .792l6.733 3.367a2.5 2.5 0 11-.671 1.341l-6.733-3.367a2.5 2.5 0 110-3.475l6.733-3.366A2.52 2.52 0 0113 4.5z" />
                    </svg>
                  )}
                  {status === "resolved" ? "Copied!" : "Share jamzone"}
                </span>
              </button>
            </p>
            <p className="flex gap-3">
              <span>
                Made by{" "}
                <Link href="https://twitter.com/alexpage_" external>
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

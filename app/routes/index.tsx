import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link as RLink, useLoaderData } from "@remix-run/react";

import Header from "~/components/Header";
import PageLayout from "~/components/PageLayout";
import ZoneTable from "~/components/ZoneTable";
import type { Zone, ZoneRow } from "~/types";
import { localizeZones } from "~/utils";
import { mockParams, paramsToZoneArray } from "~/utils/index.server";

export const loader: LoaderFunction = async () => {
  const zones = paramsToZoneArray(mockParams);
  return json({ zones });
};

interface LoaderData {
  zones: Zone[];
}

export default function Index() {
  const { zones: unlocalisedZones }: LoaderData = useLoaderData();
  const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const zones: ZoneRow[] = localizeZones(unlocalisedZones, localTz);

  return (
    <>
      <PageLayout>
        <Header />
        <div className="text-center pt-32">
          {/* <h1 className="inline-grid relative">
            <div className="absolute -top-2 -right-2 text-rose-500 flex">
              <span className="text-xs font-semibold py-1 px-2">🍓 Alpha</span>
            </div>
            <span className="text-6xl font-bold">jamzone.today</span>
          </h1> */}
          {/* <p className="mt-4 text-xl text-gray-400">
            Worldwide collaboration made easy.
          </p> */}

          <h1 className="text-6xl font-bold max-w-2xl m-auto relative">
            Jam with your homies across timezones.
          </h1>
          <div className="mt-8">
            <RLink
              to="/editor"
              className="select-none shadow-lg shadow-rose-500/10 hover:shadow-rose-500/20 transition-shadow text-white inline-flex font-semibold rounded-full bg-gradient-to-r from-rose-500 to-red-500 focus:outline-2 focus:outline-blue-500 focus:outline-offset-4 py-3 px-6"
            >
              Get started →
            </RLink>
          </div>
        </div>
      </PageLayout>

      <div className="mt-12 max-w-7xl pb-24 mx-auto perspective-lg">
        <div className="rotate-x-25 mx-12 pl-4 overflow-hidden">
          <ZoneTable zones={zones} />
        </div>
      </div>
    </>
  );
}

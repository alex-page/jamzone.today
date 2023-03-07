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
          <h1 className="text-4xl sm:text-6xl font-bold max-w-lg m-auto relative">
            Break the barrier
            <br />
            of timezones
          </h1>
          <p className="mt-4 text-xl text-slate-400">
            Jam with your homies today!
          </p>
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

      <div className=" mt-12 max-w-7xl pb-24 mx-auto overflow-hidden [perspective:800px] sm:[perspective:1024px]">
        <div className="[transform:rotateX(25deg)_scale(0.9)]">
          <ZoneTable zones={zones} />
        </div>
      </div>
    </>
  );
}

import {
  Form,
  Link as RLink,
  useFormAction,
  useLoaderData,
  useSubmit,
} from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import Link from "~/components/Link";
import ButtonSecondary from "~/components/ButtonSecondary";
import EmailInput from "~/components/EmailInput";
import TimezonePicker from "~/components/TimezoneInput";
import DayBoxes from "~/components/DayBoxes";
import HourInputs from "~/components/HourInputs";
import PageLayout from "~/components/PageLayout";
import type { Zone } from "~/types";
import { paramsToZoneArray, zoneArrayToParams } from "~/utils";

const defaultZone: Zone = {
  id: "",
  tz: "",
  d0: "on",
  d1: "on",
  d2: "on",
  d3: "on",
  d4: "on",
  d5: "",
  d6: "",
  h0: "09:00",
  h1: "12:00",
  h2: "13:00",
  h3: "17:00",
};

export const loader: LoaderFunction = async ({ request }) => {
  const qParams = new URL(request.url).searchParams;

  const zones =
    [...qParams.keys()].length === 0
      ? [structuredClone(defaultZone), structuredClone(defaultZone)]
      : paramsToZoneArray(qParams);

  return json({ zones });
};

export default function Editor() {
  const { zones } = useLoaderData();
  const submit = useSubmit();

  return (
    <PageLayout>
      <Form id="editor" method="get" onChange={(e) => submit(e.currentTarget)}>
        <nav className="text-xs py-4 text-gray-400 flex justify-between items-center border-b border-gray-700">
          <p className="py-2">
            <Link href="/">← Home</Link>
          </p>
          <button
            formAction={useFormAction("/zones")}
            formMethod="get"
            className="select-none text-white inline-flex font-semibold rounded-full bg-gradient-to-r from-red-500 to-rose-500 transition-shadow shadow-border shadow-red-400 hover:shadow-red-300 focus:outline-2 focus:outline-blue-500 focus:outline-offset-4 py-1 px-3"
          >
            Create jamzone →
          </button>
        </nav>
        <div className="flex flex-row mt-8 items-center justify-between">
          <h1 className="text-3xl font-semibold text-gray-300">New jamzone</h1>
        </div>
        <div className="grid gap-6 mt-8 mb-56">
          {zones.map((zone: Zone, rowId: number) => (
            <div key={rowId} className="group flex justify-between gap-4">
              <div className="flex flex-1 flex-wrap gap-4">
                <EmailInput
                  label="Email"
                  name={`${rowId}-id`}
                  value={zone.id}
                />
                <TimezonePicker
                  label="Timezone"
                  name={`${rowId}-tz`}
                  value={zone.tz}
                />
                <DayBoxes
                  label="Days"
                  name={`${rowId}-d`}
                  values={[
                    zone.d0,
                    zone.d1,
                    zone.d2,
                    zone.d3,
                    zone.d4,
                    zone.d5,
                    zone.d6,
                  ]}
                />
                <HourInputs
                  label="Hours"
                  name={`${rowId}-h`}
                  values={[zone.h0, zone.h1, zone.h2, zone.h3]}
                />
              </div>
              <RLink
                reloadDocument
                aria-label="Remove item"
                className={`flex items-center mt-4 px-4 text-gray-600 hover:text-gray-400 transition-colors ${
                  zones.length === 1 && "pointer-events-none"
                }`}
                type="button"
                title="Remove item"
                to={`/editor?${zoneArrayToParams(
                  zones.filter((_, i) => i !== rowId)
                )}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </RLink>
            </div>
          ))}
        </div>
        <div className="fixed bottom-0 right-0 left-0 shadow-[0_0_20px_20px_#111827e6]">
          <div className="backdrop-blur-sm bg-gray-900/90 absolute inset-0 -z-10"></div>
          <div className="max-w-4xl mx-auto flex gap-4 place-items-center pt-8 pb-16">
            <div className="border-t border-gray-700 flex-1" />
            <ButtonSecondary
              href={`/editor?${zoneArrayToParams([...zones, defaultZone])}`}
            >
              + Add person
            </ButtonSecondary>
            <div className="border-t border-gray-700 flex-1" />
          </div>
        </div>
      </Form>
    </PageLayout>
  );
}

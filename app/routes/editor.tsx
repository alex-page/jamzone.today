import { useFetcher, useLoaderData } from "@remix-run/react";
import type { ActionArgs, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { nanoid } from "nanoid";

import Link from "~/components/Link";
import EmailInput from "~/components/EmailInput";
import DayBoxes from "~/components/DayBoxes";
import HourInputs from "~/components/HourInputs";
import PageLayout from "~/components/PageLayout";
import CityPicker from "~/components/CityPicker";
import { paramsToZoneArray } from "~/utils/index.server";
import type { Zone } from "~/types";

function defaultZone(): Zone {
  return {
    id: nanoid(6),
    e: "",
    c: "",
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
}

export const loader: LoaderFunction = async ({ request }) => {
  const qParams = new URL(request.url).searchParams;

  const zones =
    [...qParams.keys()].length === 0
      ? [defaultZone(), defaultZone()]
      : paramsToZoneArray(qParams);

  return json({ zones });
};

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  const { _action, ...values } = Object.fromEntries(body);

  const [actionType, rowId] = _action.split("-");
  const params = new URLSearchParams(values);
  let zones = paramsToZoneArray(params);

  if (actionType === "redirect") return redirect(`/zones?${params}`);
  if (actionType === "create") zones = [...zones, defaultZone()];
  if (actionType === "delete") zones.splice(rowId, 1);

  return json({ zones });
}

export default function Editor() {
  const editor = useFetcher();
  const loaderData = useLoaderData() as { zones: Zone[] };

  if (!editor.data) {
    editor.data = { zones: loaderData.zones };
  }

  return (
    <PageLayout>
      <editor.Form method="post" preventScrollReset>
        <nav className="text-xs py-3 text-gray-400 flex justify-between items-center border-b border-gray-700">
          <p>
            <Link href="/">← Home</Link>
          </p>
          <button
            name="_action"
            value="redirect"
            className="select-none shadow-lg shadow-rose-500/10 hover:shadow-rose-500/20 transition-shadow text-white inline-flex font-semibold rounded-full bg-gradient-to-r from-rose-500 to-red-500 focus:outline-2 focus:outline-blue-500 focus:outline-offset-4 py-1 -my-1 px-3"
          >
            View jamzone →
          </button>
        </nav>
        <div className="flex flex-row mt-8 items-center justify-between">
          <h1 className="text-3xl font-semibold text-gray-300">New jamzone</h1>
        </div>

        <div className="grid gap-6 mt-8 mb-56">
          {editor.data.zones.map((zone: Zone, rowId: number) => (
            <div key={zone.id} className="group flex justify-between gap-4">
              <div className="flex flex-1 flex-wrap gap-4">
                <input type="hidden" name={`${rowId}-id`} value={zone.id} />
                <EmailInput label="Email" name={`${rowId}-e`} value={zone.e} />
                <CityPicker label="City" name={`${rowId}-c`} value={zone.c} />
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
              <button
                name="_action"
                value={`delete-${rowId}`}
                aria-label="Remove item"
                className={`flex items-center mt-4 px-4 text-gray-600 hover:text-gray-400 transition-colors ${
                  editor.data.zones.length === 1 && "pointer-events-none"
                }`}
                title="Remove item"
                formNoValidate
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
              </button>
            </div>
          ))}
        </div>
        <div className="fixed bottom-0 right-0 left-0 shadow-[0_0_20px_20px_#111827e6]">
          <div className="backdrop-blur-sm bg-gray-900/90 absolute inset-0 -z-10"></div>
          <div className="max-w-4xl mx-auto flex gap-4 place-items-center pt-8 pb-16">
            <div className="border-t border-gray-700 flex-1" />
            <button
              name="_action"
              value="create"
              className="text-sm select-none outline-none py-1 px-6 transition-colors bg-gray-200/10 text-gray-300 border border-gray-400/20 hover:border-gray-400/40 rounded-full focus-visible:border-blue-500"
              formNoValidate
            >
              + Add person
            </button>
            <div className="border-t border-gray-700 flex-1" />
          </div>
        </div>
      </editor.Form>
    </PageLayout>
  );
}

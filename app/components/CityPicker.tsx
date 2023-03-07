import { Combobox } from "@headlessui/react";
import { useState } from "react";
import { cityMapping } from "city-timezones";

const Icon = () => (
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
      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
    />
  </svg>
);

interface Props {
  label: string;
  name: string;
  value?: string;
}

export default function TimezonePicker({ label, name, value }: Props) {
  const [query, setQuery] = useState("");

  const filteredZones =
    query === ""
      ? []
      : cityMapping.filter(({ city }) => {
          return city.toLowerCase().startsWith(query.toLowerCase());
        });

  return (
    <div className="flex flex-col flex-1 text-slate-400">
      {/* https://github.com/tailwindlabs/headlessui/issues/2003#issuecomment-1332566391 */}
      <Combobox defaultValue={value} name={name}>
        <Combobox.Label className="block text-xs mb-1">{label}</Combobox.Label>
        <div className="relative">
          <div className="cursor-default text-sm">
            <Combobox.Input
              required
              className="px-4 py-2 w-full min-w-[8rem] leading-none bg-slate-400/10 text-slate-300 border border-gray-400/20 hover:border-gray-400/40 transition-colors rounded outline-none focus:border-blue-500"
              onChange={(event) => setQuery(event.target.value)}
              data-1p-ignore
            />
            <Combobox.Button className="flex absolute top-0 bottom-0 right-0 justify-center items-center w-10 text-xs">
              <Icon />
            </Combobox.Button>
          </div>

          <Combobox.Options className="absolute z-50 max-h-60 top-10 w-full min-w-[8rem] overflow-auto bg-slate-800 rounded border border-gray-400/20">
            {filteredZones.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none py-2 px-4 text-xs text-slate-300">
                Nothing found.
              </div>
            ) : (
              filteredZones.map(({ city, iso3 }, zid) => (
                <Combobox.Option
                  key={zid}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 text-xs ${
                      active ? "bg-blue-500 text-white" : "text-slate-300"
                    }`
                  }
                  value={`${city}, ${iso3}`}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {city}, {iso3}
                      </span>
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  );
}

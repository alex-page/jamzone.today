import { useEffect, useState } from "react";

import Link from "~/components/Link";
import App from "~/components/App";
import ButtonPrimary from "~/components/ButtonPrimary";
import ButtonSecondary from "~/components/ButtonSecondary";
import EmailInput from "~/components/EmailInput";
import TimzonePicker from "~/components/TimzonePicker";
import DayPicker from "~/components/DayPicker";
import HourPicker from "~/components/HourPicker";
import PageLayout from "~/components/PageLayout";
import Label from "~/components/Label";
import { useSearchParams } from "@remix-run/react";

const defaultZone: Zone = {
  id: "",
  tz: "",
  days: [1, 1, 1, 1, 1, 0, 0],
  hours: [
    ["09:00", "12:00"],
    ["13:00", "17:00"],
  ],
};

interface Zone {
  id: string;
  tz: string;
  days: number[];
  hours: string[][];
}

const getParams = (zones: Zone[]) => {
  const zoneParams = zones.map(
    (zone) =>
      `${zone.id},${zone.tz},${zone.days.join("-")},${zone.hours
        .map(([a, b]) => `${a}-${b}`)
        .join("_")}`
  );
  const params = `?z=${zoneParams}`;

  return params;
};

export default function New() {
  const [zones, setZones] = useState<Zone[]>([
    structuredClone(defaultZone),
    structuredClone(defaultZone),
  ]);
  const [params, setParams] = useSearchParams();

  const addPerson = () => {
    setZones([...zones, structuredClone(defaultZone)]);
    window.scrollTo(0, document.body.scrollHeight);
  };

  const updateZone = (
    e: React.ChangeEvent<HTMLInputElement>,
    rowId: number,
    type: "id" | "tz"
  ) => {
    const newZones = structuredClone(zones);
    newZones[rowId][type] = e.target.value;
    setZones(newZones);
  };

  const updateDays = (
    e: React.ChangeEvent<HTMLInputElement>,
    rowId: number,
    boxId: number
  ) => {
    const newZones = structuredClone(zones);
    newZones[rowId].days[boxId] = e.target.checked ? 1 : 0;
    setZones(newZones);
  };

  const updateHour = (
    e: React.ChangeEvent<HTMLInputElement>,
    rowId: number,
    hourGroupId: number,
    hourId: number
  ) => {
    const newZones = structuredClone(zones);
    newZones[rowId].hours[hourGroupId][hourId] = e.target.value;
    setZones(newZones);
  };

  useEffect(() => {
    setParams({ z: getParams(zones) });
  }, [setParams, zones]);

  return (
    <App>
      <PageLayout>
        <p>{params}</p>
        <nav className="text-xs py-4 text-gray-400 flex border-b border-gray-700">
          <Link url="/">← Home</Link>
        </nav>
        <div className="flex flex-row mt-8 items-center justify-between">
          <h1 className="text-3xl font-semibold text-gray-300">New jamzone</h1>
          <ButtonPrimary url={`/zones${params}`}>Create jamzone</ButtonPrimary>
        </div>
        <div className="grid gap-4 mt-8 mb-60">
          {zones.map((zone, rowId: number) => (
            <div key={rowId} className="flex gap-6">
              <div className="flex-1">
                <EmailInput
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateZone(e, rowId, "id")
                  }
                  label="Email"
                  rowId={`id-${rowId}`}
                  value={zone.id}
                />
              </div>
              <div className="flex-1">
                <TimzonePicker
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateZone(e, rowId, "tz")
                  }
                  label="Timezone"
                  rowId={`tz-${rowId}`}
                />
              </div>
              <div>
                <Label as="p">Days</Label>
                <div className="flex gap-2 items-center h-9">
                  {zone.days.map((isChecked, boxId) => (
                    <DayPicker
                      key={`days-${rowId}-${boxId}`}
                      rowId={`days-${rowId}-${boxId}`}
                      boxId={boxId}
                      isChecked={isChecked === 1}
                      onChange={(e: any) => updateDays(e, rowId, boxId)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <Label as="p">Hours</Label>
                <div className="flex gap-4">
                  {zone.hours.map(([minHour, maxHour], hourId) => (
                    <div key={hourId} className="flex gap-1">
                      <HourPicker
                        onChange={(e: any) => updateHour(e, rowId, hourId, 0)}
                        value={minHour}
                        min="00:00"
                        max="23:30"
                      />
                      <HourPicker
                        onChange={(e: any) => updateHour(e, rowId, hourId, 1)}
                        value={maxHour}
                        min={minHour}
                        max="23:30"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="fixed bottom-0 right-0 left-0">
          <div className="backdrop-blur-sm bg-gray-900/90 absolute inset-0 -z-10"></div>
          <div className="max-w-4xl mx-auto flex gap-4 place-items-center pt-8 pb-16">
            <div className="border-t border-gray-700 flex-1" />
            <ButtonSecondary onClick={addPerson}>Add person +</ButtonSecondary>
            <div className="border-t border-gray-700 flex-1" />
          </div>
        </div>
      </PageLayout>
    </App>
  );
}

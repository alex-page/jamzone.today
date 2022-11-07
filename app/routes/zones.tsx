import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import Link from "~/components/Link";
import { paramsToZoneArray } from "~/utils";

export const loader: LoaderFunction = async ({ request }) => {
  const params = new URL(request.url).searchParams;

  return json({
    zones: paramsToZoneArray(params),
    paramString: params.toString(),
  });
};

export default function Zones() {
  const { zones, paramString } = useLoaderData();

  return (
    <div>
      <Link href={`/editor?${paramString}`}>{paramString}</Link>
      <pre>{JSON.stringify(zones, null, 2)}</pre>
    </div>
  );
}

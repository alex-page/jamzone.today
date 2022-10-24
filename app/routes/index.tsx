import App from "~/components/App";
import ButtonPrimary from "~/components/ButtonPrimary";
import PageLayout from "~/components/PageLayout";
import ZoneTable from "~/components/ZoneTable";

export default function Index() {
  return (
    <App>
      <PageLayout>
        <nav className="text-xs py-4 text-gray-400 flex border-b border-gray-700">
          <p className="flex-1">
            Made by{" "}
            <a className="link" href="https://alexpage.dev">
              Alex Page
            </a>
          </p>
          <ul className="flex gap-6 justify-end">
            <li>
              ★ Star on{" "}
              <a
                className="link"
                href="https://github.com/alex-page/jamzone.today"
              >
                GitHub
              </a>
            </li>
          </ul>
        </nav>
        <div className="text-center pt-40">
          <h1 className="inline-grid relative">
            <div className="absolute -top-6 -right-2 text-rose-500 flex">
              <span className="text-xs border-rose-500 rounded font-semibold border-2 py-1 px-2">
                🍓 Alpha
              </span>
            </div>
            <span className="text-6xl font-bold">jamzone.today</span>
          </h1>
          <p className="mt-4 text-xl text-gray-400">
            The standard for international collaboration.
          </p>
          <div className="mt-8">
            <ButtonPrimary url="/new">Pump up the jam →</ButtonPrimary>
          </div>
        </div>
      </PageLayout>

      <div className="mt-12 max-w-7xl mx-auto perspective-lg">
        <div className="rotate-x-25">
          <ZoneTable />
        </div>
      </div>
    </App>
  );
}

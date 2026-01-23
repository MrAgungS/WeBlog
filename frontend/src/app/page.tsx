export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Write. Publish. Share.
        </h1>

        <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
          A simple personal blog platform
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <a href="/dashboard" className="rounded-lg bg-green-600 px-6 py-3 text-sm font-medium text-white hover:bg-green-700 transition">
            Dashboard
          </a>
          <a href="/about" className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition">
            About
          </a>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard title="Write Posts" desc="Create and edit blog posts with a clean dashboard experience."/>
          <FeatureCard title="Manage Content" desc="Draft, publish, archive, and organize your content easily."/>
          <FeatureCard title="Modern Stack" desc="Built using Next.js (Frontend), Express (Backend)."/>
          <FeatureCard title="My Reason" desc="I know youre probably thinking, “Why not just use full Next.js?” Honestly, I want to focus on the backend. And in my opinion, Next.js has documentation thats easy to understand."/>
        </div>
      </section>
    </main>
  );
}
function FeatureCard({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {desc}
      </p>
    </div>
  );
}


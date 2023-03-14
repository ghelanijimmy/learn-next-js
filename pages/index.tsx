import { getFeaturedEvents } from "@/utils/api";
import EventList from "@/components/events/EventList";
import { Event } from "@/components/events/types";
import Head from "next/head";

export default function Home({ featuredEvents }: { featuredEvents: Event[] }) {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <EventList items={featuredEvents} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents,
    },
    revalidate: 1800,
  };
}

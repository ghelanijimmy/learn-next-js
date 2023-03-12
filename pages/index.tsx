import { getFeaturedEvents } from "@/utils/api";
import EventList from "@/components/events/EventList";
import { Event } from "@/components/events/types";

export default function Home({ featuredEvents }: { featuredEvents: Event[] }) {
  return (
    <div>
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

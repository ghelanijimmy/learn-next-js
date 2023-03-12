import EventList from "@/components/events/EventList";
import EventsSearch from "@/components/events/events-search";
import { getAllEvents } from "@/utils/api";
import { useRouter } from "next/router";
import { InferGetStaticPropsType } from "next";

export default function AllEventsPage({
  events,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const findEventsHandler = (year: string, month: string) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };
  return (
    <div>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </div>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events,
    },
    revalidate: 60,
  };
}

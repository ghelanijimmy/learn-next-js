import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";
import { getEventById } from "@/dummy-data";
import { useRouter } from "next/router";
import { useMemo } from "react";

export default function EventDetailPage() {
  const router = useRouter();

  console.log(router.query);

  const { eventId } = router.query;

  const event = useMemo(() => getEventById(eventId as string), []);

  console.log(event);

  if(!event){
    return <p>No event found!</p>
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}

import { getFilteredEvents } from "@/utils/api";
import EventList from "@/components/events/EventList";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";

export default function FilteredEventsPage({
  events,
  hasError,
  date,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${new Date(date).getMonth()}/${new Date(
          date
        ).getFullYear()}`}
      />
    </Head>
  );

  if (hasError) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  if (events.length === 0) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  return (
    <>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={events} />
    </>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ slug: string[] }>
) {
  const { params } = context;
  const filterData = params!.slug;
  const year = filterData[0];
  const month = filterData[1];

  const numYear = +year;
  const numMonth = +month;

  const getHasError = () =>
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12;

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  const date = new Date(numYear, numMonth - 1);

  return {
    props: {
      events: filteredEvents || [],
      date: date.toISOString(),
      hasError: getHasError(),
    },
  };
}

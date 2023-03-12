import { Event } from "@/components/events/types";

const getApiData = async () => {
  const response = await fetch(
    "https://learn-next-js-c3666-default-rtdb.firebaseio.com/events.json"
  );
  const data = (await response.json()) as {
    [key: string]: Omit<Event, "id">;
  };
  const transformedData: Event[] = [];

  for (const key in data) {
    transformedData.push({
      id: key,
      ...data[key],
    });
  }
  return transformedData;
};

export async function getFeaturedEvents(): Promise<Event[]> {
  const apiData = await getApiData();
  return apiData.filter((event) => event.isFeatured);
}

export async function getAllEvents() {
  return await getApiData();
}

export async function getFilteredEvents(dateFilter: {
  year: number;
  month: number;
}) {
  const { year, month } = dateFilter;
  const apiData = await getApiData();

  return apiData.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });
}

export function getEventById(id: string) {
  return getApiData().then((data) => data.find((event) => event.id === id));
}

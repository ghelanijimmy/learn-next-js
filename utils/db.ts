import { Document, InsertOneResult, MongoClient, Sort } from "mongodb";

export async function connectDatabase(): Promise<MongoClient> {
  return await MongoClient.connect(
    "mongodb+srv://ghelanijimmy:LearnNextJS@cluster0.ht18qzy.mongodb.net/events?retryWrites=true&w=majority"
  );
}

export async function insertDocument<T extends Document>(
  client: MongoClient,
  collection: string,
  document: T
): Promise<InsertOneResult<T>> {
  const db = client.db();
  return await db.collection(collection).insertOne(document);
}

export async function getAllDocuments<T extends Document>(
  client: MongoClient,
  collection: string,
  sort: Sort,
  filter: Document | {} = {}
) {
  const db = client.db();
  return await db
    .collection<T>(collection)
    .find()
    .filter(filter)
    .sort(sort)
    .toArray();
}

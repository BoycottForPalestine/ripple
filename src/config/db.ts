import { Db, MongoClient } from "mongodb";

const connectionStrings = {
  local: "mongodb://localhost:27017",
  alpha:
    "mongodb+srv://rcmalpha:rcmalpha@rcmalpha.ymcakmt.mongodb.net/?retryWrites=true&w=majority", // For local testing against a live DB. Supports search
  prod: `mongodb+srv://rcmadmin:${process.env.MONGO_PROD_PASSWORD}@rcmprod.nsjci.mongodb.net/?retryWrites=true&w=majority`,
};

const databaseNames = {
  local: "RippleLocalDB",
  alpha: "RippleAlphaDB",
  prod: "RippleProdDB",
};

const connectionString =
  // @ts-ignore
  connectionStrings[process.env.DB_ENV] ?? connectionStrings["local"];
const client = new MongoClient(connectionString);
let conn: MongoClient;

async function getConnection() {
  if (!conn) {
    conn = await client.connect();
  }
  return conn;
}

let db: {
  mongoDb: Db | null;
} = {
  mongoDb: null,
};
getConnection().then((conn) => {
  // @ts-ignore
  db.mongoDb = conn.db(
    // @ts-ignore
    databaseNames[process.env.DB_ENV] ?? databaseNames["local"]
  );
});

export default db;

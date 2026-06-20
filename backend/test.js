const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://pugazhspoidy_db_user:YqtwWq7uu5MZAb6V@cluster0.suylrke.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function test() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("CONNECTED SUCCESSFULLY!");
  } catch (err) {
    console.error("ERROR:", err);
  } finally {
    await client.close();
  }
}

test();
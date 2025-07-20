const { Client } = require("pg");
const env = process.env;

const SQL = `
CREATE TABLE IF NOT EXISTS characters (
  characterid INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  charactername VARCHAR ( 255 ),
  str smallint
);

CREATE TABLE IF NOT EXISTS inventory (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  setid integer,
  itemid integer,
  quantity smallint,
  characterid integer
);

DROP TABLE itemsets;
DROP TABLE itemlist;

CREATE TABLE IF NOT EXISTS itemsets (
  setid INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  setname VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS itemlist (
  itemid INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  setid integer,
  itemname VARCHAR ( 255 ),
  itemtype VARCHAR ( 255 ),
  itemdescription VARCHAR ( 255 ),
  weight real
);

INSERT INTO itemsets (setname)
VALUES ('5e Players Handbook');

INSERT INTO itemlist (setid, itemname, itemtype, itemdescription, weight)
VALUES 
  (1, 'Leather Armour', 'Armour', 'Light Armour, AC: 11+Dex', 10),
  (1, 'Shield', 'Shield', 'AC +2', 6),
  (1, 'Dagger', 'Simple Melee Weapon','1d4 Piercing, Finesse, Light, Thrown (20/60)', 1);
`

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${env.USER}:${env.PASSWORD}@localhost:${env.PORT}/${env.DATABASE}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
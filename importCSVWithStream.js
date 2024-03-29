import fs from 'node:fs';
import { parse } from 'csv-parse';

const stream = fs.createReadStream('./tasks.csv');

const csvParse = parse({
  delimiter: ',',
  skipEmptyLines: true,
  fromLine: 2
});

async function parseCSV() {
  const parsedLines = stream.pipe(csvParse);

  for await (const line of parsedLines) {
    const [title, description] = line;

    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      })
    })
  }

}

parseCSV()

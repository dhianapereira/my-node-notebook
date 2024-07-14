import fs from 'fs';
import {parse} from 'csv-parse';
import fetch from 'node-fetch';

const file = new URL('tasks.csv', import.meta.url)

async function importTasksFromCSV() {
    fs.createReadStream(file)
        .pipe(parse({
            columns: true,
            skipEmptyLines: true
        }, async (err, rows) => {
            if (err) {
                console.error('Failed to parse the csv:', err);
                return;
            }

            for await (const row of rows) {
                try {
                    await fetch('http://localhost:3333/tasks', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            title: row.title,
                            description: row.description
                        })
                    });
                } catch (error) {
                    console.error(error);
                }
            }
        }));
}

importTasksFromCSV();

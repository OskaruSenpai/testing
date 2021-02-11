import express from 'express';
import cors from 'cors';
const app = express();
const port = 5000;

export const possibleBuildings = [
	'Campus',
	'House 1',
	'House 2',
	'House 3',
	'Prices',
];

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function randomValueBetween(min, max) {
	return Math.random() * (max - min) + min; //The maximum is exclusive and the minimum is inclusive
}
const generateRandomData = async (from, to, resolution = 3.6e6) => {
	return new Promise(async (resolve, reject) => {
		const waitTime = randomValueBetween(0, 0.2);
		await delay(waitTime * 1000);
		const output = possibleBuildings.map((houseName, index) => {
			let currentTime = from;
			const numbers = {};
			while (currentTime <= to) {
				if (houseName === 'Prices') {
					numbers[currentTime] = randomValueBetween(12, 15);
				} else {
					numbers[currentTime] = randomValueBetween(0, 10);
				}
				currentTime += resolution;
			}
			return {
				tag: houseName,
				displayName: houseName,
				associatedBuilding: houseName,
				numbers,
				pinned: true,
			};
		});
		// console.log('Server sent:', output);
		resolve(output);
	});
};

app.use(
	cors({
		origin: true,
		methods: 'GET,OPTIONS,POST',
		allowedHeaders: [
			'Content-Type',
			'Authorization',
			'Access-Control-Allow-Methods',
			'Access-Control-Request-Headers',
		],
		preflightContinue: true,
		credentials: true,
	}),
);
app.options('*', (_req, res) => {
	res.sendStatus(200);
});
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.post('/api/campus/graph-data', async (req, res) => {
	console.time('data-request');
	const { start, end, houseName, resolution, show } = req.body;
	const data = await generateRandomData(start, end, resolution);
	res.send(data.filter(({ tag }) => tag !== 'Prices'));
	console.timeEnd('data-request');
});

app.post('/api/price/date-range', async (req, res) => {
	console.time('prices-request');
	const { start, end } = req.body;
	const data = await generateRandomData(start, end);
	res.send(data.filter(({ tag }) => tag === 'Prices'));
	console.timeEnd('prices-request');
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

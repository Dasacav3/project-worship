import cors from 'cors';

const config = {
	__dirname: __dirname,
	corsOptions: cors({
		allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", "Authorization", "Access-Control-Allow-Origin"],
		credentials: true,
		methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
		origin: "*",
		preflightContinue: false,
	})
};

export default config;

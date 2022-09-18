import { PrismaClient } from "@prisma/client";
import { Router } from "express";

import {
	convertHourStringToMinutesNumber,
	convertMinutesNumberToHourString,
} from "./utils/convertHourToMinute.js";

const prisma = new PrismaClient();
export const router = Router();

router.get("/games/:id/ads", async (req, res) => {
	const gameId = req.params.id;

	const ads = await prisma.ad.findMany({
		select: {
			id: true,
			name: true,
			weekDays: true,
			useVoiceChannel: true,
			yearsPlaying: true,
			hourStart: true,
			hourEnd: true,
		},
		where: {
			gameId,
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	const adsFormatted = ads.map(ad => ({
		...ad,
		hourStart: convertMinutesNumberToHourString(ad.hourStart),
		hourEnd: convertMinutesNumberToHourString(ad.hourEnd),
		weekDays: ad.weekDays.split(","),
	}));

	return res.json(adsFormatted);
});

router.get("/ads/:id/discord", async (req, res) => {
	const adId = req.params.id;

	const ad = await prisma.ad.findUniqueOrThrow({
		select: {
			discord: true,
		},
		where: {
			id: adId,
		},
	});

	return res.json({ discord: ad.discord });
});

router.post("/games/:id/ads", async (req, res) => {
	const gameId = req.params.id;
	const {
		useVoiceChannel,
		yearsPlaying,
		hourStart,
		weekDays,
		discord,
		hourEnd,
		name,
	}: AdBody = req.body;

	// TODO: Validation

	console.log({ body: req.body });

	const ad = await prisma.ad.create({
		data: {
			hourStart: convertHourStringToMinutesNumber(hourStart),
			hourEnd: convertHourStringToMinutesNumber(hourEnd),
			weekDays: weekDays.join(), // [0,4,6] -> "0,4,6"
			useVoiceChannel,
			yearsPlaying,
			discord,
			gameId,
			name,
		},
	});

	return res.status(201).json(ad);
});

router.get("/games", async (_req, res) => {
	const games = await prisma.game.findMany({
		include: {
			_count: {
				select: {
					ads: true,
				},
			},
		},
	});

	return res.json(games);
});

interface AdBody {
	useVoiceChannel: boolean;
	yearsPlaying: number;
	weekDays: number[];
	hourStart: string;
	discord: string;
	hourEnd: string;
	name: string;
}

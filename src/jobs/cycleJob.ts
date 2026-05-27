import cron from "node-cron"
import dayjs from "dayjs"
import {Cycle} from "../models/cycle"

cron.schedule("0 0 * * *", async () => {
    const today = dayjs().format("YYYY-MM-DD")

    const endedCycles = await Cycle.findAll({
        where: {
            endDate: today
        }
    });
    for (const cycle of endedCycles) {
        const nextStartDate = dayjs(cycle.endDate).add(1,"day");
        const nextEndDate = nextStartDate.add(cycle.frequency, "day");
        await Cycle.create({
            startDate: nextStartDate.format("YYYY-MM-DD"),
            endDate: nextEndDate.format("YYYY-MM-DD"),
            frequency: cycle.frequency,
        })
    }
})


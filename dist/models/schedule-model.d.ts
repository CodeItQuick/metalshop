import { UserModel, ScheduleModel, ScheduleSentryTopic } from "../interfaces.js";
export declare function createScheduleModel({ user, scheduleSentry }: {
    user: UserModel;
    scheduleSentry: ScheduleSentryTopic;
}): ScheduleModel;

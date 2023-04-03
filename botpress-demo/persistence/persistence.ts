import {
    IPersistence,
    IPersistenceRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import {
    RocketChatAssociationModel,
    RocketChatAssociationRecord,
} from "@rocket.chat/apps-engine/definition/metadata";

export async function createBot(
    persistence: IPersistence,
    botname: string,
    description: string,
    botid: string,
    username: string,
    botalias: string
): Promise<void> {
    const associations: RocketChatAssociationRecord =
        new RocketChatAssociationRecord(RocketChatAssociationModel.USER, `bot`);

    const bot = {
        botname: botname,
        description: description,
        botid: botid,
        botalias: botalias,
        username: username,
    };
    await persistence.createWithAssociation(bot, associations);
}

export async function readbot(persistence: IPersistenceRead) {
    const association: RocketChatAssociationRecord =
        new RocketChatAssociationRecord(RocketChatAssociationModel.USER, "bot");

    const result = (await persistence.readByAssociation(
        association
    )) as Array<any>;

    return result;
}

import {
    IHttp,
    IModify,
    IPersistence,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import { UIKitViewSubmitInteractionContext } from "@rocket.chat/apps-engine/definition/uikit";
import { BotpressDemoApp } from "../BotpressDemoApp";
import { ActionId } from "../enums/actionId";
import { BlockId } from "../enums/blockId";
import { createBot } from "../persistence/persistence";

export class ExecuteViewSubmitHandler {
    constructor(
        private readonly app: BotpressDemoApp,
        private readonly read: IRead,
        private readonly http: IHttp,
        private readonly modify: IModify,
        private readonly persistence: IPersistence
    ) {}

    public async handle(context: UIKitViewSubmitInteractionContext) {
        const { user, view } = context.getInteractionData();
        try {
            switch (view.id) {
                case "input":
                    const botId = view.state?.[BlockId.INPUT]?.[ActionId.BOTID];
                    const botname =
                        view.state?.[BlockId.INPUT]?.[ActionId.BOTNAME];
                    const botalias =
                        view.state?.[BlockId.INPUT]?.[ActionId.BOTALIAS];
                    const user =
                        view.state?.[BlockId.INPUT]?.[ActionId.USERNAME];
                    console.log(view.state);
                    if (
                        !(await this.read.getUserReader().getByUsername(user))
                    ) {
                        console.log("User does not exist");
                        // return;
                    }
                    await createBot(this.persistence,botname, botId, user, botalias);
                    break;
            }
        } catch (e) {
            console.log(e);
        }
    }
}

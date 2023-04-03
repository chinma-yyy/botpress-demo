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

function validate(botid, boturl, user) {
    let regexp = /^[a-zA-Z0-9_]+$/;
    if (!regexp.test(user)) {
        return false
    }
    regexp = /^https?:\/\/[^\s/$.?#].[^\s]*$/;
    if (!regexp.test(boturl)) {
        return false;
    }
    regexp = /^[a-zA-Z0-9]+$/
    if (!regexp.test(botid)) {
        return false
    }
    return true;
}
export class ExecuteViewSubmitHandler {
    constructor(
        private readonly app: BotpressDemoApp,
        private readonly read: IRead,
        private readonly http: IHttp,
        private readonly modify: IModify,
        private readonly persistence: IPersistence
    ) { }

    public async handle(context: UIKitViewSubmitInteractionContext) {
        const { user, view } = context.getInteractionData();
        console.log("here");
        try {
            switch (view.id) {
                case "input":
                    const botname =
                        view.state?.[BlockId.INPUT]?.[ActionId.BOTNAME];
                    const botalias =
                        view.state?.[BlockId.INPUT]?.[ActionId.BOTALIAS];
                    const user =
                        view.state?.[BlockId.INPUT]?.[ActionId.USERNAME];
                    const desc =
                        view.state?.[BlockId.INPUT]?.[ActionId.DESCRIPTION];
                    const url = view.state?.[BlockId.INPUT]?.[ActionId.BOTID];
                    if (!validate(botalias, url, user)) {

                        const message = this.modify.getCreator().startMessage().setText("Invalid Input :warning:").setRoom((await this.read.getRoomReader().getById('GENERAL'))!);
                        this.modify.getCreator().finish(message);
                        return;
                    }
                    if (
                        !(await this.read.getUserReader().getByUsername(user))
                    ) {
                        console.log("User does not exist");

                    }
                    await createBot(
                        this.persistence,
                        botname,
                        desc,
                        url,
                        user,
                        botalias,
                    );

            }
        } catch (e) {
            console.log(e);
            console.log("error submit view")
        }
    }
}

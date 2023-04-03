import {
    IHttp,
    IModify,
    IPersistence,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import {
    ISlashCommand,
    SlashCommandContext,
} from "@rocket.chat/apps-engine/definition/slashcommands";
import { BotpressDemoApp } from "../BotpressDemoApp";
import { botconfigmodal } from "../modals/inputmodalt";
import { botMessage } from "../modals/message";
import { createBot, readbot } from "../persistence/persistence";

export class Botpresscommand implements ISlashCommand {
    public constructor(private readonly app: BotpressDemoApp) { }
    public command: string = "botpress";
    public i18nParamsExample: string = "Params_example";
    public i18nDescription: string =
        "Connect botpress bot to your rocket chat workspace";
    public providesPreview: boolean = false;

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persistence: IPersistence
    ): Promise<void> {
        const subcommands = context.getArguments();
        const param1 = subcommands[0];
        let modal, triggerId;
        switch (param1) {
            case "create":
                console.log("create");
                modal = await botconfigmodal(
                    modify,
                    persistence,
                    read,
                    http,
                    context
                );
                triggerId = context.getTriggerId()!;
                await modify
                    .getUiController()
                    .openModalView(modal, { triggerId }, context.getSender());

                console.log("After opening?");
                break;


            case "list":
                console.log("list");
                const bot = await readbot(read.getPersistenceReader());
                if(bot.length==0){
                    const zero=modify.getCreator().startMessage().setText("No bots configures").setRoom(context.getRoom());
                    modify.getCreator().finish(zero);
                    return;
                }
                await botMessage(
                    modify,
                    context.getRoom(),
                    bot,
                    context.getSender().username,
                    read
                );
                console.log(bot);
                console.log("One element");
                break;

            default:
                console.log("Default");
                break;
        }
    }
}

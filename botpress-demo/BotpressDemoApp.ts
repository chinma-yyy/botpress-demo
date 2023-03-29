import {
    IAppAccessors,
    IConfigurationExtend,
    IEnvironmentRead,
    IHttp,
    ILogger,
    IModify,
    IPersistence,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import { ApiSecurity, ApiVisibility } from "@rocket.chat/apps-engine/definition/api";
import { App } from "@rocket.chat/apps-engine/definition/App";
import { IAppInfo } from "@rocket.chat/apps-engine/definition/metadata";
import { UIKitViewSubmitInteractionContext } from "@rocket.chat/apps-engine/definition/uikit";
import { Botpresscommand } from "./command/botpress";
import { Botpresswebhook } from "./webhook/endpoint";
import { ExecuteViewSubmitHandler } from "./handler/viewsubmit";

export class BotpressDemoApp extends App {
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }
    public async executeViewSubmitHandler(
        context: UIKitViewSubmitInteractionContext,
        read: IRead,
        http: IHttp,
        persistence: IPersistence,
        modify: IModify
    ) {
        const handler = new ExecuteViewSubmitHandler(
            this,
            read,
            http,
            modify,
            persistence
        );
        return await handler.handle(context);
    }

    protected async extendConfiguration(
        configuration: IConfigurationExtend,
        environmentRead: IEnvironmentRead
    ): Promise<void> {
        const command: Botpresscommand = new Botpresscommand(this);
        await configuration.slashCommands.provideSlashCommand(command);
        await configuration.api.provideApi({
            visibility:ApiVisibility.PUBLIC,
            security: ApiSecurity.UNSECURE,
            endpoints: [new Botpresswebhook(this)]
        })
    }
}

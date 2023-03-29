import {
    IHttp,
    IModify,
    IPersistence,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import { SlashCommandContext } from "@rocket.chat/apps-engine/definition/slashcommands";
import { ActionId } from "../enums/actionId";
import { BlockId } from "../enums/blockId";
import { ViewId } from "../enums/viewId";

export async function botconfigmodal(
    modify: IModify,
    persistence: IPersistence,
    read: IRead,
    http: IHttp,
    SlashCommandContext?: SlashCommandContext,
    data?: any
) {
    const block = modify.getCreator().getBlockBuilder();

    block.addInputBlock({
        blockId: BlockId.INPUT,
        label: block.newPlainTextObject("Bot name"),
        element: block.newPlainTextInputElement({
            actionId: ActionId.BOTNAME,
            placeholder: block.newPlainTextObject("Name of the bot"),
        }),
    });
    block.addInputBlock({
        blockId: BlockId.INPUT,
        label: block.newPlainTextObject("Rocket chat user name"),
        element: block.newPlainTextInputElement({
            actionId: ActionId.USERNAME,
            placeholder: block.newPlainTextObject("Username"),
        }),
    });
    block.addInputBlock({
        blockId: BlockId.INPUT,
        label: block.newPlainTextObject("Bot Id"),
        element: block.newPlainTextInputElement({
            actionId: ActionId.BOTALIAS,
            placeholder: block.newPlainTextObject("Bot ID from botpress"),
        }),
    });
    block.addInputBlock({
        blockId: BlockId.INPUT,
        label: block.newPlainTextObject("Botpress Url"),
        element: block.newPlainTextInputElement({
            actionId: ActionId.BOTID,
            placeholder: block.newPlainTextObject("URL"),
        }),
    });

    return {
        id: ViewId.INPUT,
        title: block.newPlainTextObject("BOT Config"),
        blocks: block.getBlocks(),
        submit: block.newButtonElement({
            actionId: ActionId.SUBMIT,
            text: block.newPlainTextObject("Create"),
        }),
    };
}

import { IModify, IRead } from "@rocket.chat/apps-engine/definition/accessors";
import {
    IMessageAttachment,
    MessageActionButtonsAlignment,
    MessageActionType,
} from "@rocket.chat/apps-engine/definition/messages";
import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";

export async function botMessage(
    modify: IModify,
    room: IRoom,
    data: Array<object>,
    user: string,
    read: IRead
) {
    console.log(room);
    console.log("room");
    const message = modify.getCreator().startMessage().setRoom(room);
    let attachments: Array<IMessageAttachment> = [];
    let attachment: IMessageAttachment;

    data?.forEach((element, index) => {
        attachment = {
            thumbnailUrl:
                `https://avatars.githubusercontent.com/u/112387862?v=4`,
            description: `${element?.["description"]}`,
            text: `## ${element?.["botalias"]} ${index}
            \n${element?.["description"]}`,
            actionButtonsAlignment: MessageActionButtonsAlignment.HORIZONTAL,
            actions: [
                {
                    type: MessageActionType.BUTTON,
                    text: "Create bot",
                    msg: "/botpress create",
                    msg_in_chat_window: true,
                },
                {
                    type: MessageActionType.BUTTON,
                    text: "Delete bot",
                    msg: "Command to delete",
                    msg_in_chat_window: true,
                },
                {
                    type: MessageActionType.BUTTON,
                    text: "Button3",
                    msg: "Button3 action",
                    msg_in_chat_window: true,
                },
            ],
        };
        attachments.push(attachment);

    })
    message.setAttachments(attachments);
    await modify.getCreator().finish(message);
    console.log("bot liring");
};


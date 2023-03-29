import { IModify } from "@rocket.chat/apps-engine/definition/accessors";
import {
    IMessageAttachment,
    MessageActionButtonsAlignment,
    MessageActionType,
} from "@rocket.chat/apps-engine/definition/messages";
import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";

export async function botMessage(
    modify: IModify,
    room: IRoom,
    data?: Array<object>
) {
    const block = modify.getCreator().getBlockBuilder();
    const message = modify.getCreator().startMessage().setRoom(room);
    let attachments: Array<IMessageAttachment> = [
        {
            thumbnailUrl:
                "https://avatars.githubusercontent.com/u/112387862?v=4",
            description: "Sample description",
            text: `## Bot Title
            \nBot Description`,
            actionButtonsAlignment: MessageActionButtonsAlignment.HORIZONTAL,
            actions: [
                {
                    type: MessageActionType.BUTTON,
                    text: "Button1",
                    msg: "Button1 action",
                    msg_in_chat_window: true,
                },
                {
                    type: MessageActionType.BUTTON,
                    text: "Button2",
                    msg: "Button2 action",
                    msg_in_chat_window: true,
                },
                {
                    type: MessageActionType.BUTTON,
                    text: "Button3",
                    msg: "Button3 action",
                    msg_in_chat_window: true,
                },
            ],
        },
    ];
    message.setAttachments(attachments);
    modify.getCreator().finish(message);
    // data.forEach((element, index) => {
    //     console.log(element);
    // });
}

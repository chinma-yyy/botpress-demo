import { ApiEndpoint } from "@rocket.chat/apps-engine/definition/api";

export class Botpresswebhook extends ApiEndpoint {
    public path: string = "botpresswebhook";

    public async post(sampleParams) {
        //Handle the Webhook request
        return this.success();
    }
}

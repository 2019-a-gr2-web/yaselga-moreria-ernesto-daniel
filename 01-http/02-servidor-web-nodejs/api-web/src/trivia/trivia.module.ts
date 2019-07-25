import { Module } from "@nestjs/common";
import { TriviaGateway } from "./trivia.gateway";

@Module({
    providers:[
        TriviaGateway
    ]
})
export class TriviaModule{}
import { ApiKeys } from "@prisma/client";

export class UpdateApikeyDto implements Partial<ApiKeys> {
    key       :string
    authorId  :number
}

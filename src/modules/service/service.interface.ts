import { ServiceWhereInput } from "../../../generated/prisma/models";

export interface IServiceQuery extends ServiceWhereInput {
    sortby?: string | number
    sortOrder?: string,
    searchTerm?: string
}
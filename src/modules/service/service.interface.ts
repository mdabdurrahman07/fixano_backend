import { ServiceWhereInput, TechnicianWhereInput } from "../../../generated/prisma/models";

export interface IServiceQuery extends ServiceWhereInput {
    sortby?: string 
    sortOrder?: string,
    searchTerm?: string
}
export interface ITechnicianQuery extends TechnicianWhereInput {
    sortby?: string 
    sortOrder?: string,
    searchTerm?: string
}
import { IUser, IUserMember } from "./user.interface";

export interface IMainContext {
    user?: IUser;
    myOrgs?: IUserMember[];
    currentOrg?: IUserMember;
    setCurrentOrg: (value: IUserMember) => void;
}

import { CustomNodeProps } from "./node.interface";
import { IUser, IUserMember } from "./user.interface";

export interface IMainContext {
    user?: IUser;
    myOrgs?: IUserMember[];
    currentOrg?: IUserMember;
    setCurrentOrg: (value: IUserMember) => void;
}

export interface INodeContext {
    node?: CustomNodeProps;
    setNode: (value: CustomNodeProps | undefined) => void;
}

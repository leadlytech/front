export interface IUser {
    id: string;
    status: string;
    firstName: string;
    lastName: string;
    email: string;
    emailVerifiedAt: Date | null;
    phoneNumber: string;
    phoneNumberVerifiedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    members: IUserMember[];
}

export interface IUserMember {
    id: string;
    status: string;
    owner: boolean;
    createdAt: Date;
    organization: {
        id: string;
        name: string;
    };
    permissions: string[];
    roles: Array<{ id: string; name: string }>;
}

import { IUser } from "./user.interface"

export interface IMainContext {
  user?: IUser
  sync: () => Promise<void>
}
import { createContext, useContext } from "react";
import BookClubStore from "./bookClubStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ProfileStore from "./profileStore";
import CommentStore from "./commentStore";

interface Store {
  bookClubStore: BookClubStore;
  commonStore: CommonStore;
  userStore: UserStore;
  profileStore: ProfileStore;
  commentStore: CommentStore;
}

export const store: Store = {
  bookClubStore: new BookClubStore(),
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  profileStore: new ProfileStore(),
  commentStore: new CommentStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}

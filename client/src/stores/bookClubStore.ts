import { makeAutoObservable, runInAction } from "mobx";
import { BookClub, BookClubFormValues } from "../models/bookclub";
import agent from "../utils/agent";
import { v4 as uuid } from "uuid";
import { store } from "./store";
import { Profile } from "../models/profile";

export default class BookClubStore {
  bookClubRegistry = new Map<string, BookClub>();
  selectedBookClub?: BookClub = undefined;
  editMode = false;
  bookClubs: BookClub[] = [];
  loadingInitial = false;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get bookClubsAsMap() {
    // Possibly add sorting logic here
    return Array.from(this.bookClubRegistry.values());
  }

  loadBookClubs = async () => {
    this.setLoadingInitial(true);
    try {
      const bookClubs = await agent.BookClubs.list();
      bookClubs.forEach((bookClub) => {
        this.setBookClub(bookClub);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  selectBookClub = (id: string) => {
    this.selectedBookClub = this.bookClubRegistry.get(id);
  };

  cancelSelectedBookClub = () => {
    this.selectedBookClub = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectBookClub(id) : this.cancelSelectedBookClub();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  loadBookClub = async (id: string) => {
    let bookClub = this.getBookClub(id);
    if (bookClub) {
      this.selectedBookClub = bookClub;
      return bookClub;
    } else {
      this.setLoadingInitial(true);
      try {
        bookClub = await agent.BookClubs.details(id);
        this.setBookClub(bookClub);
        runInAction(() => {
          this.selectedBookClub = bookClub;
        });
        this.setLoadingInitial(false);
        return bookClub;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setBookClub = (bookClub: BookClub) => {
    const user = store.userStore.user;
    if (user) {
      bookClub.isMember = bookClub.members!.some(
        (a) => a.username === user.username
      );
      bookClub.isOwner = bookClub.ownerUsername === user.username;
      bookClub.owner = bookClub.members?.find(
        (x) => x.username === bookClub.ownerUsername
      );
    }
    bookClub.nextMeeting = new Date(bookClub.nextMeeting!);
    this.bookClubRegistry.set(bookClub.id, bookClub);
  };

  private getBookClub = (id: string) => {
    return this.bookClubRegistry.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createBookClub = async (bookClub: BookClubFormValues) => {
    const user = store.userStore.user;
    const member = new Profile(user!);
    bookClub.id = uuid();
    try {
      await agent.BookClubs.create(bookClub);
      const newBookClub = new BookClub(bookClub);
      newBookClub.ownerUsername = user!.username;
      newBookClub.members = [member];
      this.setBookClub(newBookClub);
      runInAction(() => {
        // this.bookClubRegistry.set(bookClub.id, bookClub);
        this.selectedBookClub = newBookClub;
        // this.bookClubs.push(bookClub);
      });
    } catch (error) {
      console.log(error);
    }
  };

  updateBookClub = async (bookClub: BookClubFormValues) => {
    try {
      await agent.BookClubs.update(bookClub);
      runInAction(() => {
        if (bookClub.id) {
          const updatedBookClub = {
            ...this.getBookClub(bookClub.id),
            ...bookClub,
          };
          this.bookClubRegistry.set(bookClub.id, updatedBookClub as BookClub);
          this.selectedBookClub = updatedBookClub as BookClub;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  deleteBookClub = async (id: string) => {
    this.loading = true;
    try {
      await agent.BookClubs.delete(id);
      runInAction(() => {
        this.bookClubRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateMembership = async () => {
    const user = store.userStore.user;
    this.loading = true;
    try {
      await agent.BookClubs.join(this.selectedBookClub!.id);
      runInAction(() => {
        if (this.selectedBookClub?.isMember) {
          this.selectedBookClub.members = this.selectedBookClub.members?.filter(
            (a) => a.username !== user?.username
          );
          this.selectedBookClub.isMember = false;
        } else {
          const member = new Profile(user!);
          this.selectedBookClub?.members?.push(member);
          this.selectedBookClub!.isMember = true;
        }
        this.bookClubRegistry.set(
          this.selectedBookClub!.id,
          this.selectedBookClub!
        );
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => (this.loading = false));
    }
  };
}

import { Profile } from "./profile";

export interface BookClub {
  id: string;
  name: string;
  description: string;
  category: string;
  readingPace: string;
  nextMeeting: Date | null;
  meetingLink: string;
  currentBook: string;
  currentBookAuthor: string;
  ownerUsername?: string;
  isMember?: boolean;
  isOwner?: boolean;
  owner?: Profile;
  members?: Profile[];
}

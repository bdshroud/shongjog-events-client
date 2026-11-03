/**
 * Client Domain Types
 * Shared interfaces representing events, volunteer registrations, and user credentials.
 */
export type EventCategory =
  | "Cleanup"
  | "Plantation"
  | "Donation"
  | "Winter Clothes"
  | "Food Drive"
  | "Medical Camp";

export interface IEvent {
  _id: string;
  title: string;
  description: string;
  eventType: EventCategory | string;
  thumbnailUrl: string;
  location: string;
  eventDate: string | Date;
  creatorEmail: string;
  creatorName: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  participantCount?: number;
}

export interface IJoinedEvent {
  _id: string;
  eventId: string;
  userEmail: string;
  userName: string;
  joinedAt: string | Date;
  eventDetails: {
    title: string;
    description: string;
    eventType: string;
    thumbnailUrl: string;
    location: string;
    eventDate: string | Date;
    creatorName: string;
  };
}

export interface UserSession {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

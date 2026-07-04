export type NotificationBase = {
  id: string;
  createdAt: string;
  read: boolean;
};

export type TeamNotification = NotificationBase & {
  type: "team";
  userName: string;
};

export type ReviewRequestedNotification = NotificationBase & {
  type: "review_requested";
  userName: string;
  companyName: string;
};

export type ReviewCancelledNotification = NotificationBase & {
  type: "review_cancelled";
  userName: string;
  companyName: string;
};

export type Notification =
  | TeamNotification
  | ReviewRequestedNotification
  | ReviewCancelledNotification;

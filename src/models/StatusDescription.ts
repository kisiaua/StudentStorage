enum StatusDescription {
  Pending = "Oczekujący",
  Approved = "Zaakceptowany",
  Rejected = "Odrzucony",
}

interface StatusDescriptionType {
  [key: string]: StatusDescription;
}

export const StatusDescriptions: StatusDescriptionType = {
  Pending: StatusDescription.Pending,
  Approved: StatusDescription.Approved,
  Rejected: StatusDescription.Rejected,
};

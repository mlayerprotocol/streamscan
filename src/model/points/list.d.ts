export interface PointListModel {
  message: string;
  data:    PointData[];
}

export interface PointData {
  _id:          string;
  projectId:    number;
  activityName: string;
  points:       number;
  createdAt:    Date;
  updatedAt:    Date;
  __v:          number;
  claimStatus:  ClaimStatus[];
  id:           string;
}

export interface ClaimStatus {
  _id:        string;
  account:    string;
  activityId: string;
  __v:        number;
  createdAt:  Date;
  points:     number;
  updatedAt:  Date;
  id:         string;
}

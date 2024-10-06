export interface PointByCategoryModel {
    message: string;
    data:    PointByCategory[];
}

export interface PointByCategory {
    meta:       Meta;
    activities: Activity[];
}

export interface Activity {
    data:         null | string;
    _id:          string;
    projectId:    number;
    activityName: string;
    points:       number;
    createdAt:    Date;
    updatedAt:    Date;
    __v:          number;
    type:         string;
    category:     Category;
    claimStatus:  ClaimStatus[];
    id:           string;
    unit?:        string;
}

export interface Category {
    _id:   string;
    index: number;
    name:  string;
    id:    string;
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

export interface Meta {
    index:        number;
    categoryName: string;
    totalPoints:  number;
    pointsEarned: number | null;
}

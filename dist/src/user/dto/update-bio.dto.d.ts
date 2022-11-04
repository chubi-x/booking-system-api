declare enum Gender {
    Male = "MALE",
    Female = "FEMALE"
}
export declare class UpdateBioDto {
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
    dateOfBirth?: Date;
    phoneNumber?: string;
    gender?: Gender;
    address?: string;
    nationality?: string;
}
export {};

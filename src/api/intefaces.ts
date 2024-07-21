
export interface LoginIPros {
    email: string,
    password: string,
}


export interface QuickSingupIPros {
    email: string,
    fullname: string,
}


export interface RegiterIProps {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    ref_code?: string,
}

// TODO
export interface ForgetPasswordIPros {
    email: string,
}

export interface OtpVerificationIPros {
    token: string,
    otp: string,
}
export interface SignupOtpVerificationIPros {
    token: string,
    otp: string,
}

export interface resetPasswordIPros {
    token: string,
    password: string,
}
export interface profileUpdateIPros {
    bio: string,
    gender: string,
    gender_pref: string,
    you_are_loking_for: string
}
export interface poiFavoriteIPros {
userId:string,
}

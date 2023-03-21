import { USERS_LOGIN , GET_OTP , CONFIRM_OTP ,SET_NEW_PASSWORD ,USERS_REGISTER  } from '../Redux/ActionTypes'

const initialUserLoginState = {
    user: []
}

const initialGetOPTState ={
    otp:[]
}

const initialConfirmOTPState = {
    confirmOTP :[]
}

const initialNewPasswordState ={
    resetpassword : []
}

const initialUserRegisterState = {
    userRegister: []
}



export const UserLoginReducer = (state = initialUserLoginState, action) => {
    switch (action.type) {

        case USERS_LOGIN:
            return {
                user: action.payload.data,
            }

        default: return state
    }
}

export const UserRegisterReducer = (state = initialUserRegisterState, action) => {
    switch (action.type) {

        case USERS_REGISTER:
            return {
                userRegister: action.payload.data,
            }

        default: return state
    }


}


export const OTPReducer = (state = initialGetOPTState, action) => {
    switch (action.type) {

        case GET_OTP:
            return {
                otp: action.payload.data,
            }

        default: return state
    }
}

export const ConfirmOTPReducer = (state = initialConfirmOTPState, action) => {
    switch (action.type) {

        case CONFIRM_OTP:
            return {
                confirmOTP: action.payload.data,
            }

        default: return state
    }
}

export const NewPasswordReducer = (state = initialNewPasswordState, action) => {
    switch (action.type) {

        case SET_NEW_PASSWORD:
            return {
                resetpassword: action.payload.data,
            }

        default: return state
    }
}


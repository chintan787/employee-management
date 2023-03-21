import {
    CREATE_EMPLOYEE,
    DELETE_EMPLOYEE,
    ADD_LEAVE,
    GET_LEAVES
} from '../Redux/ActionTypes'

const intialCreateEmployee = {
    createEmp : [],
}
const initialDeleteEmployee ={
    deleteEmp : []
}

const initialaddLeaveState = {
    addleave: []
}
const initialgetLeavesState = {
    getleaves: []
}


export const CreateEmployeeReducer = (state = intialCreateEmployee, action) => {
    switch (action.type) {

        case CREATE_EMPLOYEE:
            return {
                // ...state,
                createEmp: action.payload.data,
                error:action.payload.data
            }
       
        default: return state
    }


}
export const DeleteEmployeeReducer = (state = initialDeleteEmployee, action) => {
    switch (action.type) {

        case DELETE_EMPLOYEE:
            return {
                // ...state,
                deleteEmp: action.payload.data,
            }
        default: return state
    }


}


export const AddLeaveReducer = (state = initialaddLeaveState, action) => {
    switch (action.type) {

        case ADD_LEAVE:
            return {
                // ...state,
                addleave: action.payload.data,
            }
        default: return state
    }


} 

export const GetLeavesReducer = (state = initialgetLeavesState, action) => {
    switch (action.type) {

        case GET_LEAVES:
            return {
                // ...state,
                getleaves: action.payload.data,
            }
        default: return state
    }


}
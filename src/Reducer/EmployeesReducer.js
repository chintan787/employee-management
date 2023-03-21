
import {
    GET_EMPLOYEES,
    GET_EMPLOYEE,
    UPDATE_EMPLOYEE_PROFILE,
    
} from '../Redux/ActionTypes'



/* const initialState = {
    employees: [],
    employee : []
}

export default function (state = initialState, action)  {
    switch (action.type) {
        
        case GET_EMPLOYEES:
            return {
                employees: action.payload.data,
            }
        case GET_EMPLOYEE:
            return{
                employee : action.payload.data
            }

            default : return state
    }


} */


const initialEmployeesState = {
    employees: []
}
const initialEmployeeState = {

    employee: []
}
const initialUpdateEmployeeProfile = {

    updatedata: []
}


/* const intialCreateEmployee = {
    createEmp : [],
    error: ''
}
const initialDeleteEmployee ={
    deleteEmp : []
} */

export const EmployeesReducer = (state = initialEmployeesState, action) => {
    switch (action.type) {

        case GET_EMPLOYEES:
            return {
                employees: action.payload.data,
            }

        default: return state
    }


}

 export const EmployeeReducer = (state = initialEmployeeState, action) => {
    switch (action.type) {

        case GET_EMPLOYEE:
            return {
                employee: action.payload.data
            }
          
        default: return state
    }


} 

export const UpdateEmployeeReducer = (state = initialUpdateEmployeeProfile, action) => {
    switch (action.type) {

        case UPDATE_EMPLOYEE_PROFILE:
            return {
                // ...state,
                updatedata: action.payload.data,
            }
        default: return state
    }


}  
 

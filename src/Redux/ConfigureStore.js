import { createStore, applyMiddleware, combineReducers} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger' 
import thunk from 'redux-thunk'
// import EmployeesReducer from '../Reducer/EmployeesReducer';
import  { EmployeesReducer,EmployeeReducer, UpdateEmployeeReducer  } from '../Reducer/EmployeesReducer';
import {CreateEmployeeReducer , DeleteEmployeebyStatusReducer,DeleteEmployeeReducer ,AddLeaveReducer , GetLeavesReducer,generateSalarySlipReducer } from '../Reducer/AdminReducer';
import { UserLoginReducer ,OTPReducer , ConfirmOTPReducer , NewPasswordReducer ,UserRegisterReducer  } from '../Reducer/UsersReducer';

const rootReducer = combineReducers({
    
    EmployeesReducer : EmployeesReducer,
    EmployeeReducer : EmployeeReducer ,
    UpdateEmployeeReducer : UpdateEmployeeReducer,
    CreateEmployeeReducer :CreateEmployeeReducer,
    DeleteEmployeebyStatusReducer:DeleteEmployeebyStatusReducer,
    DeleteEmployeeReducer : DeleteEmployeeReducer,
    UserLoginReducer : UserLoginReducer,
    OTPReducer : OTPReducer,
    ConfirmOTPReducer : ConfirmOTPReducer,
    NewPasswordReducer : NewPasswordReducer,
    UserRegisterReducer:UserRegisterReducer,
    AddLeaveReducer : AddLeaveReducer,
    GetLeavesReducer : GetLeavesReducer,
    generateSalarySlipReducer : generateSalarySlipReducer

})


export const ConfigureStore = () => {
 const  store = createStore(rootReducer,composeWithDevTools(
    applyMiddleware(logger,thunk))
    
    )
    return store 
}


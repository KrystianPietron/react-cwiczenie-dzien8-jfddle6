import { auth, database, googleProvider } from '../firebaseConfig'

const LOG_IN = 'auth/LOG_IN'
const LOG_OUT = 'auth/LOG_OUT'
const EMAIL = 'auth/EMAIL'
const PASSWORD = 'auth/PASSWORD'

const INITIAL_STATE = {
    isUserLoggedIn: false,
    email: '',
    password: '',
    user: null
}

const logInAction = (user) => ({
    type: LOG_IN,
    user
})

const logOutAction = () => ({ type: LOG_OUT })

export const initAuthChangeAsyncAction = () => (dispatch, getState) => {
    auth.onAuthStateChanged(
        // user is an obj with users data or null when not logged in
        user => {
            if (user) {
                dispatch(logInAction(user))
                dispatch(saveLogInTimestampAsyncAction())

            } else {
                dispatch(logOutAction())
            }
        }
    )
}

export const onEmailChangeAction = (value) => ({
    type: EMAIL,
    value
})

export const onPasswordChangeAction = (value) => ({
    type: PASSWORD,
    value
})
const saveLogInTimestampAsyncAction = () => (dispatch, getState) => {
    database.ref('loginLogs').push({
        timestamp: Date.now()
    })
}
export const logInAsyncAction = () => (dispatch, getState) => {
    const { auth: { email, password } } = getState()
    auth.signInWithEmailAndPassword(email, password)
        .catch(error => {
            alert('Something is wrong! Check console for error details!')
            console.log(error)
        })
}

export const onLogInByGoogleAsyncAction = () => (dispatch, getState) => {
    auth.signInWithPopup(googleProvider)
}

export const logOutAsyncAction = () => (dispatch, getState) => {
    auth.signOut()
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                isUserLoggedIn: true,
                user: action.user
            }
        case LOG_OUT:
            return {
                ...state,
                isUserLoggedIn: false,
                user: null
            }
        case EMAIL:
            return {
                ...state,
                email: action.value
            }
        case PASSWORD:
            return {
                ...state,
                password: action.value
            }
        default:
            return state
    }

}
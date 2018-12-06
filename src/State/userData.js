import { database } from '../firebaseConfig'

const TEXT_VALUE = 'userData/TEXT_VALUE'
const TEXT_VALUE2 = 'userData/TEXT_VALUE2'

export const loadTextFromDbAsyncAction = () => (dispatch, getState) => {
    const { auth: { user: { uid: uuid } } } = getState()
    database.ref(`userText/user/${uuid}/text`).once(
        'value',
        snapshot => {
            dispatch(changeTextValue2(snapshot.val() || ''))
        }
    )
}
const INITIAL_STATE = {
    text: 'dupa',
    textDb: ''
}

export const changeTextValue = (value) => ({
    type: TEXT_VALUE,
    value
})
export const changeTextValue2 = (value) => ({
    type: TEXT_VALUE2,
    value
})
export const saveToDatabase = () => (dispatch, getState) => {
    const { userData: { text } } = getState()
    const { auth: { user: { uid: uuid } } } = getState()
    console.log(text)
    database.ref(`userText/user/${uuid}`).set({
        text
    })
}


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TEXT_VALUE:
            return {
                ...state,
                text: action.value
            }
            case TEXT_VALUE2:
            return {
                ...state,
                textDb: action.value
            }
        default:
            return state
    }
}
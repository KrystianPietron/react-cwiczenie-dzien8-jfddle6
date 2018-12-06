import React from 'react'
import { connect } from 'react-redux'
import { changeTextValue, saveToDatabase, loadTextFromDbAsyncAction } from './State/userData'

class UserData extends React.Component {
    render() {
        return (
            <div>
                <h2>Current State in Database : {this.props._text2}</h2>
                <h2>Current State in userData.js : {this.props._text}</h2>
                <input
                    onChange={this.props._changeTextValue}
                ></input>
                <button
                    onClick={this.props._saveToDatabase}
                >Save</button>
                <button
                    onClick={this.props._loadTextFromDbAsyncAction}
                >Load</button>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    _text: state.userData.text,
    _text2: state.userData.textDb
})

const mapDispatchToProps = dispatch => ({
    _changeTextValue: (event) => dispatch(changeTextValue(event.target.value)),
    _saveToDatabase: () => dispatch(saveToDatabase()),
    _loadTextFromDbAsyncAction: () => dispatch(loadTextFromDbAsyncAction())
})
export default connect(mapStateToProps, mapDispatchToProps)(UserData)
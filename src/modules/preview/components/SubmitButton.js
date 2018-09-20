import React, { Component } from 'react'
import Action from '../../components/Action'

class SubmitButton extends Component {
    render() {
        return (
            <Action name="check" size={25} color='#fff' style={styles.buttonStyle}/>
        )
    }
}

const styles = {
    buttonStyle: {
        position: 'absolute',
        right: 5,
    },
}

export default SubmitButton
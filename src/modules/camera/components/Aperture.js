import React, { Component } from 'react'
import TabIcon from '../../navigation/components/TabIcon'

class Aperture extends Component {
    render() {
        return (
            <TabIcon
                name="circle"
                color="#fff"
                size={80}
                onPress={this.props.onPress}
                style={{
                    position: 'absolute',
                    bottom: 50,
                    alignSelf: 'center',
                }}
            />
        )
    }
}

export default Aperture
import React, { Component } from 'react'
import { connect } from 'react-redux'

import Action from '../../components/Action'
import OpacityIn from '../../animate/OpacityIn';

class Aperture extends Component {
    render() {
        const { searchText, searchFocused, onPress } = this.props

        return (
            <OpacityIn visible={!searchText && !searchFocused}
                style={{
                    position: 'absolute',
                    bottom: 50,
                    alignSelf: 'center'
                }}
            >
                <Action
                    name="circle"
                    color="#fff"
                    size={80}
                    onPress={onPress}
                />
            </OpacityIn>
        )
    }
}

export default connect(
    state => ({
        searchText: state.search.searchText,
        searchFocused: state.search.searchFocused,
    })
)(Aperture)
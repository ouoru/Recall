import React, { Component } from 'react'
import { View, StatusBar, BackHandler } from 'react-native'
import { connect } from 'react-redux'

import { hideSearchView } from '../search/SearchReducer'

class AndroidHandler extends Component {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        const { showSearchView } = this.props
        if (showSearchView) {
            this.props.hideSearchView()
            return true
        }
        return false
    }

    render() {
        return (
            <View/>
        )
    }
}

export default connect(
    state => ({
        showSearchView: state.search.showSearchView
    }),
    { hideSearchView }
)(AndroidHandler)
import React, { Component } from 'react'
import { StatusBar, BackHandler } from 'react-native'
import { connect } from 'react-redux'

import { toggleBottomView } from '../home/HomeReducer'
import { hideSearchView } from '../search/SearchReducer'
import { hidePreview } from '../camera/CameraReducer'

class AndroidHandler extends Component {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        const { showBottomView, showSearchView, showPreview } = this.props
        if (showBottomView) {
            this.props.toggleBottomView()
            return true
        }
        if (showSearchView) {
            this.props.hideSearchView()
            return true
        }
        if (showPreview) {
            this.props.hidePreview()
            return false
        }
        return false
    }

    render() {
        return (
            <StatusBar translucent backgroundColor={'rgba(0,0,0,0.1)'}/>
        )
    }
}

export default connect(
    state => ({
        showBottomView: state.home.showBottomView,
        showSearchView: state.search.showSearchView,
        showPreview: state.camera.showPreview,
    }),
    { hideSearchView, hidePreview, toggleBottomView }
)(AndroidHandler)
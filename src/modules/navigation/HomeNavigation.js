import React, { Component } from 'react'
import { Platform, ScrollView, Dimensions, View, ViewPagerAndroid, Animated } from 'react-native'
import AgendaView from '../agenda/AgendaView'
import LibraryView from '../library/LibraryView'
import HomeContainer from '../home/HomeContainer';
import CameraView from '../camera/CameraView';
import CustomTabNav from './components/CustomTabNav'

const { height, width } = Dimensions.get('window')
const INITIAL_INDEX = 1

class HomeNavigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentIndex: INITIAL_INDEX,
            scrollIndex: new Animated.Value(INITIAL_INDEX)
        }
    }

    _renderPager = () => {
        if (Platform.OS === 'android') {
            return (
                <ViewPagerAndroid
                    ref={ref => { 
                        this.pagerRef = ref
                    }}
                    initialPage={INITIAL_INDEX}
                    style={styles.scrollView}
                    onPageScroll={this._onAndroidScroll}
                    onPageSelected={this._onAndroidScrollEnd}
                >
                    <View key={'1'}>
                        <LibraryView/>
                    </View>
                    <View key={'2'}>
                        <HomeContainer/>
                    </View>
                    <View key={'3'}>
                        <AgendaView/>
                    </View>
                </ViewPagerAndroid>
            )
        } else {
            return (
                <ScrollView
                    ref={ref => this.pagerRef = ref}
                    horizontal
                    contentOffset={{x: width * INITIAL_INDEX, y: 0}}
                    style={styles.scrollView}
                    pagingEnabled={true}
                    onScroll={this._onScroll}
                >
                    <LibraryView/>
                    <HomeContainer/>
                    <AgendaView/>
                </ScrollView>
            )
        }
    }

    _onAndroidScroll = e => {
        const { offset, position } = e.nativeEvent
        const scrollIndex = offset + position

        Animated.timing(
            this.state.scrollIndex, {
                toValue: scrollIndex,
                duration: 0,
                useNativeDriver: true
            }
        ).start()
    }

    _onAndroidScrollEnd = e => {
        this.setState({
            currentIndex: e.nativeEvent.position
        })
    }

    _onScroll = e => {
        console.log('event', e)
    }

    _onTabPress = index => {
        if (index === this.state.currentIndex) {
            if (index === 1) {
                this.camera = this.refs.test.refs.camera
                this._takePicture()
            }
        } else {
            this.pagerRef.setPage(index)
        }
    }
    
    _takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options)
            console.log(data.uri);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <CameraView
                    ref='test'
                />
                {this._renderPager()}
                <CustomTabNav
                    scrollIndex={this.state.scrollIndex}
                    onTabPress={this._onTabPress}
                />
            </View>
        )
    }
}

const styles = {
    container: {
        height,
        width
    },
    scrollView: {
        position: 'absolute',
        height, width
    }
}

export default HomeNavigation
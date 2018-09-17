import React, { Component } from 'react'
import { ScrollView, Dimensions } from 'react-native'
import AgendaView from '../agenda/AgendaView'
import LibraryView from '../library/LibraryView'
import HomeContainer from '../home/HomeContainer';

const { height, width } = Dimensions.get('window')

class HomeNavigation extends Component {
    render() {
        return (
            <ScrollView
                horizontal
                pagingEnabled={true}
                style={styles.scrollView}
            >
                <LibraryView/>
                <HomeContainer/>
                <AgendaView/>
            </ScrollView>
        )
    }
}

const styles = {
    scrollView: {
        height,
        width,
    }
}

export default HomeNavigation
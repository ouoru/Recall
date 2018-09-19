import React, { Component } from 'react'
import { ScrollView, Text, View, Image } from 'react-native'
import { connect } from 'react-redux'

class SearchResults extends Component {
    _renderItem = ({item, score}) => {
        return (
            <View key={item.timestamp}>
                <Image source={{ uri: item.uri }} style={{ height: 60, width: 60, borderRadius: 30 }}/>
                <Text>{item.keywords}</Text>
            </View>
        )
    }

    render() {
        if (!this.props.searchFocused && !this.props.searchText) return null

        return (
            <ScrollView
                style={styles.container}
                contentContainerStyle={{
                    alignItems: 'center'
                }}
            >
                {this.props.searchResults.map(this._renderItem)}
            </ScrollView>
        )
    }
}

const styles = {
    container: {
        position: 'absolute',
        top: 65, bottom: 0,
        left: 0, right: 0,
    }
}

export default connect(
    state => ({
        searchText: state.search.searchText,
        searchFocused: state.search.searchFocused,
        searchResults: state.search.searchResults
    })
)(SearchResults)
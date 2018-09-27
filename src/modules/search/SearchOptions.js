import fuseService from '../../services/fuseService'
import { filterPastWeek } from '../../services/parseDate'

//all functions should take (state.library, searchText) as arguments
export const SECTIONS = [
    {
        key: 'MY PHOTOS',
        title: 'MY PHOTOS',
        filterUsing: fuseService.searchPhotos,
    },
    {
        key: 'MY VIDEOS',
        title: 'MY VIDEOS',
        filterUsing: fuseService.searchVideos,
    },
]

export const SearchViewConfig = [
    {
        key: 'PAST WEEK',
        title: 'Past Week',
        filterUsing: filterPastWeek,
    },
]
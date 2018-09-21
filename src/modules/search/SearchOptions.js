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
        key: 'PAST WEEK',
        title: 'PAST WEEK',
        filterUsing: filterPastWeek,
    }
]
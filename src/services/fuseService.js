import Fuse from 'fuse.js'

class FuseService{
    initialSearch(library) {
        let options = {
            shouldSort: true,
            threshold: 0.3,
            maxPatternLength: 15,
            keys: ['keywords'],
        }
        this.photoFuse = new Fuse(library.photos, options)
        this.videoFuse = new Fuse(library.videos, options)
    }

    searchPhotos(library, text) {
        let options = {
            shouldSort: true,
            threshold: 0.3,
            maxPatternLength: 15,
            keys: ['keywords'],
        }
        
        if (!this.photoFuse) {
            this.photoFuse = new Fuse(library.photos, options)
        }
        return this.photoFuse.search(text)
    }

    searchVideos(library, text) {
        let options = {
            shouldSort: true,
            threshold: 0.3,
            maxPatternLength: 15,
            keys: ['keywords'],
        }
        
        if (!this.videoFuse) {
            this.videoFuse = new Fuse(library.videos, options)
        }
        return this.videoFuse.search(text)
    }
}

export default new FuseService();
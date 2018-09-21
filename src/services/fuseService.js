import Fuse from 'fuse.js'

class FuseService{
    update(item, photos) {
        let options = {
            shouldSort: true,
            threshold: 0.3,
            maxPatternLength: 15,
            keys: ['keywords'],
        }

        this.fuse = new Fuse([...photos, item], options)
    }

    searchPhotos(library, text) {
        let options = {
            shouldSort: true,
            threshold: 0.3,
            maxPatternLength: 15,
            keys: ['keywords'],
        }
        
        if (!this.fuse) {
            this.fuse = new Fuse(library.photos, options)
        }
        return this.fuse.search(text)
    }
}

export default new FuseService();
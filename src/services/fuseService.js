import Fuse from 'fuse.js'

class FuseService{
    constructor(){
        this.fuse = null
        this.options = {
            shouldSort: true,
            includeScore: true,
            threshold: 0.3,
            maxPatternLength: 15,
            keys: ['keywords'],
        }
    }

    update(item, photos) {
        this.fuse = new Fuse([...photos, item], this.options)
    }

    search(text, photos) {
        if (!this.fuse) {
            this.fuse = new Fuse(photos, this.options)
        }
        return this.fuse.search(text)
    }
}

export default new FuseService();
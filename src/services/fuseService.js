import Fuse from 'fuse.js'

class FuseService{
    constructor(){
        this.fuse = null
        this.options = {
            includeScore: true,
            threshold: 0.3,
            maxPatternLength: 15,
            keys: ['keywords'],
        }
    }

    update(item, gallery) {
        this.fuse = new Fuse([...gallery, item], this.options)
    }

    search(text, gallery) {
        if (!this.fuse) {
            this.fuse = new Fuse(gallery, this.options)
        }
        return this.fuse.search(text)
    }
}

export default new FuseService();
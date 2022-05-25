import { intersection } from "lodash"

export default class EnhancedSet extends Set {

    union(s) {
        return new EnhancedSet([...this, ...s])
      }

    intersection(s) {
        // let result = new EnhancedSet()
        // for (let elem of s){
        //     if (this.has(elem)){
        //         result.add(elem);
        //     }
        // }
        // return result;
        return new EnhancedSet([...s].filter(elem => this.has(elem)))
    }

    difference(s) {
        // let res = new EnhancedSet(this)
        // for (let elem of s){
        //     res.delete(elem);
        // }
        // return res;
        return new EnhancedSet([...this].filter(elem => !s.has(elem)))
    }

    symmetricDifference(s) {
        // let res = new EnhancedSet(this)
        // let res2 = new EnhancedSet(s)
        // for (let elem of s){
        //     res.delete(elem);
        // }
        // for (let elem of this){
        //     res2.delete(elem);
        // }
        // return new EnhancedSet([...res, ...res2]);
        return new EnhancedSet([...s.difference(this)].concat([...this.difference(s)]))

        //return new EnhancedSet([...s].filter(elem => !this.has(elem)).concat([...this].filter(elem => !s.has(elem))))
    }

    isSuperset(s) {
        // for (let elem of s) {
        //     if (!this.has(elem)) {
        //         return false;
        //     }
        // }
        // return true;
        return [...s].every(elem => this.has(elem))
    }
    
    isSubset(s) {
            // for (let elem of this) {
            //     if (!s.has(elem)) {
            //         return false;
            //     }
            // }
            // return true;
        return [...this].every(elem => s.has(elem))
    }
}

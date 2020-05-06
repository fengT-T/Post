#!/usr/bin/env node

function MyPromise (fn) {
  this.status = this.STATUS.PENDING
  this.data = null
  this.resolvedCallbackList = []
  this.rejectedCallbackList = []
  try {
    fn(this.reslovedCallback(), this.rejectedCallback())
  } catch (err) {
    this.rejectedCallback()(err)
  }
}

MyPromise.prototype = {
  STATUS: {
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected'
  },

  reslovedCallback () {
    let _resolveCallback = this.genCallback(this.STATUS.RESOLVED)
    return data => {
      if (data instanceof MyPromise) {
        data.then(_resolveCallback, this.rejectedCallback())
      } else {
        _resolveCallback(data)
      }
    }
  },

  rejectedCallback () {
    return this.genCallback(this.STATUS.REJECTED)
  },

  genCallback (type) {
    return data => {
      if (this.status !== this.STATUS.PENDING) {
        return
      }
      Object.assign(this, {
        status: type,
        data
      })
      setTimeout(() => {
        let list = type === this.STATUS.RESOLVED
          ? this.resolvedCallbackList
          : this.rejectedCallbackList
        list.forEach(callback => callback(data))
      }, 0)
    }
  },

  then (resolvedCallback, rejectedCallback) {
    return new MyPromise((nextResolvedCallback, nextRejectedCallback) => {
      function genCallback (callback) {
        return function (data) {
          try {
            let result = callback(data)
            if (result instanceof MyPromise) {
              result.then(nextResolvedCallback, nextRejectedCallback)
            } else {
              nextResolvedCallback(result)
            }
          } catch (error) {
            nextRejectedCallback(error)
          }
        }
      }
      let reslovedCall = genCallback(resolvedCallback)
      let rejectedCall = genCallback(rejectedCallback)

      if (this.status === this.STATUS.PENDING) {
        this.resolvedCallbackList.push(reslovedCall)
        this.rejectedCallbackList.push(rejectedCall)
      }
      if (this.status === this.STATUS.RESOLVED) {
        reslovedCall(this.data)
      }
      if (this.status === this.STATUS.REJECTED) {
        rejectedCall(this.data)
      }
    })
  }
}

let promise1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    let promise2 = new MyPromise((resolves, reject) => {
      setTimeout(() => {
        resolves('success')
      }, 1000)
    })
    promise2.then(console.log, console.log)
    resolve(promise2)
  }, 100)
})

promise1.then(console.log, console.log)

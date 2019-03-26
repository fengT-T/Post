const {Validator, isEmpty, max} = require('./Validator')
const flow = require('lodash/flow') // 组合 装逼必备

const emptyHandel = isEmpty('用户名不能为空')
const lengthHandel = max('太长了')

const validator = new Validator('bilibilibili')
const validator2 = new Validator('')

validator.validate(emptyHandel) // true
validator2.validate(lengthHandel) // true
validator.validate(flow(emptyHandel, lengthHandel)) //[ true, Error: 太长了]
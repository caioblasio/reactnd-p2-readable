import * as moment from 'moment'

export function getFormatedDate(timestamp) {
  return moment(timestamp).format('ll')
}
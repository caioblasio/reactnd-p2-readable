export default (list, option) => {
  if (option === 'score') {
    return list.sort((a, b) => b.voteScore - a.voteScore)
  } else {
    return list.sort((a, b) => b.timestamp - a.timestamp)
  }
}
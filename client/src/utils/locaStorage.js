export const checkVote = id => {
  if (localStorage.votes) {
    let votes = JSON.parse(localStorage.votes)

    if (votes[id]) return votes[id].choice
  }

  return null;
}

export const saveVote = (id, choice) => {
  let localVotes = localStorage.votes ? JSON.parse(localStorage.votes) : {}

  localVotes[id] = { choice }

  localStorage.setItem('votes', JSON.stringify(localVotes))
}
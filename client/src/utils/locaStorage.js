export const checkValue = (key, id) => {
  if (localStorage[key]) {
    let values = JSON.parse(localStorage[key])

    if (values[id]) return values[id].option
  }

  return null;
}

export const saveValue = (value, id, option) => {
  let localValues = localStorage[value] ? JSON.parse(localStorage[value]) : {}

  localValues[id] = { id, option }

  localStorage.setItem(value, JSON.stringify(localValues));
  
}

export const getValue = (value, condition) => {
  let localValues = localStorage[value] ? JSON.parse(localStorage[value]) : {}

  return Object.keys(localValues).map(id => localValues[id])
    .filter(obj => obj.option === condition)
    .map(obj => obj.id);
}






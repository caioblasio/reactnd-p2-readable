import sort from '../../utils/sort';
import { testPosts } from '../../testUtils/mockData/posts'; 

describe('Date Utils', () => {

  it('Should sort by score', () => {
    
    const sortedByDate = sort(Object.keys(testPosts).map(key => testPosts[key]), 'score');

    expect(sortedByDate[0].id).toEqual(testPosts[Object.keys(testPosts)[0]].id)
    
  });

  it('Should sort by date', () => {
    
    const sortedByDate = sort(Object.keys(testPosts).map(key => testPosts[key]), 'date');

    expect(sortedByDate[0].id).toEqual(testPosts[Object.keys(testPosts)[1]].id)
    
  });

})
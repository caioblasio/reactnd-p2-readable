import { getFormatedDate } from '../../utils/date';

describe('Date Utils', () => {

  it('Should return correct date', () => {
    
    const formatedDate = getFormatedDate(1467166872634)
    expect(formatedDate).toEqual('Jun 28, 2016')

  });

})
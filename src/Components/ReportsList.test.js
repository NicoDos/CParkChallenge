import React from 'react';
import renderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ReportsList from './ReportsList';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const rendered = renderer.create(<ReportsList />).toJSON();
  expect(rendered).toBeTruthy();
});

describe('#sortList()', () => {
  const wrapper = shallow(<ReportsList />);

  beforeEach(() => {
    wrapper.state().sortBy = 'time';
    wrapper.state().reports = [
      {
        key: '1',
        time: '123',
        distance: 'efg',
      },
      {
        key: '2',
        time: '456',
        distance: 'abc',
      },
    ];
  });

  it('updates the state', () => {
    wrapper.instance().sortList('distance');
    expect(wrapper.state().sortBy).toEqual('distance');
  });

  describe('when list is already sorted by requested param (column)', () => {
    it('reverts sorting', () => {
      wrapper.instance().sortList('time');
      expect(wrapper.state().reports[0].key).toEqual('2');
    });
  });

  describe('when list is NOT already sorted by requested param (column)', () => {
    it('sorts list by column type', () => {
      wrapper.instance().sortList('distance');
      expect(wrapper.state().reports[0].key).toEqual('2');
    });
  });
});

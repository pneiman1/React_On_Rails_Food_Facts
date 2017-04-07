
import React from 'react';
import Client from './Client';

const MATCHING_ITEM_LIMIT = 25;

class FoodSearch extends React.Component {
  state = {
    foods: [],
    showRemoveIcon: false,
    searchValue: '',
  };

  handleSearchChange = (e) => {
    const value = e.target.value;

    this.setState({
      searchValue: value,
    });

    if (value === '') {
      this.setState({
        foods: [],
        showRemoveIcon: false,
      });
    } else {
      this.setState({
        showRemoveIcon: true,
      });

      Client.search(value, (foods) => {
        this.setState({
          foods: foods.slice(0, MATCHING_ITEM_LIMIT),
        });
      });
    }
  };

  handleSearchCancel = () => {
    this.setState({
      foods: [],
      showRemoveIcon: false,
      searchValue: '',
    });
  };

  render() {
    const { showRemoveIcon, foods } = this.state;
    const removeIconStyle = showRemoveIcon ? {} : { visibility: 'hidden' };

    const foodRows = foods.map((food, idx) => (
      <tr
        key={idx}
        onClick={() => this.props.onFoodClick(food)}
      >
        <td>{food.description}</td>
        <td className='right aligned'>{food.kcal}</td>
        <td className='right aligned'>{food.protein_g}</td>
        <td className='right aligned'>{food.fat_g}</td>
        <td className='right aligned'>{food.carbohydrate_g}</td>
        <td className='right aligned'>{food.fiber_td_g}</td>
        <td className='right aligned'>{food.sugar_g}</td>

      </tr>
    ));

    return (
      <div id='food-search'>
        <table className='ui selectable structured large table'>
          <thead>
            <tr>
              <th colSpan='9'>
                <div className='ui fluid search'>
                  <div className='ui icon input'>
                    <input
                      className='prompt'
                      type='text'
                      placeholder='Search foods...'
                      value={this.state.searchValue}
                      onChange={this.handleSearchChange}
                    />
                    <i className='search icon' />
                  </div>
                  <i
                    className='remove icon'
                    onClick={this.handleSearchCancel}
                    style={removeIconStyle}
                  />
                </div>
              </th>
            </tr>
            <tr>
              <th className='eight wide'>Description</th>

              <th>Calories</th>
              <th>Protein(g)</th>
              <th>Fat(g)</th>
              <th>Carbs(g)</th>
              <th>Fiber(g)</th>
              <th>Sugar(g)</th>

            </tr>
          </thead>
          <tbody>
            {foodRows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default FoodSearch;

import React from 'react';
import { connect} from 'react-redux';
import { deletePokemonsCategories  } from '../actions/pokemons-categories';
import { bindActionCreators } from 'redux';
import '../stylesheets/save-model.css';


class DeleteModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null
    }
  }



  render() {
    return (
      <div className="modalDialog active">
        <a href="#close" title="Close" className="close">X</a>
        <div className="p-save-model">
              <h3>
                Are you sure you want to delete {this.props.category.name}
              </h3>
              <p>
                All {this.props.category.pokemonIds.length} in this category will be deleted as well
              </p>
              <div className="p-save-button cancel" onClick={()=>this.props.toclear(this.props.category)}>
              Cancel 
          </div>
            <div className="p-save-button" onClick={()=>this.props.deletePokemonsCategories(this.props.category)}>
              Delete
          </div>
        </div>
      </div>
    );
  }
}




const mapStateToProps = (state, props) => {
  return {
    pokemonsCategories:  state.pokemonsCategories.filter(category=>category.name!== "ALL"),
    pokemonsCategoriesHash: state.pokemonsCategoriesHash
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return bindActionCreators({
    deletePokemonsCategories
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteModel);
import React from 'react';
import { connect} from 'react-redux';
import { fetchPokemons } from '../actions/pokemons';
import { fetchPokemonsCategories  } from '../actions/pokemons-categories';
import { bindActionCreators } from 'redux';
import '../stylesheets/save-model.css';


class SaveModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      type:"create",
      category: null
    }
  }

  onSave() {
    if (this.state.category) {
      let data = {
        name: this.state.category,
        type: this.state.type
      };
      if (this.state.type === "create" && this.state.category) {
        data.pokemonIds = this.props.data;
      } else {
        data.pokemonIds = this.props.pokemonsCategoriesHash[this.state.category].pokemonIds.concat(this.props.data);
      }
      this.props.onSaveModel(data);
    }
    
  }

  onSelectOnEnterCategory(name, type) {
    this.setState({
      category: name,
      type
    })
  }

  onChangeType(type) {
    if (type === "existing");
    this.setState({
      type,
      category: this.props.pokemonsCategories[0].name
    })
  }

  renderOptions() {
    return (
      <select name="existing-category" className="p-select" onChange={(e)=>this.onSelectOnEnterCategory(e.target.value, "existing")}>
        {this.props.pokemonsCategories.map(category => (
        <option value={category.name} >{category.name}</option>
        ))}
      </select>
    )
  }



  render() {
    return (
      <div className="modalDialog active">
        <a href="#close" title="Close" className="close">X</a>
        <div className="p-save-model">

          {
            (this.props.pokemonsCategories && this.props.pokemonsCategories.length) ? (
              <div className="p-save-categories">           
                      <label className="p-save-label" htmlFor="existing">
                          <input className="p-save-input" name="category-type" type="radio" id="existing" value="existing" onChange={()=>this.onChangeType("existing")} checked={ this.state.type === 'existing'}/>
                        Select an Existing Category</label>
                   { this.renderOptions() }
              </div>
              
            ) : null
          }
            <div className="p-save-categories">
          
               {
                 this.props.pokemonsCategories && this.props.pokemonsCategories.length ? (
                  
                  <label className="p-save-label" htmlFor="create"> 
                      <input className="p-save-input" name="category-type" type="radio" id="create" value="create" onChange={ ()=>this.onChangeType("create")} checked={ this.state.type === 'create' }/>
                      or  create  an Category
                  </label>
                  
                 ) : (
                   <label className="p-save-label"  htmlFor="create">
                          Enter an Category
                     </label>
                 )
                }
                 <input type="text" onKeyUp={ (e)=>this.onSelectOnEnterCategory(e.target.value, "create") } />
            </div>
            <div className="p-save-button" onClick={()=>this.onSave()}>
              Save
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
    fetchPokemons,
    fetchPokemonsCategories
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveModel);
import React from 'react';
import { connect} from 'react-redux';
import { fetchPokemons } from '../actions/pokemons';
import { fetchPokemonsCategories, createPokemonsCategories, updatePokemonsCategories  } from '../actions/pokemons-categories';
import { bindActionCreators } from 'redux';
import CardContainer from './card-container';
import DragContainer from './move-pokemons';
import SaveModel from './save-model';
import DeleteModel from './delete-model';
import '../stylesheets/layout.css';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [{name: "ALL"}],
      currentTabIdx: 0,
      pokemonIds: [],
      goingCategory: null
    };
  }

  componentDidMount() {
    this.props.fetchPokemons();
    this.props.fetchPokemonsCategories();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pokemonsCategories !== this.props.pokemonsCategories) {
      this.setState({
        tabs: nextProps.pokemonsCategories,
        currentTabIdx: nextProps.pokemonsCategories.length < 2 ? 0 : this.state.currentTabIdx
      })
    }
  }

  onChangeTab(idx) {
    this.setState({
      currentTabIdx: idx
    });
  }

  openSaveModel(pokemonIds) {
    this.setState({
      pokemonIds
    })
  }

  onSaveModel(data) {
    if(data.type === "create") {
      this.props.createPokemonsCategories(data);
    } else if(data.type === 'existing') {
      this.props.updatePokemonsCategories(data);
    }
    this.setState({
      pokemonIds: []
    });
  }

  renderTabs() {
    return (
      <div className="p-tabs">
         {
           this.state.tabs.map((tab, idx) => (
             <div className={ `p-tab ${this.state.currentTabIdx === idx ? "active" : null} ` } onClick={()=>this.onChangeTab(idx)}>{ tab.name } </div>
           ))
         }
      </div>
    )
  }
  render() {
    return (
      <div className="p-layout">
        <div className="p-head">
          <img className="p-head-icon"  src="./logo.png" alt="no-image" />
        </div>
        <div className="p-body">
            { this.renderTabs() }
          <div className="p-content">
            {
              this.state.currentTabIdx === 0 ? (
                <CardContainer  currentCategory={  this.state.tabs[this.state.currentTabIdx].name  } openSaveModel={ (pokemonIds) => this.openSaveModel(pokemonIds) } />  
              ) : (
                <DragContainer currentCategory={  this.state.tabs[this.state.currentTabIdx].name  }  openDeleteModel={(goingCategory) => this.setState({goingCategory})}/>
              )
            }
              
          </div>
        </div>
        {
          (this.state.pokemonIds && this.state.pokemonIds.length) ? (
            <SaveModel data={this.state.pokemonIds} onSaveModel={ (data) => this.onSaveModel(data) }/>
          ) : null
        }
        {
          (this.state.goingCategory && this.state.currentTabIdx > 0) ? (
            <DeleteModel category={this.state.goingCategory} toclear={()=>this.setState({goingCategory: null})} />
          ):  null
        }
      </div>
    )
  }

}

const mapStateToProps = (state, props) => {
  return {
    pokemons: state.pokemons,
    pokemonsCategories: state.pokemonsCategories
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return bindActionCreators({
    fetchPokemons,
    fetchPokemonsCategories,
    createPokemonsCategories,
    updatePokemonsCategories
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
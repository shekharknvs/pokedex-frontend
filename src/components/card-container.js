import React from 'react';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Pokemon from './pokemon';
import '../stylesheets/pokemon.css';

class CardContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedPokemon: [],
      currentPokemonsCategory: {},
    }
  }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentCategory !== this.props.currentCategory ) {
      this.setState({
        currentCategory: nextProps.currentCategory,
        currentPokemonsCategory: nextProps.categoryHash[nextProps.currentCategory],
        selectedPokemon: []
      })
    }
    if (nextProps.currentPokemonsCategory !== this.props.currentPokemonsCategory) {
      this.setState({
        currentPokemonsCategory: nextProps.categoryHash[nextProps.currentCategory],
        selectedPokemon: []
      })
    }
    if (nextProps.categoryHash!== this.props.categoryHash) {
      this.setState({
        selectedPokemon: []
      })
    }
  }

  onSelected (checked,_id) {
    if (checked) {
      this.setState((state) => {
        return {
          selectedPokemon: state.selectedPokemon.concat([_id])
        }
      });
    } else {
      this.setState((state) => {
        return {
          selectedPokemon: state.selectedPokemon.filter(pokemon => pokemon !== _id)
        }
      });
    }
  }

  clearSelectedPokemons() {
    this.setState({
      selectedPokemon: []
    });
  }

  render() {
    const { currentCategory } = this.state;
    const {pokemons, pokemonsHash } = this.props;
    if (!currentCategory || currentCategory === "ALL") {
      return (
        <div className="p-card-container">
          <div className="p-card-list">
            {
              pokemons.map(pokemon => (
                <Pokemon data={ pokemon }  key={ pokemon.number } onChange={(checked, _id) => this.onSelected(checked,_id) } />
              ))
            }
          </div>
          {
            (this.state.selectedPokemon.length ) ? (
              <div className="p-open-save-model" onClick={()=>this.props.openSaveModel(this.state.selectedPokemon)}>Add to Category</div>
            ) : null
          }
      </div> 
    );
  }
  return (
    <div className="p-card-container" >
      <div className="p-card-list">
      {
        this.state.currentPokemonsCategory.pokemonIds.map((pokemonId, idx) => (
          <Pokemon data={ pokemonsHash[pokemonId] }  key={ idx } onChange={(checked, _id) => this.onSelected(checked,_id) } />
        ))
      }
      </div>
    </div>
  )
    
  }
};

const mapStateToProps = (state, props) => {
  return {
    pokemons: state.pokemons || [],
    categoryHash: state.pokemonsCategoriesHash,
    pokemonsHash: state.pokemonsHashById
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);
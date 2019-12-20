import React from 'react';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { updatePokemonsCategories, restorePokemonsCategories, deletePokemonsCategories } from '../actions/pokemons-categories';
// import Pokemon from './pokemon';
import '../stylesheets/drag-card.css';
var placeholder = document.createElement("li");
placeholder.className = "placeholder";

class DragContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCategory: null,
      category: {},
      data:[]
    }
  }
  componentDidMount() {
    this.setState({
      currentCategory: this.props.currentCategory,
      category: this.props.categoryHash[this.props.currentCategory],
      data: [].concat(this.props.categoryHash[this.props.currentCategory].pokemonIds),
      realData: [].concat(this.props.categoryHash[this.props.currentCategory].pokemonIds)
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentCategory !== this.props.currentCategory) {
      this.setState({
        currentCategory: nextProps.currentCategory,
        category: nextProps.categoryHash[nextProps.currentCategory],
        data: [].concat(nextProps.categoryHash[nextProps.currentCategory].pokemonIds),
        realData: [].concat(nextProps.categoryHash[nextProps.currentCategory].pokemonIds)
      })
    }
    if (nextProps.categoryHash[nextProps.currentCategory] && nextProps.categoryHash[nextProps.currentCategory].version !== this.props.categoryHash[nextProps.currentCategory].version ) {
      this.setState({
        currentCategory: nextProps.currentCategory,
        category: nextProps.categoryHash[nextProps.currentCategory],
        data: [].concat(nextProps.categoryHash[nextProps.currentCategory].pokemonIds),
        realData: [].concat(nextProps.categoryHash[nextProps.currentCategory].pokemonIds)
      })
    }
  }

  undoReorder() {

  }

  updateCategory() {
    let data = {
      name: this.state.currentCategory,
      pokemonIds: this.state.data
    }
    let anydiff =false;
    let pokemonIds = this.state.realData;
    for (let i=0 ; i<pokemonIds.length; i++ ){
      if (pokemonIds[i] !== this.state.data[i]) {
        anydiff = true;
        break;
      }
    }
    if (anydiff) {
      this.props.updatePokemonsCategories(data);
    }
  }
  dragEnd(e) {
    this.dragged.style.display = "block";
    try {
      this.dragged.parentNode.removeChild(placeholder);
    }
    catch(e){
      console.log(e);
    }

    // Update state
    var data = this.state.data;
    var from = Number(this.dragged.dataset.id);
    var to = Number(this.over.dataset.id);
    if(from < to) to--;
    data.splice(to, 0, data.splice(from, 1)[0]);
    this.setState({data: data}, () =>this.updateCategory());
  }

  dragStart(e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData("text/html", e.currentTarget);
  }

  dragOver(e) {
    e.preventDefault();
    this.dragged.style.display = "none";
    if(e.target.className ==="placeholder") return;
    this.over = e.target;
    e.target.parentNode.insertBefore(placeholder, e.target);
  }

  render(){
    if (this.props.categoryHash && this.state.currentCategory && this.props.categoryHash[this.state.currentCategory]) {
      return (
        <div>
          <div className="p-drag-card-button">
            {
              this.state.category && this.state.category.version ? (
                <div className="p-undo-button" onClick={()=>this.props.restorePokemonsCategories(this.state.category)}> Undo Reorder</div>
              ): null

            }
            <div className="p-delete-button" onClick={()=>this.props.openDeleteModel(this.state.category)}> Delete Category</div>
          </div>
             <ul className="p-drag-ul" onDragOver={e=>this.dragOver(e)}>
          { this.state.data.map((pokemon, idx) => (
            <li className="p-drag-li" key={idx}
            data-id={idx}
            draggable="true"
            onDragEnd={e=>this.dragEnd(e)}
            onDragStart={e=> this.dragStart(e)}
            > 
            <div className="p-card">
              <label className="p-active-checkbox" htmlFor={ this.props.pokemonsHash[pokemon]._id }>=</label>
              <img className="p-icon" src={ this.props.pokemonsHash[pokemon].thumbnailImage } alt={this.props.pokemonsHash[pokemon].thumbnailAltTex} />
              <label className="p-name" htmlFor={ this.props.pokemonsHash[pokemon]._id }>{this.props.pokemonsHash[pokemon].name}</label>
            </div>
             </li>
          ))}
        </ul>
    
        </div>
         )
    }
    return null;
   
  }
}



const mapStateToProps = (state, props) => {
  return {
    pokemons: state.pokemons || [],
    categoryHash: state.pokemonsCategoriesHash,
    pokemonsHash: state.pokemonsHashById
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return bindActionCreators({
    updatePokemonsCategories,
    restorePokemonsCategories,
    deletePokemonsCategories
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DragContainer);
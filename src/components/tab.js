import React from 'react';
import { connect} from 'react-redux';
import { fetchPokemons } from '../actions/pokemons';
import { bindActionCreators } from 'redux';
import { Container, Nav, NavItem, Col, Image } from 'react-bootstrap';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };

    render() {
      return (
        <Container >

        </Container>
      )
    }
  }
}


const mapStateToProps = (state, props) => {
  return {
    pokemons: state.pokemons
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return bindActionCreators({
    fetchPokemons
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
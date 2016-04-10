import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchClubsIfNeeded } from '../constants/actions';

class ClubsRoute extends React.Component {

	static contextTypes = {
		store: React.PropTypes.object
	}

	componentDidMount(){
		const { store } = this.context;
		store.dispatch(fetchClubsIfNeeded());
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps !== this.props;
	}

	render() {
		const { clubs } = this.props;
		console.log("clubs from props: " + clubs);
        return(
            <div>
                <h4>Clubs</h4>
                { this.props.children }
            </div>
        );
    }
}

const mapStateToProps = (state) => {	
	const clubs = state.get("clubs");// grab what you need
	return { clubs: clubs};// this must return a plain js object instead of immutable
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({fetchClubsIfNeeded}, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClubsRoute)